const contenedorTarjetas = document.getElementById('productos-container');
const unidadesElement = document.getElementById('unidades');
const precioElement = document.getElementById('precio');
const reiniciarCarritoElement = document.getElementById('reiniciar');
const comprarElement = document.getElementById('compra');

function crearTarjetasProductosInicio() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem('paletas'));
    console.log(productos);
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevaPaleta = document.createElement('div');
            nuevaPaleta.classList = "tarjeta-producto";
            nuevaPaleta.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <div class="botones">
                    <button class="boton-cart">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="boton-cart">+</button>
                </div>
            `;
            contenedorTarjetas.appendChild(nuevaPaleta);
            nuevaPaleta
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                    cuentaElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
            nuevaPaleta
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    restarAlCarrito(producto);
                    crearTarjetasProductosInicio();
                    actualizarTotales();
                });
        });
    }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem('paletas'));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    } else  {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El carrito se encuentra vacío!",
            footer: '<a href="./index.html">Presione AQUI para volver al inicio y agregar productos</a>'
        });
    }
}

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
comprarElement.addEventListener("click", mostrarComprados); 
function mostrarComprados() {
    const productos = JSON.parse(localStorage.getItem('paletas'));
    if (productos && productos.length > 0) {
        let listaProductos = "Productos comprados:\n";
        productos.forEach(producto => {
            if (producto.cantidad > 0) {
                listaProductos += `${producto.nombre} - Cantidad: ${producto.cantidad}\n`;
            }
        });
        Swal.fire({
            title: "¿Desea finalizar su compra?",

            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, deseo comprar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Muchas gracias!",
                    text: "Su compra finalizo correctamente.",
                    icon: "success"
                });
                if (result.isConfirmed) {
                    localStorage.removeItem("paletas");
                    crearTarjetasProductosInicio();
                }
            }
        });
    }
}



function reiniciarCarrito() {
    localStorage.removeItem("paletas");
    actualizarTotales();
    crearTarjetasProductosInicio();
}

function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    console.log(memoria);
    let cuenta = 0;
    if (!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("paletas", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indiceProducto = memoria.findIndex(paleta => paleta.id === producto.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta = nuevaMemoria[indiceProducto].cantidad
        }
        localStorage.setItem("paletas", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    const indiceProducto = memoria.findIndex(paleta => paleta.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("paletas", JSON.stringify(memoria));
    actualizarNumeroCarrito();
}

function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
        
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}

actualizarNumeroCarrito();
