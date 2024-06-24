const app = require('../Config/ServerConfig');
const { addressModels } = require('../Model/Model');
const PORT = 3000;

// Route to post a new address object
app.post('/api/add/v1', async (req, res) => {
  try {
    console.log("body: ", req.body);
    // Extract address data from request body
    const { 
      name,
      houseNumberStreetNumber,
      address,
      neighborhood,
      city,
      provinceCode,
      province,
      country,
      postalZip,
      postalcode,
      postalCode,
      postal_code,
      state,
      prefecture,
      district,
      street_name,
      house_number,
      stateProvince,
      addressLine1,
      addressLine2,
      zipCode
     } = req.body;

    // Get the model based on the country
    let countryKey = "";
    if (country === "South Korea") {
      countryKey = "Korea";
    } else if (country === "United States") {
      countryKey = "US";
    } else if (country === "United Kingdom") {
      countryKey = "UK";
    } else {
      console.log("country: ", country);
      countryKey = country;
    }
    const AddressModel = addressModels[countryKey];
    if (!AddressModel) {
      return res.status(404).json({ success: false, error: 'Country not found' });
    }

    const newAddress = new AddressModel({
      name,
      houseNumberStreetNumber,
      address,
      neighborhood,
      city,
      provinceCode,
      province,
      country,
      postalZip,
      postalcode,
      postalCode,
      postal_code,
      state,
      prefecture,
      district,
      street_name,
      house_number,
      stateProvince,
      addressLine1,
      addressLine2,
      zipCode
    });

    // Save the document to the database
    await newAddress.save();

    res.status(200).json({ success: true, message: 'Address added successfully' });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ success: false, error: 'Failed to add address' });
  }
});

// Route to update address object
app.put('/api/update/v1/countries/:country/address/:addressId', async (req, res) => {
  try {
    const { country, addressId } = req.params;
    const updateData = req.body;

    // Get the model based on the country
    let countryKey = "";
    if (country === "South Korea") {
      countryKey = "Korea";
    } else if (country === "United States") {
      countryKey = "US";
    } else if (country === "United Kingdom") {
      countryKey = "UK";
    } else {
      countryKey = country;
    }

    const AddressModel = addressModels[countryKey];
    if (!AddressModel) {
      return res.status(404).json({ success: false, error: 'Country not found' });
    }
    const updatedAddress = await AddressModel.findByIdAndUpdate(addressId, updateData, { new: true });

    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ success: false, error: 'Failed to update address' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Add server is running on http://localhost:${PORT}`);
});
