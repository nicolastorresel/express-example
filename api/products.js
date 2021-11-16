const router = require('express').Router();
const user = require('../middleware/user');
const auth = require('../middleware/auth');

let products = [
  {id: 1, name: 'Macbook', price: 1300, quantity: 40, colors: ['silver', 'black', 'white'] },
  {id: 2, name: 'Iphone', price: 1000, quantity: 50, colors: ['silver', 'red', 'white'] },
  {id: 3, name: 'Pendrive', price: 10, quantity: 10, colors: [] },
  {id: 4, name: 'Headset', price: 50, quantity: 0, colors: ['black'] },
  {id: 5, name: 'Mouse', price: 20, quantity: 5, colors: ['white', 'black', 'blue'] },
  {id: 6, name: 'Tablet', price: 500, quantity: 20, colors: ['white', 'black'] },
  {id: 7, name: 'USB adaptor', price: 5, quantity: 0, colors: [] },
  {id: 8, name: 'Keyboard', price: 30, quantity: 35, colors: ['white'] },
  {id: 9, name: 'Gamepad', price: 30, quantity: 25, colors: ['black', 'silver'] },
  {id: 10, name: 'Monitor', price: 200, quantity: 3, colors: [] },
];

//1. Retornar todos los productos del array. “/api/products”, ADEMAS MODIFICAR EL PRECIO Y AGREGAR UN SIMBOLO DE PESOS
router.get('/products', user, auth, (req, res) => {

  const newProducts = products.map((product) => ({...product, price: `$ ${product.price}.-`}))
  res.status(200).json(newProducts);
});

//2. Obtener un producto específico mediante su ID “/api/product/:id”
router.get('/product/:id', (req, res) => {

  const { id } = req.params;
  const ret = products.find((product) => product.id === Number(id))
  res.status(200).json(ret);
});

// 3. Agregar un nuevo producto “/api/product”,
router.post('/product', (req, res) => {

  const { name, price, quantity, colors } = req.body || '';
  //const body = req.body

  if(req.body !== '') {
    products.push({id: products.length+1, ...req.body})
}
res.json({productos: products})
})

// 4. Cambiar alguna propiedad de un producto en particular ( Puede ser name, price, quantity o el que desees ) “/api/product/:id”,
router.put('/product/:id', (req, res) => {

  const { id } = req.params;
  const { name, price, quantity, colors } = req.body || '';

  const productEdited = products.find((product) => {
    if (product.id === Number(id)) {
      return (
        product.name = name,
        product.price = price,
        product.quantity = quantity,
        product.colors = colors
      );
    }
  });
  if (!productEdited) return res.send('Product Not found')
  res.json(productEdited);
});

 //5. Eliminar un producto mediante su ID “/api/product/:id”
router.delete('/product/:id', (req, res) => {
  const { id } = req.params;

  let seEncontroID = products.find((product) => product.id === Number(id))

  if (seEncontroID) {
    products = products.filter((product) => product.id !== Number(id));
    res.json({ productoEliminado: products })
  }else {
    res.send(`Product with id: ${id} Not Found`);
  }
})

module.exports = router;

