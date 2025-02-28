import React, { useState } from "react";
import { askGemini } from "../utils/geminiApi";

const AITool: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result = await askGemini(prompt);
      
      // Extract the response text from Gemini API structure
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Sorry, I couldn't generate a response.";
      
      setResponse(responseText);
    } catch (err) {
      console.error("Error getting AI response:", err);
      setError("Failed to get response from AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Interactive AI Tool</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Ask me anything..."
          disabled={loading}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ask AI
        </button>
      </form>

      {loading && <p className="text-gray-600 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && response && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Response:</h3>
          <p className="whitespace-pre-wrap dark:text-gray-200">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AITool;
