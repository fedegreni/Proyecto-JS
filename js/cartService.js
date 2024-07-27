function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    console.log(memoria)
    if (!memoria) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      localStorage.setItem("paletas", JSON.stringify([nuevoProducto]));  
    } else {
        const indiceProducto = memoria.findIndex(paleta => paleta.id === producto.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
           } else{
            nuevaMemoria[indiceProducto].cantidad ++;
        }
            localStorage.setItem("paletas", JSON.stringify(nuevaMemoria));  
        }
        actualizarNumeroCarrito();
        
    }


//Toma un producto, agrega cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad, 0 );
    cuentaCarritoElement.innerText = cuenta;
} 

actualizarNumeroCarrito();