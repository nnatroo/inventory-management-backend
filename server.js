const express = require('express');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')
const cors = require('cors')


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize('inventoryDB', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();

const Item = sequelize.define('item', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
  },
  place: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.INTEGER
  },
});

// the defined model is the class itself
console.log(Item === sequelize.models.item);



app.get('/inventories', async (req, res) => {
  sortOption = req.query.sort;
  sortType = req.query.type;

  const items = await Item.findAll({
    order: [[sortOption, sortType]]
  });
  console.log(items.every(item => item instanceof Item)); // true
  const dataJSON = JSON.stringify(items, null, 2);

  res.send(JSON.parse(dataJSON));
});


app.post('/inventories', (req, res) => {

});

app.delete('/inventories/:inventoryID', async (req, res) => {

  const inventoryID = req.params.inventoryID;

  await Item.destroy({
    where: {
      id: inventoryID
    }
  });

  res.sendStatus(204);

});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});