import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AITool: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Check for API key on component mount
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("Gemini API key not found. Please add your API key to the .env file.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || loading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "your_api_key_here") {
        throw new Error("API key not found");
      }

      // Call Gemini API using the format provided in the curl command
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { 
                    text: `You are Ashley Mugwambi, a male Lead Django Developer with 5+ years of experience based in Harare, Zimbabwe.
                          You're currently leading development at ZETDC (Zimbabwe Electricity Transmission & Distribution Company), 
                          specializing in power distribution management systems and enterprise software solutions.
                          Respond as Ashley to the following query: ${input}` 
                  }
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      // Extract the response text from Gemini's response format
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                            "Sorry, I couldn't generate a response at the moment.";
      
      const aiResponse: Message = {
        sender: "ai",
        text: aiResponseText.trim(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Failed to fetch response. Please try again later.";
      
      if (error.message.includes("API key not found")) {
        errorMessage = "Please add your Gemini API key to the .env file to use this feature.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message.includes("Gemini API error")) {
        errorMessage = `${error.message}. Please check your API key.`;
      }
      
      setMessages((prev) => [...prev, { sender: "ai", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-lg mx-auto backdrop-blur-sm shadow-lg border-0 ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-700 text-gray-100'
        : 'bg-white/80 text-gray-900'
    }`}>
      <CardContent className="p-3 space-y-3">
        <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>
          Ask Ashie
        </h1>
        <ScrollArea className="h-[300px] pr-3">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Ask me anything about my work, skills, or projects!
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm transition-all duration-300 ease-in-out ${
                    message.sender === "user"
                      ? `${theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-primary text-primary-foreground'}`
                      : `${theme === 'dark' 
                          ? 'bg-gradient-to-r from-blue-800 to-purple-900 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'}`
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-muted'
                }`}>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className={`flex-1 text-sm ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''
            }`}
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            disabled={loading}
            className={theme === 'dark' ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AITool;
