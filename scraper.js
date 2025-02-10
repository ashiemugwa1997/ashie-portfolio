const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to Google
    await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

    // Perform a search
    await page.type('input[name="q"]', query);
    await page.keyboard.press('Enter');

    // Wait for search results to load
    await page.waitForSelector('h3');

    // Perform web scraping
    const data = await page.evaluate(() => {
      // Extract data from the page
      const results = [];
      document.querySelectorAll('h3').forEach((element) => {
        results.push({
          title: element.innerText,
          link: element.parentElement.href,
        });
      });
      return results;
    });

    console.log(data);

    // Close the browser
    await browser.close();

    res.json(data);
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Scraper server running at http://localhost:${port}`);
});
