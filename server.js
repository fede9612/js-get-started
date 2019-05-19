express = require("express");
bodyParser = require("body-parser");

function saludar(quien){
  return `Hola ${quien}, ¿cómo estás hoy?`
}

function cargarEntidadesEnMap(homeProducto, homeCliente){
  var myMap = new Map();
  myMap.set("producto", homeProducto);
  myMap.set("cliente", homeCliente);
  myMap.set("productos", homeProducto);
  myMap.set("clientes", homeCliente);
  return myMap;
}


function init(homeProducto, homeCliente) {
  var server = express();
  var entidades = cargarEntidadesEnMap(homeProducto, homeCliente);
  server.use(bodyParser.json());
  

  server.get("/saludar", (req, res) => {
    res.send(saludar("mundo"));
  })

  server.get("/saludar/:nombre", (req, res) => {
    res.send(saludar(req.params.nombre));
  })

  server.get("/", (req, res) => {
    res.send(404).send();
  })

  server.get("/:entidad", (req, res) => {
    //corregir el has
    condicion = !entidades.has(req.params.entidad)
    if(condicion){
      res.send("<h1>Error 404<h1/>")
    }else{
      entidad = entidades.get(req.params.entidad)
      res.send(entidad.all());
    }
  })

  server.post("/:entidad", (req, res) => {  
    entidad = entidades.get(req.params.entidad)
    entidad.insert(req.body);
    res.send(201).send();
  })

  server.put("/:entidad", (req, res) => {
    entidad = entidades.get(req.params.entidad)
    entidad.update(req.body);
    res.send(201).send();
  })

  server.delete("/:entidad/:id", (req, res) => {
    entidad = entidades.get(req.params.entidad)
    entidad.delete(req.params.id);
    res.send(201).send();
  })

  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
