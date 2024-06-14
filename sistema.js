class Sistema{
    constructor(){
        this.productos = [];
        this.administradores = [];
        this.clientes = [];

    }

precargarDatos(){
        this.nuevoUsuarioAdministrador("Lucas", "Sosamu");
        this.nuevoUsuarioAdministrador("agudelateja", "agustin1");
        this.nuevoUsuarioAdministrador("roberto", "robertito");
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
  }
}

let idProducto = 0;
class Producto{
    constructor(nombre,descripcion,imagen,stock){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.stock = stock;
        this.estado = "Activo";
        this.oferta = false;
        this.id = ++idProducto;

    }
}

class Compra{
    constructor(producto){
        this.producto = producto;
         this.estado = "Pendiente"; 
    }
}