server = require("./server")
HomeProducto = require("./src/productoHome")
HomeCliente = require("./src/clienteHome")
Producto = require("./src/producto")
Cliente = require("./src/cliente")
mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")


mongoConnection.connect( (db) => {
    productoHome = new Home("productos", db)
    clienteHome = new Home("clientes", db)   
    // var miProducto = new Producto("Papas Fritas", 30)
    // productoHome.insert(miProducto) 
    server.register(productoHome)
    server.register(clienteHome)
    server.init();
})

// var myHomeCliente = new HomeCliente()
// var daniel = new Cliente("Daniel Rodriguez", "Guido Lucotti 3453")
// myHomeCliente.insert(daniel)