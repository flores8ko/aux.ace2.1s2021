const express = require('express');
const app = express();
const port =  process.env.PORT || 80


//Models
const sequelize = require('./definitions.js');

//Enable CORS
const cors = require('cors');
app.use(cors());


//Routes Definitions
const productsRouter = require('./api-routes-products.js');
app.use('/products', productsRouter);


//Index page
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Intitializing
assertDatabaseConnectionOk()
    .then(() => {
      console.log('syncing...');
      return sequelize.sync({ alter: true });
    })
    .then(() => {
      console.log('database ok.');
        app.listen(port, () => {
          console.log(`Example app listening at http://localhost:${port}`)
        });
    });



//Utils
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}
