// TODO ----- Objetos del menu general -----
// llamada ajax con jquery para obtener los objetos desde un archivo local .json
$.ajax({
  // url indica la ruta del archivo json
  url:"./data/menuGeneral.json",
  // datatype es el tipo de dato
  dataType:"json",
  // success recibe y ejecuta una funcion, asigno otra funcion dentro de la anterior y ambas reciben parametro
  success:(respuesta)=>{
      cargarMenu(respuesta);
  },
});
// TODO ----- Fin objetos del menu general -----

// TODO ----- Estructura dinamica HTML (DOM) -----

// Array vacio que recibe los objetos del archivo json traidos por llamada ajax
let menuGeneral= [];

// Esta dentro de success, envia la data json al array anterior y renderiza los objetos al DOM
function cargarMenu (respuesta){
  // defino el parametro respuesta de las funciones
  menuGeneral=respuesta;
  // iteracion del array menu general 
  menuGeneral.forEach ((objeto,indice) => {
      // condicional else if para que los productos que sean de la misma categoria se renderizen en divs diferentes
      if(menuGeneral[indice].categoria==="Entrada"){ // renderizacion con uso de selector y metodo (append) de jquery //
          $("#contEntradas").append(
              `<div class="menuList">
                  <div>  <h4 id="titulop${indice}" class="tituloProducto">${objeto.producto}</h4>  </div>
                  <div>  <p id="preciop${indice}" class="precioProducto">$${objeto.precio}</p>  </div>
                  <div>  <button id="buttonp${indice}" class="botonProducto" type="button" onclick="agregarMenu(${indice})"> + </button>  </div>
              </div>`);
      }else if(menuGeneral[indice].categoria==="Principal"){
          $("#contPrincipal").append(
              `<div class="menuList">
                  <div>  <h4 id="titulop${indice}" class="tituloProducto">${objeto.producto}</h4>  </div>
                  <div>  <p id="preciop${indice}" class="precioProducto">$${objeto.precio}</p>  </div>
                  <div>  <button id="buttonp${indice}" class="botonProducto" type="button" onclick="agregarMenu(${indice})"> + </button>  </div>
              </div>`);
      }else if(menuGeneral[indice].categoria==="Postre"){
          $("#contPostre").append(
              `<div class="menuList">
                  <div>  <h4 id="titulop${indice}" class="tituloProducto">${objeto.producto}</h4>  </div>
                  <div>  <p id="preciop${indice}" class="precioProducto">$${objeto.precio}</p>  </div>
                  <div>  <button id="buttonp${indice}" class="botonProducto" type="button" onclick="agregarMenu(${indice})"> + </button>  </div>
              </div>`);
      }else if(menuGeneral[indice].categoria==="Bebida"){
          $("#contBebida").append(
              `<div class="menuList">
                  <div>  <h4 id="titulop${indice}" class="tituloProducto">${objeto.producto}</h4>  </div>
                  <div>  <p id="preciop${indice}" class="precioProducto">$${objeto.precio}</p>  </div>
                  <div>  <button id="buttonp${indice}" class="botonProducto" type="button" onclick="agregarMenu(${indice})"> + </button>  </div>
              </div>`);
      }else {
          alert ("error en la carga del menu")
      }
      // agrego atributo id a cada indice de menu general
      menuGeneral[indice].id=indice;
      // animacion concatenada con jquery (fadeout y fadein)
      $(`button#buttonp${indice}`).click(()=>{
          $(`h4#titulop${indice}, p#preciop${indice}`).fadeOut(500,()=>{
              $(` h4#titulop${indice}, p#preciop${indice}`).fadeIn(500);})
      });
  });
}
// TODO ----- Fin de estructura dinamica HTML(DOM) -----

// TODO ----- Estructura y funciones de los eventos principales-----

// Array vacio que recibe los objetos seleccionados por evento agregarMenu
const cartMenu=[];

// Funcion del evento onclick(agregarMenu) para seleccionar productos e incorporarlos a un array vacio con el cual despues modificamos el dom
function agregarMenu (indiceMenu){
  // uso de metodo de array .findIndex busca el indice del objeto que esta en un array
  const indiceEncontrado= cartMenu.findIndex((elemento)=>{
      return elemento.id === menuGeneral[indiceMenu].id
  });
  // la condicion se cumple debido a que el metodo findIndex no encuentra ningun objeto, da por resultado -1
  if (indiceEncontrado === -1){
      // defino constante con valor igual al indice del objeto dentro del array
      const productoAgregado = menuGeneral[indiceMenu];
      // agrego un nuevo atributo a mi objeto
      productoAgregado.cantidad=1;
      // pusheo el valor de la constante al array vacio
      cartMenu.push(productoAgregado); console.log(productoAgregado);
      actualizarMenu();
  // Si la condicion anterior no se cumple y por lo tanto, encuentra un elemento, aumentamos solo el valor del atributo cantidad
  }else {
      cartMenu[indiceEncontrado].cantidad +=1;
      actualizarMenu();
  }  
}

// selecciono div que contendra al producto elegido por el usuario
let containerMenu= document.querySelector("#boxMenu");

// funcion dentro del evento agregarMenu para renderizar y actualizar en el dom los objetos pusheados al array vacio cartMenu
function actualizarMenu(){
  // defino variable total con valor igual a cero, para despues modificar su valor
  let totalEleccion=0;
  containerMenu.className="menuFinal";
  containerMenu.innerHTML=``;
  // condicional en el cual si se cumple la condicion, modifica el dom
  if (cartMenu.length>0) {
    //  renderiza productos seleccionados por el usuario al dom, los suma y los multiplica por la cantidad elegida con un for each para iterar sobre cada valor del array 
    cartMenu.forEach((elemento,indice)=>{
      const menuCont= document.createElement("div");
      menuCont.classList= "menuSeleccionado";
      menuCont.innerHTML=`
        <div class="product-details">${elemento.producto}</div>
        <div class="product-details" > Cantidad: ${elemento.cantidad}</div>
        <div class="product-details"> Precio: $ ${elemento.precio}</div>
        <div class="product-subtotal"> Subtotal: $ ${elemento.precio * elemento.cantidad}</div>
        <button class="botonProducto" onclick="eliminarProducto(${indice})">Eliminar</button>`;
      containerMenu.appendChild(menuCont);

      // modificamos la variable dentro del foreach para que por cada objeto que se agrega al array se actualice
      totalEleccion=totalEleccion + elemento.precio * elemento.cantidad;
    })
    // Atrapo el id en variable y creo un div con el total de todo, lo hago fuera del foreach para que se actualize sin repetirse debajo de todos los productos elegidos
    const totalMenu=document.createElement("div")
    totalMenu.id="totalMenu"
    totalMenu.innerHTML=`
        <p id= "totalmenuText" class="totalMenuStyle"> TOTAL </p>
        <p id="totalmenuValue" class="totalMenuStyle">$${totalEleccion}</p>
        <button id="finalizarPedido" onClick="finalizarPedido()"> FINALIZAR PEDIDO </button>`;
    containerMenu.appendChild(totalMenu)
  } else {
    containerMenu.classList.remove("menuFinal");
  }   
}
// funcion del evento onclick eliminarProducto, elimina el objeto del array
function eliminarProducto (indice){
  cartMenu.splice(indice, 1);
  // tiene dentro funcion actualizarMenu para renderizar los cambios
  actualizarMenu();
}
// funcion del evento onclick finalizarPedido 
function finalizarPedido() {
  const totalPedido = document.getElementById("totalmenuValue").innerHTML;
  containerMenu.innerHTML = "";
  const pedidoFinalizado = `
      <div class="menuSeleccionado">
      <p> YA CASI FINALIZAMOS EL PROCESO DE PEDIDO! LE RECORDAMOS QUE EL TOTAL ES DE ${totalPedido} PESOS </p></div>
      <div class="datosReserva">
          <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la reserva</p>
          <button class="botonProducto" onClick="formularioReserva()"> FORMULARIO </button>
      </div>`;
  containerMenu.innerHTML = pedidoFinalizado;
};
// funcion dentro del evento onclick formularioReserva
function formularioReserva() {
  containerMenu.innerHTML = "";
  const formulario = `
  <div class="container-fluid">
    <h3> DATOS PARA LA RESERVA </h3>
    <div class="row justify-content-center">
      <div class="col-sm-4 col-md-4 col-xl-4">
        <div class="dataFormulario">
          <label>Nombre</label>
          <input type="text" id="nombre" placeholder="Nombre"  />
        </div>
        <div class="dataFormulario">
          <label>E-mail</label>
          <input type="text" id="mail" placeholder="E-mail" />
        </div>
        <div class="dataFormulario">
          <label>Telefono</label>
          <input type="text" id="telefono" placeholder="Telefono"  />
        </div>
        <div class="dataFormulario">
          <label>Domicilio</label>
          <input type="text" id="domicilio" placeholder="Domicilio" />
        </div>
        <div class="botonFormulario">
          <button type="button" class="botonProducto" onClick="pedidoFinalizado()" >Confirmar</button>
        </div>
      </div>
    </div>
  </div>`;
  containerMenu.innerHTML = formulario;
};
function pedidoFinalizado () {
  const nombreCliente = document.getElementById("nombre").value;
  const mailCliente = document.getElementById("mail").value;
  const telefonoCliente=document.getElementById("telefono").value;
  containerMenu.innerHTML = "";
  let mensaje = `<div class="mensaje-final dataFormulario">
  <p>Gracias ${nombreCliente}, su pedido fue realizado con exito!</p>
  <p>Le informamos que en las proximas horas nos pondremos en contacto con usted a traves de su telefono n° ${telefonoCliente} para coordinar la fecha y hora de su reserva!</p>
  <p>Luego enviaremos a su e-mail ${mailCliente} la confirmacion de la reserva!</p>
  <p>Muchas gracias por utilizar nuestro sistema de pedidos online!</p></div>`;
  containerMenu.innerHTML = mensaje;
};