import config from '../Config/Config';

/**
 * searchAddresses
 * 
 * Sends a GET request to the search API with the provided query parameters and returns the search results.
 *
 * queryParameters - An object containing the query parameters for the search.
 * returns {Promise<Array>} - A promise that resolves to an array of search results.
 * throws {Error} - Throws an error if the HTTP request fails.
 *
 * Example Usage:
 * const results = await searchAddresses({ country: 'US', city: 'New York' });
 */
export const searchAddresses = async (queryParameters) => {
  try {
    const query = new URLSearchParams(queryParameters).toString();
    const response = await fetch(`${config.searchUrl}/search/v1?${query}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};
