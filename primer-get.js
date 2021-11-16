const express = require('express');
const app = express();
const PORT = 3000;
const products = require('./db');


//ejercicio 1
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//ejercicio 2
app.get('/', (req, res) => {
  res.status(200).send('Hola Mundo!!!!!');
});

//practica2
app.get('/products', (req, res) => {
  res.status(200).json(products);
});