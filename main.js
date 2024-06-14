document.querySelector("#btnIngreso").addEventListener("click", login);
document.querySelector("#btnRegistro").addEventListener("click", registro);
document.querySelector("#btnIrRegistro").addEventListener("click", mostrarRegistro);
document.querySelector("#btnIrlogin").addEventListener("click", mostrarLogin);




/*-----------------Funcion LOGIN---------------*/
let miSistema = new Sistema();
miSistema.precargarDatos();
let usuarioLogueado;

function login(){
    let user = document.querySelector("#loginUser").value;
    let password = document.querySelector("#loginPassword").value;
    let parrafo = document.querySelector("#pIngreso");
    if(password.length >= 5) {
        let busquedaUsuario = miSistema.login(user, password);
        if (busquedaUsuario == null) {
            parrafo.innerHTML = "Usuario o Contrasenia es incorrecta";
        }else if(busquedaUsuario.tipo == "Admin"){
                usuarioLogueado = busquedaUsuario;
                cambiarPantalla("#crearProducto");
        }else if (busquedaUsuario.tipo == "Cliente"){
            usuarioLogueado = busquedaUsuario;
                cambiarPantalla("#listaProductos");
        }
    }else{
        parrafo.innerHTML = "La contraseña debe tener al menos 5 caracteres";
    }
}
/*----------------FUNCION REGISTRO---------------------*/
function registro(){
let nombre = document.querySelector("#registroNombre").value;
let apellido = document.querySelector("#registroApellido").value;
let user = document.querySelector("#registroUsuario").value;
let password = document.querySelector("#registroPassword").value;
let tarjeta = document.querySelector("#tarjeta").value;
let tarjetaVerificada = verificarFormatoTarjeta(tarjeta);
let cvc = document.querySelector("#cvc").value;
let parrafo = document.querySelector("#pRegistro");
if(verificarPassword(password) == true){
   if(verificarTarjeta(tarjetaVerificada) == true){
       if(verificarCvc(cvc) == true){
        let busquedaCliente = miSistema.registroCliente(nombre,apellido,user,password,tarjeta,cvc);
        if(busquedaCliente == null){
           parrafo.innerHTML = "Registro invalido";
        }else{
           parrafo.innerHTML = `Registro Valido. Bienvenido ${nombre}`;
        }
       }else{
        parrafo.innerHTML = "CVC invalido";
       }
   }else{
    parrafo.innerHTML = "Tarjeta Invalida";
   }
}else{
    parrafo.innerHTML = "Contrasenia invalida";
}

}


/*----------------Pantallas----------------------------*/
function cambiarPantalla(activa){
    let pantallas = document.querySelectorAll(".ventana");
    for(i = 0; i<pantallas.length;i++){
    let unaPantalla = pantallas[i];
    unaPantalla.style.display = "none";
    }
    document.querySelector(activa).style.display = "flex";
}

cambiarPantalla("#ingreso");

function mostrarRegistro(){
    cambiarPantalla("#registro");
}

function mostrarLogin(){
    cambiarPantalla("#ingreso");
}


/*------FUNCION PARA VALIDAR PASSWORD-----*/
function verificarPassword(password){
let resultado = "";
let mayus = false;
let minuscula = false;
let unNumero = false;
if(password.length >= 5){
    let i=0;
    while(i<password.length && mayus == false){
        if(password[i] == password[i].toUpperCase()){
            mayus = true;
        }
        i++;
    }
    if(mayus == true){
        let j=0;
        while(j<password.length && minuscula == false){
            if(password[j] == password[j].toLowerCase()){
                minuscula = true;
            }
            j++;
        }
    if(minuscula ==true){
        let k = 0;
        while(k<password.length && unNumero == false){
            let letraNumerica = parseInt(password[k]);
           if(!isNaN(letraNumerica)){
             unNumero = true;
           }
       k++; 
    }
    if(unNumero==true && minuscula && mayus == true){
       resultado = true;
       return resultado;
    }else{
        resultado = "Debe contener al menos un numero";
    } 
    }else{
        resultado = "Debe contener al menos una minuscula";
    }
    }else{
       resultado = "Debe contener al menos una mayuscula";
    }
   
}else{
    resultado = "El largo de la contraseña debe ser mayor a 5 caracteres";
}   
   
}

/*------FUNCION PARA VALIDAR CVC-----*/

function verificarCvc(cvc){

let resultado = false;
    if(!isNaN(cvc) && cvc.length == 3){
        resultado = true;
        return resultado;
    }

}

/*------FUNCION PARA EL FORMATO NUMERICO DE LA TARJETA DE CREDITO-----*/

function verificarFormatoTarjeta(tarjeta){
let formato = false;
let resultado = "";
    if (tarjeta[4] == "-" && tarjeta[9] == "-" &&tarjeta[14] == "-") {   
       formato = true;
    }else{
      resultado = "Formato tarjeta invalido";
      return resultado;
    }
    if(formato == true){
        for (let i = 0; i < tarjeta.length; i++) {
        
            if (tarjeta[i] != "-") {

                resultado += tarjeta[i];
                
            }

        }
        return resultado;
    }
}











/*------FUNCION PARA VALIDAR NUMERO DE TARJETA DE CREDITO-----*/

function verificarTarjeta(tarjetaVerificada){
  let resultado = false;
  let acumulador = 0;
  let digitoVerificar = tarjetaVerificada[tarjetaVerificada.length -1];
  

  for(let i=0; i < tarjetaVerificada.length -1;i++){
      if(i % 2 === 0){
          let duplicado = Number(tarjetaVerificada[i] * 2);
          if(duplicado >=10){
               let duplicadoStr = String(duplicado);
               let resultado = Number(duplicadoStr[0]) + Number(duplicadoStr[1]);
               acumulador += resultado;
          }else{
            acumulador += duplicado;
          }
      }else{
        acumulador += Number(tarjetaVerificada[i]);
      }
  }
  
  let verificadorMultiplicado = acumulador * 9;
  let verificadorMultString = String(verificadorMultiplicado);
  let verificadorReal = verificadorMultString[verificadorMultString.length-1];
  if(verificadorReal == digitoVerificar){
     resultado = true;
  }
  return resultado;
  }


  