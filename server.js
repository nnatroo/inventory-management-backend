const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');


app.get('/inventories', (req, res) => {

  const inventories = [
    { id: 1, name: 'Inventory 1', price: 10.99, location: 'A1' },
    { id: 2, name: 'Inventory 2', price: 20.99, location: 'B2' },
    { id: 3, name: 'Inventory 3', price: 30.99, location: 'C3' },
  ];

  res.json(inventories);
});


app.post('/inventories', (req, res) => {

  const { name, price, location } = req.body;
  const inventory = { id: Date.now(), name, price, location };

  res.json(inventory);
});


app.delete('/inventories/:inventoryID', (req, res) => {
  const inventoryID = req.params.inventoryID;

  res.send(`Inventory ${inventoryID} has been deleted.`);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});