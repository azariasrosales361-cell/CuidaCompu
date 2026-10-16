const botones = document.querySelectorAll(".btn-carrito");
const productosCarrito = document.querySelector("#productos-carrito");
const total = document.querySelector("#total");
let carrito = [];


// AGREGAR PRODUCTOS AL CARRITO

botones.forEach(function(boton) {

    boton.addEventListener("click", function() {
        document.querySelector("#carrito").style.display = "block";
        let producto = boton.parentElement;
        let nombre = producto.querySelector("h3").textContent;
        let precioTexto = producto.querySelector("h4").textContent;
        let precio = parseFloat(precioTexto.replace("$", ""));
        carrito.push({
            nombre: nombre,
            precio: precio
        });
        mostrarCarrito();
    });

});


// MOSTRAR LOS PRODUCTOS DEL CARRITO

function mostrarCarrito() {

    productosCarrito.innerHTML = "";
    let suma = 0;
    carrito.forEach(function(producto) {
        let elemento = document.createElement("p");
        elemento.textContent = producto.nombre + " - $" + producto.precio.toFixed(2);
        productosCarrito.appendChild(elemento);
        suma = suma + producto.precio;
    });
    total.textContent = suma.toFixed(2);

}


// BOTÓN PARA VACIAR EL CARRITO

const botonVaciar = document.querySelector("#vaciar-carrito");

botonVaciar.addEventListener("click", function() {
    carrito = [];
    mostrarCarrito();
    document.querySelector("#carrito").style.display = "none";

});


// BOTÓN DE LA FLECHA

const abrirCarrito = document.querySelector("#abrir-carrito");
abrirCarrito.addEventListener("click", function() {
    document.querySelector("#carrito").classList.toggle("expandido");

});


// BOTÓN PAGAR

const botonPagar = document.querySelector("#pagar-carrito");
botonPagar.addEventListener("click", function() {
    document.querySelector("#carrito").style.display = "none";
    document.querySelector("#seccion-login").style.display = "flex";

});


// CONTINUAR AL PAGO

const continuarPago = document.querySelector("#continuar-pago");
continuarPago.addEventListener("click", function() {
    let correo = document.querySelector("#correo").value;
    let contrasena = document.querySelector("#contrasena").value;
    if (correo === "" || contrasena === "") {
        alert("Completa el correo y la contraseña.");
        return;

    }

    document.querySelector("#seccion-login").style.display = "none";
    document.querySelector("#seccion-pago").style.display = "flex";

});


// CONFIRMAR PAGO

const confirmarPago = document.querySelector("#confirmar-pago");
confirmarPago.addEventListener("click", function() {

    let nombre = document.querySelector("#nombre-titular").value;
    let tarjeta = document.querySelector("#numero-tarjeta").value;
    let vencimiento = document.querySelector("#vencimiento").value;
    let cvv = document.querySelector("#cvv").value;
    let direccion = document.querySelector("#direccion").value;
    let ciudad = document.querySelector("#ciudad").value;


    if (
        nombre === "" ||
        tarjeta === "" ||
        vencimiento === "" ||
        cvv === "" ||
        direccion === "" ||
        ciudad === ""
    ) {
        alert("Completa todos los datos de pago.");
        return;
    }

    document.querySelector("#seccion-pago").style.display = "none";
    document.querySelector("#seccion-confirmado").style.display = "flex";
});


// VOLVER AL CATÁLOGO

const volverInicio = document.querySelector("#volver-inicio");
volverInicio.addEventListener("click", function() {
    document.querySelector("#seccion-confirmado").style.display = "none";
    window.location.href = "inter.html";
});


