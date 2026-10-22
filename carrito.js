
const botones = document.querySelectorAll(".btn-carrito");
const productosCarrito = document.querySelector("#productos-carrito");
const total = document.querySelector("#total");
const carritoElemento = document.querySelector("#carrito");

// CARGAR EL CARRITO GUARDADO
let carrito = JSON.parse(
    localStorage.getItem("carritoCuidaCompu")
) || [];

// CARGAR EL HISTORIAL DE FACTURAS
let historialFacturas = JSON.parse(
    localStorage.getItem("historialFacturasCuidaCompu")
) || [];

const botonFactura = document.querySelector("#btn-factura");
const panelFactura = document.querySelector("#factura");
const listaFacturas = document.querySelector("#lista-facturas");

// GUARDAR EL CARRITO
function guardarCarrito() {
    localStorage.setItem(
        "carritoCuidaCompu",
        JSON.stringify(carrito)
    );
}

// GUARDAR EL HISTORIAL
function guardarHistorial() {
    localStorage.setItem(
        "historialFacturasCuidaCompu",
        JSON.stringify(historialFacturas)
    );
}

// MOSTRAR LOS PRODUCTOS DEL CARRITO
function mostrarCarrito() {
    productosCarrito.innerHTML = "";
    let suma = 0;

    carrito.forEach(function(producto) {
        const elemento = document.createElement("p");

        elemento.textContent =
            producto.nombre + " - $" + producto.precio.toFixed(2);

        productosCarrito.appendChild(elemento);
        suma += producto.precio;
    });

    total.textContent = suma.toFixed(2);
}

// AGREGAR PRODUCTOS AL CARRITO
botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const producto = boton.parentElement;
        const nombre = producto.querySelector("h3").textContent;
        const precioTexto = producto.querySelector("h4").textContent;
        const precio = parseFloat(precioTexto.replace("$", "").trim());

        carrito.push({
            nombre: nombre,
            precio: precio
        });

        guardarCarrito();
        mostrarCarrito();

        carritoElemento.style.display = "block";
    });
});

// VACIAR EL CARRITO
const botonVaciar = document.querySelector("#vaciar-carrito");

botonVaciar.addEventListener("click", function() {
    carrito = [];

    guardarCarrito();
    mostrarCarrito();

    carritoElemento.style.display = "none";
});

// ABRIR Y CERRAR EL CARRITO
const abrirCarrito = document.querySelector("#abrir-carrito");

abrirCarrito.addEventListener("click", function() {
    carritoElemento.classList.toggle("expandido");
});

// BOTÓN PAGAR
const botonPagar = document.querySelector("#pagar-carrito");

botonPagar.addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    carritoElemento.style.display = "none";
    document.querySelector("#seccion-login").style.display = "flex";
});

// CONTINUAR AL PAGO
const continuarPago = document.querySelector("#continuar-pago");

continuarPago.addEventListener("click", function() {
    const correo = document.querySelector("#correo").value.trim();
    const contrasena = document.querySelector("#contrasena").value;

    if (correo === "" || contrasena === "") {
        alert("Completa el correo y la contraseña.");
        return;
    }

    document.querySelector("#seccion-login").style.display = "none";
    document.querySelector("#seccion-pago").style.display = "flex";
});

// CONFIRMAR PAGO Y GUARDAR FACTURA
const confirmarPago = document.querySelector("#confirmar-pago");

confirmarPago.addEventListener("click", function() {
    const nombre = document.querySelector("#nombre-titular").value.trim();
    const tarjeta = document.querySelector("#numero-tarjeta").value.trim();
    const vencimiento = document.querySelector("#vencimiento").value.trim();
    const cvv = document.querySelector("#cvv").value.trim();
    const direccion = document.querySelector("#direccion").value.trim();
    const ciudad = document.querySelector("#ciudad").value.trim();

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

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Guardar la factura antes de vaciar el carrito
    guardarYMostrarFactura(nombre, carrito);

    // Mostrar la confirmación de compra
    document.querySelector("#seccion-pago").style.display = "none";
    document.querySelector("#seccion-confirmado").style.display = "flex";
});

// VOLVER AL CATÁLOGO
const volverInicio = document.querySelector("#volver-inicio");

volverInicio.addEventListener("click", function() {
    carrito = [];

    guardarCarrito();
    mostrarCarrito();

    window.location.href = "inter.html";
});

// MOSTRAR EL CARRITO GUARDADO
mostrarCarrito();

if (carrito.length > 0) {
    carritoElemento.style.display = "block";
}

// MOSTRAR U OCULTAR EL BOTÓN DE FACTURAS
botonFactura.style.display =
    historialFacturas.length > 0 ? "block" : "none";

// MOSTRAR LOS DETALLES DE UNA FACTURA
function mostrarFactura(factura, indice) {
    document.querySelector("#detalle-factura").style.display = "block";

    document.querySelector("#titulo-factura").textContent =
        "Factura " + (indice + 1);

    document.querySelector("#cliente-factura").textContent =
        factura.cliente;

    document.querySelector("#fecha-factura").textContent =
        factura.fecha;

    const productos = document.querySelector("#productos-factura");
    productos.innerHTML = "";

    factura.productos.forEach(function(producto) {
        const linea = document.createElement("p");

        linea.textContent =
            producto.nombre + " - $" + producto.precio.toFixed(2);

        productos.appendChild(linea);
    });

    document.querySelector("#total-factura").textContent =
        factura.total.toFixed(2);
}

// MOSTRAR EL HISTORIAL DE FACTURAS
function mostrarHistorial() {
    listaFacturas.innerHTML = "";

    if (historialFacturas.length === 0) {
        listaFacturas.textContent = "Todavía no hay facturas pagadas.";
        return;
    }

    historialFacturas.forEach(function(factura, indice) {
        const boton = document.createElement("button");

        boton.textContent = "Factura " + (indice + 1);

        boton.addEventListener("click", function() {
            mostrarFactura(factura, indice);
        });

        listaFacturas.appendChild(boton);
    });
}

// GUARDAR UNA FACTURA DESPUÉS DE CONFIRMAR EL PAGO
function guardarYMostrarFactura(nombreCliente, productosPagados) {
    const nuevaFactura = {
        cliente: nombreCliente,
        fecha: new Date().toLocaleDateString("es-SV"),

        productos: productosPagados.map(function(producto) {
            return {
                nombre: producto.nombre,
                precio: producto.precio
            };
        }),

        total: productosPagados.reduce(function(suma, producto) {
            return suma + producto.precio;
        }, 0)
    };

    historialFacturas.push(nuevaFactura);

    guardarHistorial();

    // Mostrar el botón porque ya existe una factura
    botonFactura.style.display = "block";

    // Abrir el historial y mostrar la factura recién creada
    mostrarHistorial();
    mostrarFactura(nuevaFactura, historialFacturas.length - 1);

    panelFactura.style.display = "block";
}

// ABRIR EL HISTORIAL
botonFactura.addEventListener("click", function() {
    mostrarHistorial();

    document.querySelector("#detalle-factura").style.display = "none";
    panelFactura.style.display = "block";
});

// CERRAR EL HISTORIAL
document.querySelector("#cerrar-factura").addEventListener("click", function() {
    panelFactura.style.display = "none";
});

// VACIAR EL HISTORIAL
document.querySelector("#vaciar-historial").addEventListener("click", function() {
    if (confirm("¿Seguro que quieres borrar todas las facturas?")) {
        historialFacturas = [];

        guardarHistorial();
        mostrarHistorial();

        document.querySelector("#detalle-factura").style.display = "none";
        botonFactura.style.display = "none";
    }
});
