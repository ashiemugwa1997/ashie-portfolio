import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/proxy', async (req, res) => {
  const { url, options } = req.body;
  console.log(`Proxying request to: ${url}`); // Add logging
  console.log(`Request options:`, options); // Add logging

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(`Response from ${url}:`, data); // Add logging
    res.json(data);
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error); // Add logging
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
