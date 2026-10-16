const buscador = document.querySelector(".buscador");
const productos = document.querySelectorAll(".cuadros article");
const mensaje = document.querySelector("#mensaje-no-encontrado");

mensaje.style.display = "none";

buscador.addEventListener("input", function() {

    let texto = buscador.value.toLowerCase();
    let encontrado = false;

    productos.forEach(function(producto) {

        let nombre = producto.querySelector("h3").textContent.toLowerCase();

        if (nombre.includes(texto)) {
            producto.style.display = "block";
            encontrado = true;
        } else {
            producto.style.display = "none";
        }

    });

    if (encontrado) {
        mensaje.style.display = "none";
    } else {
        mensaje.style.display = "block";
    }

});


