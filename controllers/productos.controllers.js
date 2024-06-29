const db = require("../db/db")

const index = (req, res) => {
  const sql = "SELECT * FROM catalogo";
  db.query(sql, (error, rows) => {
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const {id} = req.params;

  const sql = "SELECT * FROM catalogo WHERE CodigoArticulo = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }

    if(rows.length == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    res.json(rows[0]);
  });
}

const store = (req, res) => {
  const {CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria} = req.body;

  const sql = "INSERT INTO catalogo (CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria], (error, result) => {
    // console.log(result);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }

    const producto = {...req.body, id: result.insertId}

    res.status(201).json(producto);
  });
}

const update = (req, res) => {
  const {id} = req.params;
  const {CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria} = req.body;

  const sql = "UPDATE catalogo SET CodigoArticulo = ?, Descripcion = ?, Medida = ?, Color = ?, Madera = ?, Categoria = ? WHERE CodigoArticulo = ?"
  db.query(sql, [CodigoArticulo, Descripcion, Medida, Color, Madera, Categoria, id], (error, result) => {
    console.log(result);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }
    if(result.affectedRows == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    const producto = {...req.body, ...res.params}

    res.json(producto);
  });
}

const destroy = (req, res) => {
  const {id} = req.params;

  const sql = "DELETE FROM catalogo WHERE CodigoArticulo = ?";
  db.query(sql, [id], (error, result) => {
    // console.log(result);
    if (error){
      return res.status(500).json({error: 'intente mas tarde'})
    }

    if(result.affectedRows == 0) {
      return res.status(404).send({error: 'No existe el producto'})
    }

    res.json({mensaje: 'Producto eliminado'});
  });
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy
};