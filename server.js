express = require("express");
bodyParser = require("body-parser");

function saludar(quien){
  return `Hola ${quien}, ¿cómo estás hoy?`
}

function init(homeProducto, homeCliente) {
  var server = express();
  server.use(bodyParser.json());

  server.get("/saludar", (req, res) => {
    res.send(saludar("mundo"));
  })

  server.get("/saludar/:nombre", (req, res) => {
    res.send(saludar(req.params.nombre));
  })

  server.get("/productos", (req, res) => {
    res.send(homeProducto.all());
  })

  server.get("/productos/:id", (req, res) => {
    res.send(homeProducto.get(req.params.id));
  })

  server.post("/producto", (req, res) => {
    homeProducto.insert(req.body);
    res.send(201).send();
  })
  server.post("/cliente", (req, res) =>{
    homeCliente.insert(req.body);
    res.send(201).send();
  })

  server.put("/producto", (req, res) => {
    homeProducto.update(req.body);
    res.send(201).send();
  })

  server.delete("/producto/:id", (req, res) => {
    homeProducto.delete(req.params.id);
    res.send(201).send();
  })

  server.get("/clientes", (req, res) => {
    res.send(homeCliente.all());
  })


  server.delete("/cliente/:id", (req, res) =>{
    homeCliente.delete(req.params.id)
    res.send(201)
  })

  server.put("/cliente", (req, res) => {
    homeCliente.update(req.body)
    res.send(201)
  })


  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
