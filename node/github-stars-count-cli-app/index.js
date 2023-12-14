const axios = require('axios');

// Function to fetch GitHub repositories based on stars and date range
async function fetchMostStarredRepos(startDate, endDate) {
  try {
    // GitHub Search API endpoint for repositories
    const apiUrl = 'https://api.github.com/search/repositories';

    // Construct the query for most starred repositories within the date range
    const query = `stars:>1 created:${startDate}..${endDate}`;

    // Make the API request
    const response = await axios.get(apiUrl, {
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
      },
    });

    // Extract and print the relevant information
    const repos = response.data.items;
    console.log(`Most Starred GitHub Repositories (${startDate} to ${endDate}):`);
    repos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} - ${repo.stargazers_count} stars`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Read command-line arguments for start and end dates
const [, , startDate, endDate] = process.argv;

// Check if at least one date is provided
if (!startDate) {
  console.error('Please provide at least a start date.');
  process.exit(1);
}

// If only the start date is provided, set the end date to today
const today = new Date().toISOString().split('T')[0];
const endDateToUse = endDate || today;

// Call the function with the provided date range
fetchMostStarredRepos(startDate, endDateToUse);
