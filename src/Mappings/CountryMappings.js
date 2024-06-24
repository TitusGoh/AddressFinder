// List of country options for dropdown selection
const countryOptions = [
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Germany', label: 'Germany' },
  { value: 'India', label: 'India' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Korea', label: 'South Korea' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Spain', label: 'Spain' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'US', label: 'United States' }
];

// Field mappings from general fields to country-specific fields.
const FieldMappings = {
  name: ['name'],
  addressLine1: ['address', 'addressLine1', 'street_name', 'houseNumberStreetNumber'],
  addressLine2: ['addressLine2', 'house_number', 'district', 'neighborhood'],
  city: ['city'],
  stateProvince: ['provinceCode', 'province', 'state', 'stateProvince', 'prefecture'],
  postalCode: ['postalZip', 'postalCode', 'postalcode', 'postal_code', 'zipCode'],
};

// Required fields for each country.
const CountryRequiredFields = {
  'Brazil': ['name', 'address', 'neighborhood', 'city', 'provinceCode', 'province', 'postalZip'],
  'Canada': ['name', 'address', 'city', 'provinceCode', 'postalZip'],
  'Germany': ['name', 'address', 'postalCode', 'city'],
  'India': ['name', 'addressLine1', 'city', 'state', 'postalcode'],
  'Japan': ['postal_code', 'prefecture', 'city', 'street_name', 'house_number', 'name'],
  'Korea': ['name', 'address', 'district', 'city', 'province', 'postalCode'],
  'Mexico': ['name', 'address', 'neighborhood', 'city', 'state', 'postalCode'],
  'Spain': ['name', 'address', 'postalCode', 'city'],
  'US': ['name', 'address', 'city', 'state', 'zipCode'],
  'UK': ['name', 'address', 'city', 'postalCode'],
}

// Maps full country names to schema keys.
const FullCountryToSchemaKey = {
  'Brazil' : 'Brazil',
  'Canada' : 'Canada',
  'Germany' : 'Germany',
  'India' : 'India',
  'Japan' : 'Japan',
  'South Korea': 'Korea',
  'North Korea': 'Korea',
  'North and South Korea': 'Korea',
  'Mexico' : 'Mexico',
  'Spain' : 'Spain',
  'United States': 'US',
  'United States of America': 'US',
  'USA': 'US',
  'United Kingdom': 'UK',
};

/**
 * Reverse field mappings for easier lookup.
 */   
const reverseFieldMappings = Object.keys(FieldMappings).reduce((acc, key) => {
  FieldMappings[key].forEach(field => {
    acc[field] = key;
  });
  return acc;
}, {});

/**
 * Maps form data to country-specific fields.
 * 
 * formData - the data to map
 * selectedCountries - list of selected countries
 * Returns remapped address object
 */ 
const mapFormData = (formData, selectedCountries) => {
  // Prepare data structure for mapped data per country
  const combinedData = selectedCountries.reduce((acc, country) => {
      acc[country] = {};
      return acc;
  }, {});

  // Map form data to standard fields then to country-specific fields
  Object.keys(formData).forEach(key => {
      const masterKey = reverseFieldMappings[key]; // Map the form key to the standard key
      if (masterKey) {
          selectedCountries.forEach(country => {
              const countrySpecificField = FieldMappings[masterKey].find(field => 
                  CountryRequiredFields[country].includes(field));
              // Check if there is a country-specific field defined, else use the general field
              if (countrySpecificField) {
                  combinedData[country][countrySpecificField] = formData[key];
              } else if (masterKey === 'addressLine2') {
                  // If no specific mapping found, use a default field name or ignore
                  combinedData[country]['addressLine2'] = formData[key];
              } else if (masterKey === 'stateProvince') {
               // If no specific mapping found, use a default field name or ignore
                combinedData[country]['stateProvince'] = formData[key];
              }
          });
      }
  });

  return combinedData;
};

module.exports = { countryOptions, FieldMappings, reverseFieldMappings, CountryRequiredFields, FullCountryToSchemaKey, mapFormData };
