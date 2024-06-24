const mongoose = require('mongoose');

const addressSchemas = {
    Brazil: new mongoose.Schema({
      name: String,
      address: String,
      neighborhood: String,
      city: String,
      provinceCode: String,
      province: String,
      country: String,
      postalZip: String
    }),
  
    Canada: new mongoose.Schema({
      name: String,
      address: String,
      city: String,
      provinceCode: String,
      postalZip: String,
      country: String
    }),
  
    Germany: new mongoose.Schema({
      name: String,
      address: String,
      city: String,
      country: String,
      postalCode: String
    }),
  
    India: new mongoose.Schema({
      name: String,
      addressLine2: String,
      city: String,
      country: String,
      postalcode: String,
      state: String,
      addressLine1: String
      
    }),
  
    Japan: new mongoose.Schema({
      postal_code: String,
      prefecture: String,
      city: String,
      street_name: String,
      house_number: String,
      name: String,
      country: String
    }),
  
    Mexico: new mongoose.Schema({
      name: String,
      neighborhood: String,
      city: String,
      country: String,
      address: String,
      postalCode: String,
      state: String
    }),
  
    Korea: new mongoose.Schema({
      name: String,
      address: String,
      district: String,
      city: String,
      province: String,
      country: String,
      postalCode: String
    }),
  
    Spain: new mongoose.Schema({
      name: String,
      address: String,
      city: String,
      country: String,
      postalCode: String
    }),
  
    UK: new mongoose.Schema({
      name: String,
      address: String,
      city: String,
      country: String,
      postalCode: String, 
    }),
  
    US: new mongoose.Schema({
      name: String,
      address: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    })
  };
  
  // Define models based on the schemas
  const addressModels = {};
  
  //Set the country key for the countries where their names are not equal to the colleciton name
  let countryKey = "";
  Object.keys(addressSchemas).forEach((country) => {
    if (country === "South Korea") {
      countryKey = "Korea";
    } else if (country === "United States") {
      countryKey = "US";
    } else if (country === "United Kingdom") {
      countryKey = "UK";
    } else {
      countryKey = country;
    }
    addressModels[countryKey] = mongoose.model(countryKey, addressSchemas[countryKey], countryKey);
    console.log(`Model set for ${countryKey}`);
  });
  
  console.log("Final models available:", Object.keys(addressModels));

  module.exports = { addressModels };
