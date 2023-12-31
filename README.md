# veltechuniversity-vtu17913
Sure, here is the README.md file for your code:

## Task 11

This task is to write a server that takes a list of URLs and returns a list of unique numbers that are found in all of the URLs.

### Instructions

1. Create a new file called `server.js`.
2. Import the `express` and `axios` modules.
3. Create a new Express app.
4. Define a route for the `/numbers` endpoint.
5. In the route handler, get the list of URLs from the query string.
6. Use the `axios` module to fetch the numbers from each URL.
7. Merge the results of all of the requests into a single list.
8. Sort the list of numbers.
9. Return the list of numbers to the client.

### Code

```js
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
}# veltechuniversity--vtu17913
