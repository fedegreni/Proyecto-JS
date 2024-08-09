const contenedorTarjetas = document.getElementById('productos-container');

fetch('./js/paletas.json')
    .then(response => response.json()) 
    .then(productos => {
        productos.forEach(producto => { 
            const nuevaPaleta = document.createElement('div');
            nuevaPaleta.classList = "tarjeta-producto";
            nuevaPaleta.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button id="btn${producto.id}">Agregar al carrito</button>
            `;
            contenedorTarjetas.appendChild(nuevaPaleta);
            nuevaPaleta.getElementsByTagName("button")[0].addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        });
    })

