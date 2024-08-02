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
           } else{
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad
        }
            localStorage.setItem("paletas", JSON.stringify(nuevaMemoria));
              return cuenta;
        }
        actualizarNumeroCarrito();
        
    }

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("paletas"));
    const indiceProducto = memoria.findIndex(paleta => paleta.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);  
        } else {
          memoria[indiceProducto].cantidad --;  
        }
        localStorage.setItem("paletas", JSON.stringify(memoria));
}  



//ESTA ES LA QUE VA
    // function restarAlCarrito(producto) {
//     const memoria = JSON.parse(localStorage.getItem("paletas"));
//     const indice = memoria.findIndex(paleta => paleta.id === producto.id);
//     const nuevaMemoria = memoria;
//     nuevaMemoria[indice].cantidad --;
//     if (nuevaMemoria[indice].cantidad === 0) {
//         nuevaMemoria.splice(indice, 1);
//     }
//     localStorage.setItem("paletas", JSON.stringify(nuevaMemoria));
//     actualizarNumeroCarrito();
// }

// function restarAlCarrito(producto){
//     const memoria = JSON.parse(localStorage.getItem("paletas"));
//     const indice = memoria.findIndex(paleta => paleta.id === producto.id);
//     if (memoria[indice].cantidad === 1) {
//         memoria.splice(indice, 1);
//         localStorage.setItem("paletas", JSON.stringify(memoria));
//      } else {
//         memoria[indice].cantidad --;
//         }
//         localStorage.setItem("paletas", JSON.stringify(memoria));
     
// }


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