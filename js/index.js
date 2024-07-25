// 1er pre entrega

// let producto = "";
// let cantidad = 0;
// let precio = 0;
// let seguirComprando = false;
// let precioTotal = 0;
// let cantidadTotal = 0;
// let nombre = ""

// function solicitarNombre() {
//   let nombre = prompt("Ingrese su nombre");
//   alert("Hola " + nombre + "bienvenido a PadelCompras");
// }

// solicitarNombre();

// do {
//   producto = prompt("Elija uno de nuestros productos \n 1: paleta ataque \n 2: paleta defensiva \n 3: paleta mixta").toLowerCase();
//   cantidad = parseInt(prompt("¿Cuántas paletas desea comprar?"));

//   while (isNaN(cantidad) || cantidad <= 0) {
//   alert("Debe agregar un numero valido.");
//   cantidad = parseInt(prompt("¿Cuántas paletas desea comprar?"));
//   }

//   switch (producto) {
//     case "1":
//       precio = 200000;
//       break;
//     case "2":
//       precio = 100000;
//       break;
//     case "3":
//       precio = 150000;
//       break;
//     default:
//       alert("Opción inválida.");
//       continue; // Si la opción no es válida, reinicia el ciclo.
//   }

//   precioTotal += (precio * cantidad);
//   cantidadTotal += cantidad;

//   seguirComprando = confirm("¿Desea seguir comprando?");

// } while (seguirComprando);

// alert("Ha comprado"  +cantidadTotal+" productos y el precio final es de $"+precioTotal);


//COMPRAR PALETAS 2DA PREENTREGA
// let compras = []; 

// const paletas = {
//     ataque: 200000,
//     defensiva: 100000,
//     mixta: 150000
// };

// function calcularCompra() {
//     while (true) {
//         const tipoPaleta = obtenerTipoPaleta();
//         const cantidad = obtenerValor("cantidad de paletas de pádel que desea comprar", true);
        
//         const nuevaCompra = calcularCompraPaletas(tipoPaleta, cantidad);
//         compras.push(nuevaCompra);

//         mostrarResultados(nuevaCompra);

//         if (!confirm("¿Desea realizar otra compra?")) {
//             break;
//         }
//     }
//     alert("Gracias por utilizar nuestro servicio de compra de paletas de pádel. ¡Hasta luego!");
// }

// function obtenerTipoPaleta() {
//     let tipo;
//     do {
//         tipo = prompt("Ingrese el tipo de paleta de pádel que desea comprar (ataque, defensiva, mixta):").toLowerCase();
//         if (!paletas.hasOwnProperty(tipo)) {
//             alert("Por favor, ingrese un tipo de paleta válido (ataque, defensiva, mixta).");
//         }
//     } while (!paletas.hasOwnProperty(tipo));
//     return tipo;
// }

// function obtenerValor(mensaje, esEntero = false) {
//     let valor;
//     do {
//         valor = esEntero ? parseInt(prompt(`Ingrese ${mensaje}:`)) : parseFloat(prompt(`Ingrese ${mensaje}:`));
//         if (!validarValores(valor)) {
//             alert(`Por favor, ingrese un ${mensaje} válido y positivo.`);
//         }
//     } while (!validarValores(valor));
//     return valor;
// }

// function calcularCompraPaletas(tipo, cantidad) {
//     const precioPorUnidad = paletas[tipo];
//     const totalSinDescuento = cantidad * precioPorUnidad;
//     const descuento = calcularDescuento(cantidad, totalSinDescuento);
//     const totalConDescuento = totalSinDescuento - descuento;

//     return {
//         tipo: tipo,
//         cantidad: cantidad,
//         precioPorUnidad: precioPorUnidad,
//         totalSinDescuento: totalSinDescuento,
//         descuento: descuento,
//         totalConDescuento: totalConDescuento
//     };
// }

// function calcularDescuento(cantidad, total) {
//     let descuento = 0;
//     if (cantidad >= 3) {
//         descuento = total * 0.15; // 15% de descuento para 3 o más paletas
//     }
//     return descuento;
// }

// function formatearNumero(numero) {
//     return numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
// }

// function mostrarResultados(compra) {
//     const mensaje = `
//     Tipo de Paleta de Pádel: ${compra.tipo.charAt(0).toUpperCase() + compra.tipo.slice(1)}
//     Cantidad: ${compra.cantidad}
//     Precio por Unidad: $${formatearNumero(compra.precioPorUnidad)}
//     Total sin Descuento: $${formatearNumero(compra.totalSinDescuento)}
//     Descuento: $${formatearNumero(compra.descuento)}
//     Total con Descuento: $${formatearNumero(compra.totalConDescuento)}
//     `;

//     console.log(mensaje);
//     alert(mensaje);
// }

// function validarValores(valor) {
//     return valor > 0;
// }

// function buscarCompra(tipo) {
//     return compras.find(compra => compra.tipo === tipo);
// }

// // Usando la función map para crear un resumen de compras
// function mostrarResumenCompras() {
//     const resumen = compras.map(compra => {
//         return `Tipo: ${compra.tipo.charAt(0).toUpperCase() + compra.tipo.slice(1)}, Cantidad: ${compra.cantidad}, Total: $${formatearNumero(compra.totalConDescuento)}`;
//     }).join('\n');

//     console.log("Resumen de Compras:\n" + resumen);
//     alert("Resumen de Compras:\n" + resumen);
// }

// calcularCompra();

// const carousel = document.getElementById('carouselExampleIndicators');
// console.log(carousel);

// const btnPrincipalAtaque = document.getElementById('btnPrincipalAtaque');

// const respuestaClick = () => {
//     console.log('respuestaClick');
// };

// btnPrincipalAtaque.addEventListener('click', respuestaClick);




//CARRITO DE COMPRA

const contenedorTarjetas = document.getElementById('productos-container');

function crearTarjetasProductosInicio(productos) {
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
            agregarAlCarrito(producto);
        });
    });
}

crearTarjetasProductosInicio(paletas);