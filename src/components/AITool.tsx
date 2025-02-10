import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AITool: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || loading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Set the request's mode to 'no-cors'
      const response = await fetch("https://36d5-41-79-188-114.ngrok-free.app/v1/chat/completions", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5-7b-1m",
          messages: [
            { 
              role: "system", 
              content: `You are Ashley Mugwambi, a male Lead Django Developer with 5+ years of experience in building scalable web applications. 
                        You are currently leading development at ZETDC (Harare Region), specializing in power distribution management systems and enterprise software solutions. 
                        This project showcases your skills and proficiency in various technologies and tools, including React, Node.js, Express, MongoDB, and AWS. 
                        Respond to queries about yourself and your work, providing contextual information about your experience and projects. 
                        If you are unsure about an answer, search the web for the best possible information, particularly highlighting great things only.`
            },
            { role: "user", content: input },
          ],
          temperature: 0.7,
          max_tokens: -1,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse: Message = {
        sender: "ai",
        text: data.choices[0].message.content.trim(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "Failed to fetch response. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-3 space-y-3">
        <h1 className="text-xl font-bold">Ashie's Portfolio</h1>
        <ScrollArea className="h-[300px] pr-3">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm transition-all duration-300 ease-in-out transform ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl px-3 py-2 bg-muted">
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
            className="flex-1 text-sm"
            disabled={loading}
          />
          <Button type="submit" size="icon" variant="ghost" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AITool;
