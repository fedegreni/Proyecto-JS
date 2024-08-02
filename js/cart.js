const contenedorTarjetas = document.getElementById('productos-container');

function crearTarjetasProductosInicio(){
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
        });
        nuevaPaleta
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
            restarAlCarrito(producto); 
            crearTarjetasProductosInicio();
            
            });
         });
    }
}



crearTarjetasProductosInicio();