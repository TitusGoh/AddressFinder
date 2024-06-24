import React from 'react';

/**
 * Renders the dynamic form content for Brazil.
 * Includes fields for name, address, neighborhood, city, province, province code, and postal zip.
 */
export const BrazilForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="neighborhood" name="neighborhood" placeholder={invalidFields.neighborhood ? 'Neighborhood cannot be empty' : 'Neighborhood'} value={formData.neighborhood} onChange={handleInputChange} className={`input-field ${invalidFields.neighborhood ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "province",
      name: "province",
      placeholder: invalidFields.province ? 'Province cannot be empty' : 'Select Province',
      value: formData.province,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.province ? 'error' : ''}`,
      invalid: invalidFields.province
    })}
    <input type="text" id="provinceCode" name="provinceCode" placeholder={invalidFields.provinceCode ? 'Province code cannot be empty' : 'Province code'} value={formData.provinceCode} onChange={handleInputChange} className={`input-field ${invalidFields.provinceCode ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`} />
    <br />
    <input type="text" id="postalZip" name="postalZip" placeholder={invalidFields.postalZip ? 'Postal Zip cannot be empty' : 'Postal Zip'} value={formData.postalZip} onChange={handleInputChange} className={`input-field ${invalidFields.postalZip ? 'error' : ''}`} />
  </div>
);

/**
 * Renders the dynamic form content for Canada.
 * Includes fields for name, address, city, province code, and postal zip.
 */
export const CanadaForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "provinceCode",
      name: "provinceCode",
      placeholder: invalidFields.provinceCode ? 'Province Code cannot be empty' : "Select Province Code",
      value: formData.provinceCode,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.provinceCode ? 'error' : ''}`,
      invalid: invalidFields.provinceCode
    })}
    <input type="text" id="postalZip" name="postalZip" placeholder={invalidFields.postalZip ? 'Postal Zip cannot be empty' :'Postal Zip'} value={formData.postalZip} onChange={handleInputChange} className={`input-field ${invalidFields.postalZip ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.name ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for Germany.
 * Includes fields for name, address, postal code, and city.
 */
export const GermanyForm = ({ formData, handleInputChange, invalidFields, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for India.
 * Includes fields for name, address, city, state, and postal code.
 */
export const IndiaForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="addressLine1" name="addressLine1" placeholder={invalidFields.addressLine1 ? 'Street Name, House Number cannot be empty' :'StreetName, House Number'} value={formData.addressLine1} onChange={handleInputChange} className={`input-field ${invalidFields.addressLine1 ? 'error' : ''}`} />
    <br />
    <input type="text" id="addressLine2" name="addressLine2" placeholder={invalidFields.addressLine2 ? 'Address Line 2 cannot be empty' :'Address Line 2'} value={formData.addressLine2} onChange={handleInputChange} className={`input-field ${invalidFields.addressLine2 ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "state",
      name: "state",
      placeholder: invalidFields.state ? 'State cannot be empty' : "Select State",
      value: formData.state,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.state ? 'error' : ''}`,
      invalid: invalidFields.state
    })}
    <input type="text" id="postalcode" name="postalcode" placeholder={invalidFields.postalcode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalcode} onChange={handleInputChange} className={`input-field ${invalidFields.postalcode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for Japan.
 * Includes fields for postal code, prefecture, city, street name, house number, and name.
 */
export const JapanForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="postal_code" name="postal_code" placeholder={invalidFields.postal_code ? 'Postal Code cannot be empty' : 'Postal Code'} value={formData.postal_code} onChange={handleInputChange} className={`input-field ${invalidFields.postal_code ? 'error' : ''}`} />
    <br />

    {renderStateProvinceDropdown({
      id: "prefecture",
      name: "prefecture",
      placeholder: invalidFields.prefecture ? 'Prefecture cannot be empty' : "Select Prefecture",
      value: formData.prefecture,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.prefecture ? 'error' : ''}`,
      invalid: invalidFields.prefecture
    })}

    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    <input type="text" id="street_name" name="street_name" placeholder={invalidFields.street_name ? 'Street Name cannot be empty' : 'Street Name and Block Number'} value={formData.street_name} onChange={handleInputChange} className={`input-field ${invalidFields.street_name ? 'error' : ''}`} />
    <br />
    <input type="text" id="house_number" name="house_number" placeholder={invalidFields.house_number ? 'House Number cannot be empty' : 'House Number/Building Number'} value={formData.house_number} onChange={handleInputChange} className={`input-field ${invalidFields.house_number ? 'error' : ''}`} />
    <br />
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for Korea.
 * Includes fields for name, address, district, city, province, and postal code.
 */
export const KoreaForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, Building Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="district" name="district" placeholder={invalidFields.district ? 'District cannot be empty' : "District"} value={formData.district} onChange={handleInputChange} className={`input-field ${invalidFields.district ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "province",
      name: "province",
      placeholder: invalidFields.province ? 'Province cannot be empty' : 'Select Province',
      value: formData.province,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.province ? 'error' : ''}`,
      invalid: invalidFields.province
    })}
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for Mexico.
 * Includes fields for name, address, neighborhood, city, state, and postal code.
 */
export const MexicoForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="neighborhood" name="neighborhood" placeholder={invalidFields.neighborhood ? 'Neighborhood cannot be empty' : 'Neighborhood'} value={formData.neighborhood} onChange={handleInputChange} className={`input-field ${invalidFields.neighborhood ? 'error' : ''}`}/>
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "state",
      name: "state",
      placeholder: invalidFields.state ? 'State cannot be empty' : "Select State",
      value: formData.state,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.state ? 'error' : ''}`,
      invalid: invalidFields.state
    })}
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="country" name="country" placeholder='Country' value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for Spain.
 * Includes fields for name, address, postal code, city, and country.
 */
export const SpainForm = ({ formData, handleInputChange, invalidFields, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder="Country" value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for the UK.
 * Includes fields for name, address, city, postal code, and country.
 */
export const UKForm = ({ formData, handleInputChange, invalidFields, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="country" name="country" placeholder="Country" value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for the US.
 * Includes fields for name, address, address line 2, city, state, and zip code.
 */
export const USForm = ({ formData, handleInputChange, invalidFields, renderStateProvinceDropdown, selectedCountries, handleCountryChange }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="address" name="address" placeholder={invalidFields.address ? 'Address cannot be empty' : 'Street Name, House Number'} value={formData.address} onChange={handleInputChange} autoComplete='billing street-address' className={`input-field ${invalidFields.address ? 'error' : ''}`} />
    <br />
    <input type="text" id="addressLine2" name="addressLine2" placeholder={invalidFields.addressLine2 ? 'Address Line 2 cannot be empty' :'Apt# or P.O. Box'} value={formData.addressLine2} onChange={handleInputChange} className={`input-field ${invalidFields.addressLine2 ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    {renderStateProvinceDropdown({
      id: "state",
      name: "state",
      placeholder: invalidFields.state ? 'State cannot be empty' : "Select State",
      value: formData.state,
      onChange: handleInputChange,
      className: `input-field ${invalidFields.state ? 'error' : ''}`,
      invalid: invalidFields.state
    })}
    <input type="text" id="zipCode" name="zipCode" placeholder={invalidFields.zipCode ? 'Zip Code cannot be empty' : "Zip Code"} value={formData.zipCode} onChange={handleInputChange} className={`input-field ${invalidFields.zipCode ? 'error' : ''}`} />
    <br />
    <input type="text" id="country" name="country" placeholder="Country" value={selectedCountries[0]} onChange={(e) => { handleCountryChange(e); handleInputChange(e); }} readOnly className={`input-field ${invalidFields.country ? 'error' : ''}`}/>
  </div>
);

/**
 * Renders the dynamic form content for a default country.
 * Includes fields for name, address line 1, address line 2, city, state/province, and postal code.
 */
export const DefaultForm = ({ formData, handleInputChange, invalidFields }) => (
  <div>
    <input type="text" id="name" name="name" placeholder={invalidFields.name ? 'Name cannot be empty' : 'Name'} value={formData.name} onChange={handleInputChange} className={`input-field ${invalidFields.name ? 'error' : ''}`} />
    <br />
    <input type="text" id="addressLine1" name="addressLine1" placeholder={invalidFields.addressLine1 ? 'Address Line 1 cannot be empty' : "Address Line 1"} value={formData.addressLine1} onChange={handleInputChange} className={`input-field ${invalidFields.addressLine1 ? 'error' : ''}`} />
    <br />
    <input type="text" id="addressLine2" name="addressLine2" placeholder={invalidFields.addressLine2 ? 'Address Line 2 cannot be empty' : "Address Line 2"} value={formData.addressLine2} onChange={handleInputChange} className={`input-field ${invalidFields.addressLine2 ? 'error' : ''}`} />
    <br />
    <input type="text" id="city" name="city" placeholder={invalidFields.city ? 'City cannot be empty' : 'City'} value={formData.city} onChange={handleInputChange} className={`input-field ${invalidFields.city ? 'error' : ''}`} />
    <br />
    <input type="text" id="stateProvince" name="stateProvince" placeholder={invalidFields.stateProvince ? 'State/Province/Region cannot be empty' : "State/Province/Region"} value={formData.stateProvince} onChange={handleInputChange} className={`input-field ${invalidFields.stateProvince ? 'error' : ''}`} />
    <br />
    <input type="text" id="postalCode" name="postalCode" placeholder={invalidFields.postalCode ? 'Postal Code cannot be empty' :'Postal Code'} value={formData.postalCode} onChange={handleInputChange} className={`input-field ${invalidFields.postalCode ? 'error' : ''}`}/>
    <br />
    <input type="text" id="country" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} className={`input-field ${invalidFields.country ? 'error' : ''}`} />
    <br />
  </div>
);
