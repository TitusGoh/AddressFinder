// DynamicForm.js
import React, { useState, useEffect } from 'react';
import config from '../Config/Config';
import Select from 'react-select';
import { searchAddresses } from '../Search/SearchClient';
import SearchResult from '../Search/SearchResult';
import { countryOptions, CountryRequiredFields, FullCountryToSchemaKey } from '../Mappings/CountryMappings'
import { validateInput, emptyFields, hasChanges } from '../Validate/Validate';
import { states, provinceCodes, provinces, prefectures, BrazilProvinceCodeKey, CanadaProvinceCodeKey, MexicoStateCodeKey, UsStateCodeKey } from '../Mappings/StateProvinceMappings'
import { BrazilForm, CanadaForm, GermanyForm, IndiaForm, JapanForm, KoreaForm, MexicoForm, SpainForm, USForm, UKForm, DefaultForm } from './FormComponents';

/**
 * Initializes form data with default values for a given country,
 * and optionally sets the country.
 */
const initialFormData = (country = "") => ({
  name: "",
  houseNumberStreetNumber: "",
  address: "",
  neighborhood: "",
  city: "",
  provinceCode: "",
  province: "",
  country: country,
  postalZip: "",
  postalCode: "",
  postalcode: "",
  postal_code: "",
  state: "",
  prefecture: "",
  district: "",
  street_name: "",
  house_number: "",
  stateProvince: "",
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
});

/**
 * Handles changes to input fields in the form.
 */
const handleInputChange = (e, formData, setFormData, invalidFields, setInvalidFields) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  if (invalidFields[name]) {
    setInvalidFields({ ...invalidFields, [name]: false });
  }
};

/**
 * Resets the form to its initial state.
 * Clears all form data, search results, and validation errors.
 */
const resetForm = (country = "", setFormData, setIsUpdating, setSelectedAddressId, setOriginalFormData, setSearchResults, setSearchInitiated, setInvalidFields, setIsAddButtonDisabled, setIsUpdateButtonDisabled, setSelectedStateProvince) => {
  setFormData(initialFormData(country));
  setIsUpdating(false);
  setSelectedAddressId(null);
  setOriginalFormData({});
  setSearchResults([]);
  setSearchInitiated(false);
  setInvalidFields({});
  setIsAddButtonDisabled(true);
  setIsUpdateButtonDisabled(true);
  setSelectedStateProvince(null);
};

/**
 * Main dynamic form component.
 */
const DynamicForm = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedStateProvince, setSelectedStateProvince] = useState(null);
  const [stateProvinceOptions, setStateProvinceOptions] = useState([]);
  const [Message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [originalFormData, setOriginalFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);
  const [formData, setFormData] = useState(initialFormData());
  const [loading, setLoading] = useState(false);

  // Update button states based on form data changes
  useEffect(() => {
    if (selectedCountries.length !== 1) {
      setIsAddButtonDisabled(true);
    } else {
      setIsAddButtonDisabled(emptyFields(formData));
    }
    setIsUpdateButtonDisabled(!hasChanges(originalFormData, formData));
  }, [formData, originalFormData, selectedCountries]);

  /**
   * Handles country selection changes.
   * Updates the form and state/province options based on the selected country.
   */
  const handleCountryChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    if (values.length > 0) {
      updateStateProvinceOptions(values[0]);
    } else {
      setStateProvinceOptions([]);
    }
    setSelectedCountries(values);
    resetForm(values.length > 0 ? values[0] : "", setFormData, setIsUpdating, setSelectedAddressId, setOriginalFormData, setSearchResults, setSearchInitiated, setInvalidFields, setIsAddButtonDisabled, setIsUpdateButtonDisabled, setSelectedStateProvince);
  };

  /**
   * Updates state/province options based on selected country.
   */
  const updateStateProvinceOptions = (country) => {
    let options = [];
    if (country === 'Brazil') {
      options = provinces.Brazil.map((province, index) => ({
        label: province,
        value: provinces.Brazil[index]
      }));
    } else if (country === 'Canada') {
      options = provinceCodes.Canada.map(provinceCode => ({
        label: CanadaProvinceCodeKey.find(option => option.value === provinceCode)?.label || provinceCode,
        value: provinceCode
      }));
    } else if (country === 'Korea') {
      options = provinces.Korea.map(province => ({ label: province, value: province }));
    } else if (country === 'Mexico') {
      options = states.Mexico.map(state => ({
        label: MexicoStateCodeKey.find(option => option.value === state)?.label || state,
        value: state
      }));
    } else if (country === 'US') {
      options = states.US.map(state => ({
        label: UsStateCodeKey.find(option => option.value === state)?.label || state,
        value: state
      }));
    } else if (country === 'India') {
      options = states.India.map(state => ({ label: state, value: state }));
    } else if (country === 'Japan') {
    options = prefectures.Japan.map(prefecture => ({ label: prefecture, value: prefecture }));
    }
    setStateProvinceOptions(options);
  };

  /**
   * Handles state/province selection changes.
   * Updates the form data with the selected state/province information.
   */
  const handleStateProvinceChange = (option) => {
    setSelectedStateProvince(option);

    let fieldNames = [];

    const selectedCountry = selectedCountries[0];
    if (selectedCountry === 'Brazil') {
      fieldNames = ['province', 'provinceCode'];
    } else if (selectedCountry === 'Mexico' || selectedCountry === 'US' || selectedCountry === 'India') {
      fieldNames = ['state'];
    } else if (selectedCountry === 'Korea') {
      fieldNames = ['province'];
    } else if (selectedCountry === 'Canada') {
      fieldNames = ['provinceCode'];
    } else if (selectedCountry === 'Japan') {
      fieldNames = ['prefecture'];
    }

    if (option) {
      if (selectedCountries[0] === 'Brazil') {
        const provinceCode = BrazilProvinceCodeKey[option.label];
        setFormData({ ...formData, province: option.label, provinceCode: provinceCode });
      } else if (selectedCountries[0] === 'Mexico' || selectedCountries[0] === 'US' || selectedCountries[0] === 'India') {
        setFormData({ ...formData, state: option.value });
      } else if (selectedCountries[0] === 'Korea') {
        setFormData({ ...formData, province: option.label });
      } else if (selectedCountries[0] === 'Canada') {
        setFormData({ ...formData, provinceCode: option.value });
      } else if (selectedCountries[0] === 'Japan') {
        setFormData({ ...formData, prefecture: option.value });
    } else {
        if (selectedCountries[0] === 'Brazil') {
          setFormData({ ...formData, province: '', provinceCode: '' });
        } else if (selectedCountries[0] === 'Mexico' || selectedCountries[0] === 'US' || selectedCountries[0] === 'India') {
          setFormData({ ...formData, state: '' });
        } else if (selectedCountries[0] === 'Korea') {
          setFormData({ ...formData, province: '' });
        } else if (selectedCountries[0] === 'Canada') {
          setFormData({ ...formData, provinceCode: '' });
        } else if (selectedCountries[0] === 'Japan') {
          setFormData({ ...formData, prefecture: '' });
        }
      }
    }
    fieldNames.forEach(fieldName => {
      if (invalidFields[fieldName]) {
        setInvalidFields(prevInvalidFields => ({ ...prevInvalidFields, [fieldName]: false }));
      }
    });
  };

  /**
   * Renders the state/province dropdown.
   */
  const renderStateProvinceDropdown = ({ placeholder, invalid}) => {
    return (
      <div className={`select-container ${invalid ? 'error' : ''}`}>
        <Select
          options={stateProvinceOptions}
          value={selectedStateProvince}
          onChange={handleStateProvinceChange}
          placeholder={placeholder}
          isClearable
          isSearchable
          formatOptionLabel={({ label }) => <div>{label}</div>}
          components={{ SingleValue: ({ data }) => <div>{data.value}</div> }}
          classNamePrefix="react-select"
        />
      </div>
    );
  };

  /**
   * Handles form submission for adding or updating an address.
   * Validates input and sends a request to the server to add or update the address.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput(formData, selectedCountries, CountryRequiredFields, setMessage, setInvalidFields)) {
      return;
    }

    const fullCountryNames = {
      'US': 'United States',
      'UK': 'United Kingdom',
      'Korea': 'South Korea'
    };

    const normalizedCountry = fullCountryNames[formData.country] || formData.country;

    const validData = Object.entries({ ...formData, country: normalizedCountry }).reduce((acc, [key, value]) => {
      if (value.trim() !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const url = isUpdating 
        ? `${config.addUrl}/update/v1/countries/${normalizedCountry}/address/${selectedAddressId}`
        : `${config.addUrl}/add/v1`;

      const method = isUpdating ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validData)
      });

      if (response.ok) {
        alert(isUpdating ? 'Address updated successfully' : 'Address added successfully');
        resetForm(formData.country, setFormData, setIsUpdating, setSelectedAddressId, setOriginalFormData, setSearchResults, setSearchInitiated, setInvalidFields, setIsAddButtonDisabled, setIsUpdateButtonDisabled, setSelectedStateProvince);
      } else {
        alert(`Failed to ${isUpdating ? 'update' : 'add'} address: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Failed to ${isUpdating ? 'update' : 'add'} address: ${error.message}`);
    }
  };

  /**
   * Handles search form submission.
   * Constructs a query based on the form data and performs a search.
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchInitiated(true);
    setLoading(true);

    const { country, ...otherFormData } = formData;

    const queryParameters = {
      ...otherFormData,
      countries: selectedCountries.join(',')
    };

    Object.keys(queryParameters).forEach(key => {
      if (!queryParameters[key]) {
        delete queryParameters[key];
      }
    });

    try {
      const results = await searchAddresses(queryParameters);
      setInvalidFields({});
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false); 
    }
  };

 /**
   * Handles selection of an address from search results.
   * Populates the form with the selected address data for updating.
   */
  const handleSelectAddress = (address) => {
    const schemaCountry = FullCountryToSchemaKey[address.country] || address.country;

    const filteredAddress = Object.keys(address).reduce((acc, key) => {
      if (key !== '__v') {
        acc[key] = address[key];
      }
      return acc;
    }, {});

    setFormData({
      ...formData,
      ...filteredAddress,
      country: schemaCountry
    });

    setSelectedCountries([schemaCountry]);

    let selectedOption;

    if (address.province) {
      selectedOption = {
        label: address.province,
        value: address.province
      };
      setSelectedStateProvince(selectedOption);
    } else if (address.provinceCode) {
      selectedOption = {
        label: address.provinceCode,
        value: address.provinceCode
      }
      setSelectedStateProvince(selectedOption);
    } else if (address.state) {
      selectedOption = {
        label: address.state,
        value: address.state
      }
      setSelectedStateProvince(selectedOption);
    } else if (address.prefecture) {
      selectedOption = {
        label: address.prefecture,
        value: address.prefecture
      }
      setSelectedStateProvince(selectedOption);
    }

    setIsUpdating(true);
    setSelectedAddressId(address._id);
    setOriginalFormData({ ...formData, ...filteredAddress });

    window.scrollTo({ top: 0, behavior: 'auto' });
  };


  /**
   * Renders the appropriate form based on the selected country.
   */
  const renderFormForCountry = (country) => {
    switch (country) {
      case 'Brazil':
        return <BrazilForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Canada':
        return <CanadaForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Germany':
        return <GermanyForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'India':
        return <IndiaForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Japan':
        return <JapanForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Korea':
        return <KoreaForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Mexico':
        return <MexicoForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'Spain':
        return <SpainForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'UK':
        return <UKForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      case 'US':
        return <USForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} renderStateProvinceDropdown={renderStateProvinceDropdown} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange} />;
      default:
        return <DefaultForm formData={formData} handleInputChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} invalidFields={invalidFields} />;
    }
  };

  return (
    <div className="dynamic-form-container">
      <div className="country-select-container">
        <label htmlFor="country-select">Select Country:</label>
        <Select
          id="country-select"
          options={countryOptions}
          isMulti
          onChange={handleCountryChange}
          value={selectedCountries.map(country => ({
            label: countryOptions.find(option => option.value === country)?.label || country,
            value: country
          }))}
          placeholder="Select Countries"
          isClearable
          classNamePrefix="react-select"
        />
      </div>
      {selectedCountries.length > 0 && (
        selectedCountries.length === 1 ? (
          <div className="form-content">
            {renderFormForCountry(selectedCountries[0])}
          </div>
        ) : (
          <div className="form-content">
            <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
            <br />

            <input type="text" id="addressLine1" name="addressLine1" placeholder={invalidFields.addressLine1 ? 'Address Line 1 cannot be empty' : 'Address Line 1'} value={formData.addressLine1} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.addressLine1 ? 'error' : ''}`} />
            <br />

            <input type="text" id="addressLine2" name="addressLine2" placeholder={invalidFields.addressLine2 ? 'Address Line 2 cannot be empty' : 'Address Line 2, Neighborhood, District, Apt#, P.O. Box'} value={formData.addressLine2} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.addressLine2 ? 'error' : ''}`} />
            <br />

            <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
            <br />

            <input type="text" id="stateProvince" name="stateProvince" placeholder={invalidFields.stateProvince ? 'State/Province/Region cannot be empty' : 'State/Province/Region'} value={formData.stateProvince} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.stateProvince ? 'error' : ''}`} />
            <br />

            <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' : 'Postal Code'} value={formData.postalCode} onChange={(e) => handleInputChange(e, formData, setFormData, invalidFields, setInvalidFields)} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`} />
          </div>
        )
      )}

      {selectedCountries.length >= 1 && (
        <div className="buttons-container">
          <br />
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isUpdating ? isUpdateButtonDisabled : isAddButtonDisabled}
            style={{
              backgroundColor: (isUpdating ? isUpdateButtonDisabled : isAddButtonDisabled) ? 'gray' : 'green',
              cursor: (isUpdating ? isUpdateButtonDisabled : isAddButtonDisabled) ? 'not-allowed' : 'pointer'
            }}
          >
            {isUpdating ? 'Update' : 'Add'}
          </button>
          <button type="button" className="search-button" onClick={handleSearch}>Search</button>
          <button className="reset-button" onClick={() => resetForm(formData.country, setFormData, setIsUpdating, setSelectedAddressId, setOriginalFormData, setSearchResults, setSearchInitiated, setInvalidFields, setIsAddButtonDisabled, setIsUpdateButtonDisabled, setSelectedStateProvince)}>Reset</button>

          {searchInitiated && <SearchResult results={searchResults} onSelectAddress={handleSelectAddress} searchInitiated={searchInitiated} loading={loading}/>}
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
