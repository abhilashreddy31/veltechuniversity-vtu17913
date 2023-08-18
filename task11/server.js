const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  const validUrls = urls.filter(url => isValidUrl(url));

  const promises = validUrls.map(fetchNumbers);

  try {
    const responses = await Promise.allSettled(promises);
    let mergedNumbers = [];

    responses.forEach(response => {
      if (response.status === 'fulfilled') {
        mergedNumbers = mergedNumbers.concat(response.value);
      }
    });

    const uniqueNumbers = [...new Set(mergedNumbers)];
    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

    res.json({ numbers: sortedNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

async function fetchNumbers(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers from ${url}: ${error.message}`);
    return [];
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});