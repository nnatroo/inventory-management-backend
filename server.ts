import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface Inventory {
  id: number;
  name: string;
  price: number;
  location: string;
}

let inventories: Inventory[] = [
  { id: 1123, name: 'Inventory 1', price: 10.99, location: 'A1' },
  { id: 2, name: 'Inventory 2', price: 20.99, location: 'B2' },
  { id: 3, name: 'Inventory 3', price: 30.99, location: 'C3' },
];

app.use(express.json());

app.get('/inventories', (req: Request, res: Response) => {
  res.json(inventories);
});

app.post('/inventories', (req: Request, res: Response) => {
  const { name, price, location } = req.body;
  const inventory: Inventory = { id: Date.now(), name, price, location };
  inventories.push(inventory);
  res.json(inventory);
});

app.delete('/inventories/:inventoryID', (req: Request, res: Response) => {
  const inventoryID = parseInt(req.params.inventoryID);
  inventories = inventories.filter((inventory) => inventory.id !== inventoryID);
  res.send(`Inventory ${inventoryID} has been deleted.`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});