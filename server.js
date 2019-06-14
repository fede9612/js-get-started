express = require("express");
bodyParser = require("body-parser");
var events = require("events");

var eventEmitter = new events.EventEmitter();


function register(home) {
  console.log(`registering handlers for ${home.type}`)
  
  eventEmitter.on(`find-${home.type}`, 
              (response)=>
                home.all( 
                  ( result) => {
                    response.json(result)
                    response.end()
                  }
              )    
  )

  eventEmitter.on(`get-${home.type}`, 
              (id, response)=> {
              console.log("respondiendo evento, llamando a la home")
                home.get(id, 
                  ( result ) => {
                    response.json(result)
                    response.end()
                  }
              )}
  )    

   
  eventEmitter.on(`update-${home.type}`, (object)=> home.update(object))
  eventEmitter.on(`insert-${home.type}`, (object)=> home.insert(object))
  eventEmitter.on(`delete-${home.type}`, (id)=> home.delete(id))
}

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
  cargarEntidadesEnMap(homeProducto, homeCliente)
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

  server.get("/:entidad/:id", (req, res) => {
    eventEmitter.emit(`get-${req.params.entidad}`, res, req.params.id);
  })

  server.get("/:entidad", (req, res) => {
    //corregir el has
    // condicion = !entidades.has(req.params.entidad)
    // if(condicion){
    //   res.send("<h1>Error 404<h1/>")
    // }else{
      eventEmitter.emit(`find-${req.params.entidad}`, res);
   
  })

  server.post("/:entidad", (req, res) => {  
    eventEmitter.emit(`insert-${req.params.entidad}`, req.body);
    res.status(204).end(); 
  })

  server.put("/:entidad", (req, res) => {
    eventEmitter.emit(`update-${req.params.entidad}`, req.body);
    res.status(204).end(); 
  })

  server.delete("/:entidad/:id", (req, res) => {
    eventEmitter.emit(`delete-${req.params.entidad}`, req.params.id);
    res.status(204).end(); 
  })

  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
exports.register = register;
