const express = require('express')
const app = express()

app.use(express.static('public'))

// app.use(express.urlencoded({extended: false})); FORMULARIOS
app.use(express.json());

// const productosRouter = require("./routes/productos.router");
// app.use('/productos', productosRouter);

app.use('/productos', require("./routes/productos.router"))

// http://localhost:3000/
app.get('/', (req, res) => {
  res.send('hola express!!')
});

app.get('/nosotros', (req, res) => {
  //login
  res.sendFile(__dirname + '/private/nosotros.html')
});

app.get('/frutas', (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + '/frutas.json')
})

const users = [
  {id: 1, name: 'user 1'},
  {id: 2, name: 'user 2'},
  {id: 3, name: 'user 3'},
]

app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  const user = users.find((user) => user.id == req.params.id )
  console.log(user);
  res.send(user)
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})