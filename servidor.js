const express = require('express');
const productos = require('./api/productos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/productos/listar', (req, res) => {
  const products = productos.listar();

  if (products.length === 0) {
    throw new Error('Al momento no hay productos cargados');
  }
  res.json(products);
})

app.get('/api/productos/listar/:id', (req, res) => {
  const { id } = req.params;
  const product = productos.obtener(Number(id));
  if (product === undefined) throw new Error('producto no encontrado');
  res.json(product);
})

app.post('/api/productos/guardar', (req, res) => {
  const { title, price, thumbnail, stock } = req.body;
  const product = productos.guardar({title: title, price: price, thumbnail: thumbnail, stock: stock});
  res.status(201).json(product);
})

// Para manejar errores

app.use((error, req, res, next) => {
  res.status(400).json({ error: error.message });
})

// El servidor escucha en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
})

// Error
server.on('error', error => {
  console.log('error en el servidor:', error);
})