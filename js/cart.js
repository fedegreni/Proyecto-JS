const contenedorTarjetas = document.getElementById('productos-container');

function crearTarjetasProductosInicio(){
    const productos = JSON.parse(localStorage.getItem('paletas'));
console.log(productos);  
if (productos && productos.lenght > 0) {
productos.forEach(producto => {
        const nuevaPaleta = document.createElement('div');
        nuevaPaleta.classList = "tarjeta-producto";
        nuevaPaleta.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <button id="btn${producto.id}">Agregar al carrito</button>
        
        `
        contenedorTarjetas.appendChild(nuevaPaleta);
        nuevaPaleta.getElementsByTagName("button")[0].addEventListener("click", () => {
         });
    });
}
}


crearTarjetasProductosInicio();