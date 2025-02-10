import React, { useState } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AITool: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleButtonClick = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending request to OpenAI API...");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          store: true,
          messages: [
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      console.log("Received response from OpenAI API:", data);
      const aiResponse: Message = {
        sender: "ai",
        text: data.choices[0].message.content.trim(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Interactive AI Tool</h2>
      <div className="mb-4 h-40 overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Ask me anything..."
        disabled={loading}
      />
      <button
        onClick={handleButtonClick}
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Ask AI"}
      </button>
    </div>
  );
};

export default AITool;
