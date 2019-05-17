server = require("./server")
HomeProducto = require("./src/productoHome")
HomeCliente = require("./src/clienteHome")
Producto = require("./src/producto")
Cliente = require("./src/cliente")


var myHome = new HomeProducto()
var miProducto = new Producto("Papas Fritas", 30)
myHome.insert(miProducto)

var myHomeCliente = new HomeCliente()
var daniel = new Cliente("Daniel Rodriguez", "Guido Lucotti 3453")
myHomeCliente.insert(daniel)

server.init(myHome, myHomeCliente)