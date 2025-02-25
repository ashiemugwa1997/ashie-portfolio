/**
 * Utility for interacting with the Gemini AI API
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Send a prompt to Gemini AI and get a response
 * @param {string} prompt - The text prompt to send to Gemini
 * @returns {Promise<Object>} - The response from the Gemini API
 */
export async function askGemini(prompt) {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * Example usage:
 * 
 * import { askGemini } from './utils/geminiApi';
 * 
 * async function getAIResponse() {
 *   try {
 *     const result = await askGemini("Explain how AI works");
 *     console.log(result.candidates[0].content.parts[0].text);
 *   } catch (error) {
 *     console.error("Failed to get AI response:", error);
 *   }
 * }
 */
