const express = require('express');
const app = express();

// Define GET /inventories endpoint
app.get('/inventories', (req, res) => {
  // Retrieve the list of inventories
  const inventories = [
    { id: 1, name: 'Inventory 1', price: 10.99, location: 'A1' },
    { id: 2, name: 'Inventory 2', price: 20.99, location: 'B2' },
    { id: 3, name: 'Inventory 3', price: 30.99, location: 'C3' },
  ];

  // Send the inventories as a response
  res.json(inventories);
});

// Define POST /inventories endpoint
app.post('/inventories', (req, res) => {
  // Parse the JSON object from the request body
  const { name, price, location } = req.body;

  // Create a new inventory object
  const inventory = { id: Date.now(), name, price, location };

  // Send the new inventory as a response
  res.json(inventory);
});

// Define DELETE /inventories/:inventoryID endpoint
app.delete('/inventories/:inventoryID', (req, res) => {
  // Retrieve the inventory ID from the request parameters
  const inventoryID = req.params.inventoryID;

  // Delete the inventory with the given ID
  // ...

  // Send a success message as a response
  res.send(`Inventory ${inventoryID} has been deleted.`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});