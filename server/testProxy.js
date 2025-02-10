import fetch from 'node-fetch';

const testProxy = async () => {
  try {
    const response = await fetch("http://localhost:5000/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "http://localhost:1234/v1/chat/completions",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "qwen2.5-7b-1m",
            messages: [
              { role: "system", content: "Always answer in rhymes." },
              { role: "user", content: "Introduce yourself." },
            ],
            temperature: 0.7,
            max_tokens: -1,
            stream: false,
          }),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from LLM:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

testProxy();
