// Import necessary modules
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { sanitize } = require('express-sanitizer');
const axios = require('axios');

const app = express();

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Rate limiting to prevent DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sanitize user input to prevent SQL Injection
app.use(sanitize());

// Example route
app.post('/submit', async (req, res) => {
  const userInput = req.sanitize(req.body.userInput);

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: userInput,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.send(`Sanitized input: ${userInput}, LLM response: ${response.data.choices[0].text}`);
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
