const app = require('../Config/ServerConfig');
const { addressModels } = require('../Model/Model');
const { mapFormData } = require('../Mappings/CountryMappings.js');
const PORT = 3001;

/**
 * Search API endpoint
 * 
 * Handles search requests by querying db with the provided search parameters
 * and returns the aggregated results.
 *
 * Query Params:
 * - countries (String): Comma-separated list of country codes to search.
 * - limit (Number): Maximum number of results to return (default is 50).
 * - lastId (String): ID of the last document from the previous query for pagination.
 * - ...searchParams: Other search parameters specific to each country.
 *
 * Returns:
 * - JSON response with the search results or an error message.
 */
app.get('/api/search/v1', async (req, res) => {
    console.log("Search endpoint hit");
    const { countries, limit = 50, lastId, ...searchParams } = req.query;

    const countryList = countries.split(',');

    // Validate that countryList is not empty and contains valid countries
    if (countryList.length === 0 || !countryList.every(country => addressModels[country])) {
        return res.status(400).json({ success: false, error: 'Invalid or missing country codes.' });
    }
    

    // Conditionally map the search parameters to country-specific parameters
    const countrySpecificParams = countryList.length > 1 ? mapFormData(searchParams, countryList) : { [countryList[0]]: searchParams };

    // Create a single query combining all countries if possible
    const combinedQueries = [];
    countryList.forEach(country => {
        const model = addressModels[country];
        if (!model) {
            return res.status(404).json({ success: false, error: 'No model for country.' });
        }

        const queryParams = countrySpecificParams[country] || {};
        const queryParts = Object.entries(queryParams)
            .filter(([key, value]) => value && value.trim() !== '')
            .map(([key, value]) => {
                const trimmedValue = value.trim();
                if (key === 'name') {
                    const transformValue = trimmedValue.replace(/(\w)/g, '$1\\.?').replace(/\s+/g, '\\s*');
                    // Regex to incorporate salutations and ignore all periods in the name
                    const nameRegex = `^(?:Mr\\.?\\s*|Mrs\\.?\\s*|Ms\\.?\\s*|Dr\\.?\\s*|Sr\\.?\\s*|Sra\\.?\\s*)?${transformValue}$`;
                    return { [key]: { $regex: nameRegex, $options: 'i' } };
                } else {
                    return { [key]: { $regex: `.*${trimmedValue.replace(/\./g, '\\.?')}.*`, $options: 'i' } };
                }
            });

        if (lastId) {
            queryParts.push({ _id: { $gt: lastId } });
        }

        const combinedQuery = queryParts.length > 0 ? { $and: queryParts } : {};

        const pipeline = [
            { $match: combinedQuery },
            { $sort: { _id: 1 } },
            { $limit: limit }
        ];

        // Batch execution for search queries - might be faster using with promise/all settled
        combinedQueries.push({ model, pipeline });
    });

    try {
        // Run all queries in parallel and aggregate results
        const results = await Promise.allSettled(combinedQueries.map(({ model, pipeline }) => model.aggregate(pipeline).exec()));
        const successfulResults = results.filter(result => result.status === 'fulfilled').map(result => result.value);
        const combinedResults = successfulResults.flat();
        res.status(200).json({ success: true, data: combinedResults });
    } catch (error) {
        console.error('Error in search:', error);
        res.status(500).json({ success: false, error: 'Failed to perform search' });
    }
});

// Start the search service server
app.listen(PORT, () => {
    console.log(`Search server is running on http://localhost:${PORT}`);
});
