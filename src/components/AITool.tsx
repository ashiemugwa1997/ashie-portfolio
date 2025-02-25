import React, { useState } from "react";
import { askGemini } from "../utils/geminiApi";
import styles from "./AITool.module.css"; // Assuming you have styles

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
    <div className={styles.aiTool || ""}>
      <h2>Interactive AI Tool</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Ask AI
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error || ""}>{error}</p>}
      {!loading && response && (
        <div className={styles.response || ""}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AITool;
