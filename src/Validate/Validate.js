  import { states, provinceCodes, provinces, BrazilProvinceCodeKey, prefectures } from '../Mappings/StateProvinceMappings'
  
  //Input Validation
  const isAlphaNumeric = (value) => /^[\p{L}\p{N}\s.,#-°]+$/u.test(value);
  const brazilPostalZip = (zip) => /^\d{5}-\d{3}$/.test(zip);
  const canadaPostalZip = (zip) => /^[A-Z0-9]{3}\s[A-Z0-9]{3}$/.test(zip);
  const indiaPostalCode = (code) => /^\d{6}$/.test(code);
  const japanPostalCode = (code) => /^\d{3}-\d{4}$/.test(code);
  const fiveDigitPostalCode = (code) => /^\d{5}$/.test(code);
  const ukPostalCode = (code) => /^(?:[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i.test(code);
  const usZipCode = (code) => /^\d{5}$/.test(code);
  let isValid = true;
  let errorMessage='';

  // Checks if the state is included in the country
  const validState = (country, state) => {
    return states[country]?.includes(state);
  };

    // Checks to see if province code is included in the country
    const validPrefecture = (country, code) => {
      return prefectures[country]?.includes(code);
    };
    
  
  // Checks to see if province code is included in the country
  const validProvinceCode = (country, code) => {
    return provinceCodes[country]?.includes(code);
  };
  
  // Checks to see if the province is included in the country
  const validProvinceForCountry = (country, province) => {
    return provinces[country]?.includes(province);
  };
  
  // Confirms that province code is mapped to correct province for Brazil
  const validBrazilProvinceCode = (province, code) => {
    return BrazilProvinceCodeKey[province] === code;
  };
  
  // Confirms that form data of a Brazil query are valid
  const validateBrazil = (key, formData, newInvalidFields) => {
    if (key === 'postalZip' && !brazilPostalZip(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal zip format: It should be 5 numbers followed by a dash and 3 more numbers.`;
    } else if (key === 'province' && !validProvinceForCountry('Brazil', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid province: It should be a valid province for Brazil.`;
    } else if (key === 'provinceCode' && !validBrazilProvinceCode(formData['province'], formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid province code: It does not match the given province. Must be 2 letters.`;
    }
  };
  
    // Confirms that form data of a Canada query are valid
  const validateCanada = (key, formData, newInvalidFields) => {
    if (key === 'provinceCode' && !validProvinceCode('Canada', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid province code format: It should be 2 uppercase letters.`;
    } else if (key === 'postalZip' && !canadaPostalZip(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal zip format: Please enter a postal code in the correct format (e.g., 'V5K 0A3'). It should consist of three uppercase letters or digits, followed by a space, and then three more uppercase letters or digits.`;
    }
  };

    // Confirms that form data of a Germany query are valid
  const validateGermany = (key, formData, newInvalidFields) => {
    if (key === 'postalCode' && !fiveDigitPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 5 digits.`;
    }
  };
  
    // Confirms that form data of an India query are valid
  const validateIndia = (key, formData, newInvalidFields) => {
    if (key === 'postalcode' && !indiaPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 6 digits.`;
    } else if (key === 'state' && !validState('India', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid state: please select a State from India's dropdown.`;
    }
  };
  
    // Confirms that form data of a Japan query are valid
  const validateJapan = (key, formData, newInvalidFields) => {
    if (key === 'postal_code' && !japanPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 3 digits followed by a dash and another 4 digits.`;
    } else if (key === 'prefecture' && !validPrefecture('Japan', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid prefecture: please select a prefecture from Japan's dropdown.`;
    }
  };

    // Confirms that form data of a Korea query are valid
  const validateKorea = (key, formData, newInvalidFields) => {
    if (key === 'postalCode' && !fiveDigitPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 5 digits.`;
    } else if (key === 'province' && !validProvinceForCountry('Korea', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid province: It should be a valid province for Korea.`;
    }
  };

    // Confirms that form data of a Mexico query are valid
  const validateMexico = (key, formData, newInvalidFields) => {
    if (key === 'postalCode' && !fiveDigitPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 5 digits.`;
    } else if (key === 'state' && !validState('Mexico', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid state: It should be a valid state for Mexico.`;
    }
  };

    // Confirms that form data of a Spain query are valid
  const validateSpain = (key, formData, newInvalidFields) => {
    if (key === 'postalCode' && !fiveDigitPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage=`Invalid postal code format: It should be 5 digits.`;
    }
  };
  
    // Confirms that form data of a UK query are valid
  const validateUK = (key, formData, newInvalidFields) => {
    if (key === 'postalCode' && !ukPostalCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid postal code format: It should be 2-4 alphanumeric characters followed by a space and 3 alphanumeric characters.`;
    }
  };

    // Confirms that form data of a US query are valid
  const validateUS = (key, formData, newInvalidFields) => {
    if (key === 'zipCode' && !usZipCode(formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid zip code format: It should be 5 digits.`;
    } else if (key === 'state' && !validState('US', formData[key])) {
      newInvalidFields[key] = true;
      isValid=false;
      errorMessage= `Invalid state: It should be a valid state for the US.`;
    }
  };

  // Invalid input if there is an empty part of the address
  const validateInput = (formData, selectedCountries, requiredFields, setMessage, setInvalidFields) => {
    const country = selectedCountries[0];
    const required = requiredFields[country];
    let newInvalidFields = {};
    errorMessage = '';
    isValid = true;

      for (let key of required) {
        if (formData[key] === '') {
          newInvalidFields[key] = true;
          isValid = false;
          errorMessage = `Invalid input: Fields cannot be empty.`;
        } else if (!isAlphaNumeric(formData[key])) {
          newInvalidFields[key] = true;
          isValid = false;
          errorMessage = `Invalid input: The input needs to be alphanumeric.`;
        } else if (country === 'Brazil') {
          validateBrazil(key, formData, newInvalidFields);
        } else if (country === 'Canada') {
          validateCanada(key, formData, newInvalidFields);
        } else if (country === 'India') {
          validateIndia(key, formData, newInvalidFields);
        } else if (country === 'Japan') {
          validateJapan(key, formData, newInvalidFields);
        } else if (country === 'Germany') {
          validateGermany(key, formData, newInvalidFields);
        } else if (country === 'Korea') {
          validateKorea(key, formData, newInvalidFields);
        } else if (country === 'Mexico') {
          validateMexico(key, formData, newInvalidFields);
        } else if (country === 'Spain') {
          validateSpain(key, formData, newInvalidFields);
        } else if (country === 'UK') {
          validateUK(key, formData, newInvalidFields);
        } else if (country === 'US') {
          validateUS(key, formData, newInvalidFields);
        }
      };
  
    setInvalidFields(newInvalidFields);
    if(!isValid && errorMessage) {
      alert(errorMessage);
    }
    return isValid;
  }

// Checks for empty fields
const emptyFields = (Data) => {
  // Exclude the country when checking for empty fields
  const { country, ...rest } = Data;
  return Object.values(rest).every(value => value.trim() === '');
};

// Checks/confirms if formdata has changed when a user updates an address
const hasChanges = (originalData, newData) => {
  // Exclude 'country' from both originalData and newData
  const { country: originalCountry, ...restOriginal } = originalData;
  const { country: newCountry, ...restNew } = newData;

  return Object.keys(restNew).some(key =>
    restOriginal[key] !== restNew[key] &&  
    restNew[key].trim() !== ''             
  );
};
  

  export { 
    isAlphaNumeric, 
    validProvinceCode, 
    validState,
    validProvinceForCountry,
    validBrazilProvinceCode,
    brazilPostalZip, 
    canadaPostalZip, 
    indiaPostalCode, 
    japanPostalCode, 
    fiveDigitPostalCode, 
    ukPostalCode, 
    usZipCode, 
    validateInput,
    emptyFields,
    hasChanges
  };
