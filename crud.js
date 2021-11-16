const express = require('express');
const app = express();
const products = require('./api/products');
const PORT = 8043;

app.use(express.json());
app.use('/api', products);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});