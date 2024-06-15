class Sistema{
    constructor(){
        this.productos = [];
        this.administradores = [];
        this.clientes = [];
        this.compras = [];

    }

precargarDatos(){
        this.nuevoUsuarioAdministrador("Lucas", "Sosamu");
        this.nuevoUsuarioAdministrador("agudelateja", "agustin1");
        this.nuevoUsuarioAdministrador("roberto", "robertito");
        this.nuevoCliente("Lucas", "Sosa", "big smoke", "Luk5as","4539-3715-6707-0872" ,"777");
        this.nuevoProductoOferta("Pelota", 200, "Pelota de Futbol", "img/pelota.jpg", 20);
        this.nuevoProductoOferta("Botella", 400, "Botella para agua", "img/botella.jpg", 10);
        this.nuevoProducto("Bicicleta",700,"Bici", "img/bici.jpg", 4);
        this.nuevoProducto("Bicicleta",700,"Bici", "img/bici.jpg", 4);
        this.nuevoProductoInactivo("Botella", 400, "Botella para agua", "img/botella.jpg", 10);
        this.nuevoProductoInactivo("Pelota", 200, "Pelota de Futbol", "img/pelota.jpg", 20);
        this.nuevaCompraAprobadaTest(4,this.productos[0],this.clientes[0]);
        this.nuevaCompraAprobadaTest(6,this.productos[1],this.clientes[0]);
        this.nuevaCompraPendienteTest(5,this.productos[2],this.clientes[0]);
        this.nuevaCompraPendienteTest(2,this.productos[3],this.clientes[0]);
        this.nuevaCompraCanceladaTest(2,this.productos[0],this.clientes[0]);
        
    }

    nuevoCliente(nombre, apellido, user, password, tarjeta, cvc){
        let unCliente = new Cliente(nombre, apellido, user, password, tarjeta, cvc);
        this.clientes.push(unCliente);
    }

login(user, password){
        user = user.toLowerCase();
        let miUsuario = this.buscarObjetoPor2Parametros(this.administradores, "user", "password", user, password);
        if(miUsuario == null){
            miUsuario = this.buscarObjetoPor2Parametros(this.clientes, "user", "password", user, password);
            return miUsuario;
        }
        else{
            return miUsuario;
    }
 }

nuevoUsuarioAdministrador(user, password){  
    if(password.length >= 5){
    user = user.toLowerCase();
    let administrador = new Administradores(user,password);
    this.administradores.push(administrador);
    }
 }

 registroCliente(nombre, apellido, user, password, tarjeta, cvc) {
    user = user.toLowerCase(); 

    
    let buscarCliente = this.buscarObjetoPor1Parametro(this.clientes, "user", user);
    let buscarAdministrador = this.buscarObjetoPor1Parametro(this.administradores, "user", user);
    
    if (buscarCliente != null || buscarAdministrador != null) {
        return null; 
    } else {
        let cliente = new Cliente(nombre, apellido, user, password, tarjeta, cvc);
        this.clientes.push(cliente);
        return true;
    }
}


buscarObjetoPor1Parametro(lista, parametro, valor) {
    for(let i = 0; i < lista.length; i++) {
        let unObjeto = lista[i];
        if(unObjeto[parametro] == valor) {
            return unObjeto;
        }
    }
    return null;
}

buscarObjetoPor2Parametros(lista, parametro1, parametro2, valor1, valor2) {
    for(let i = 0; i < lista.length; i++) {
        let unObjeto = lista[i];
        if(unObjeto[parametro1] == valor1 && unObjeto[parametro2] == valor2) {
            return unObjeto;
        }
    }
    return null;
}

crearProducto(nombreProducto,precioProducto,descripcion,imagen,stock){
    if(nombreProducto.length >0 && descripcion.length> 0 && imagen.length> 0){
        if(!isNaN(precioProducto) && !isNaN(stock)){
            let producto = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock); 
            this.productos.push(producto);
            return true;
        }else{
            return null;
    }
    }else{
     return null;
    }

}

nuevoProductoOferta(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    nuevoProd.oferta = true;
    this.productos.push(nuevoProd);
}

nuevoProducto(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    this.productos.push(nuevoProd);
}

nuevoProductoInactivo(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    nuevoProd.estado = "pausado";
    this.productos.push(nuevoProd);
}

realizarModificacion(modProd,pStock,pEstado,pOferta){
let prod = this.buscarObjetoPor1Parametro(this.productos, "id", modProd);
prod.stock = pStock;
prod.estado = pEstado;
if (prod.stock == 0 && prod.estado == "activo") {
    prod.estado = "pausado";
}
prod.oferta == pOferta.toLowerCase();
if(pOferta === "false"){
    prod.oferta = false;
}else{
    prod.oferta = true;
}
return prod;
}
nuevaCompra(idProducto,cantidad,usuarioLogueado){
let miProducto = this.buscarObjetoPor1Parametro(this.productos, "id", idProducto);
let nuevaCompra = new Compra(cantidad,miProducto,usuarioLogueado);
this.compras.push(nuevaCompra);
usuarioLogueado.misCompras.push(nuevaCompra);
}

nuevaCompraPendienteTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Pendiente";
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

nuevaCompraCanceladaTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Cancelada";
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

nuevaCompraAprobadaTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Aprobada";
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

cancelCompra(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id", idCompra);
miCompra.estado = "Cancelada";
}

cancelarCompraAdmin(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id" ,idCompra);
miCompra.estado = "Cancelada";
}

aprobarCompraAdmin(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id" ,idCompra);
miCompra.estado = "Aprobada";
miCompra.producto.stock = miCompra.producto.stock - miCompra.cantidad;
miCompra.cliente.saldo = miCompra.cliente.saldo - miCompra.precioCompra;

if (miCompra.cliente.saldo <= 0) {
    miCompra.cliente.saldo = 0;
}

if(miCompra.producto.stock <= 0){
    miCompra.producto.estado = "pausado";
}
}

}


class Administradores{
    constructor(user, password){
        this.tipo = "Admin";
        this.user = user;
        this.password = password;
    }

}

let idCliente = 0;
class Cliente{
  constructor(nombre,apellido,user,password,tarjeta,cvc){
    this.tipo = "Cliente";
    this.nombre = nombre;
    this.apellido = apellido;
    this.user = user;
    this.password = password;
    this.tarjeta = tarjeta;
    this.cvc = cvc;
    this.saldo = 3000;
    this.id = ++idCliente;
    this.misCompras = [];
  }
}

let idProducto = 0;
class Producto{
    constructor(nombre,precio,descripcion,imagen,stock){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.stock = stock;
        this.estado = "activo";
        this.oferta = false;
        this.id = `PROD_ID_${++idProducto}`;
    
    }
    evaluarStock(){
        if(this.stock == 0){
            this.estado = "pausado";
        }
    }
}
let idCompra =0;
class Compra{
    constructor(cantidad,producto,cliente){
        this.producto = producto;
        this.cliente = cliente;
        this.cantidad = cantidad;
        this.estado = "Pendiente"; 
        this.precioCompra = this.producto.precio * this.cantidad;
        this.id= ++idCompra;
    }
    calcularCosto(){
        this.precioCompra = this.producto.precio * this.cantidad;
    }
}