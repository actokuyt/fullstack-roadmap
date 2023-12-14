// cliApp.js
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

// Function to fetch web page content and extract text using Cheerio
async function scrapeUrl(url, selector) {
  try {
    // Fetch the HTML content of the given URL
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    // Extract text content based on the provided CSS selector
    const selectedText = $(selector).text().trim();

    // Print the extracted text
    console.log(`Text content of '${selector}' from ${url}:\n${selectedText}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Create an interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for URL and CSS selector
rl.question('Enter the URL: ', (url) => {
  rl.question('Enter the CSS selector: ', (selector) => {
    // Call the scrapeUrl function with the provided URL and selector
    scrapeUrl(url, selector);

    // Close the readline interface
    rl.close();
  });
});
