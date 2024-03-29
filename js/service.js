//INICIALIZAR VARIABLES DE BUSQUEDA

const inputSearchTit = document.querySelector("#ingresoTitulo");
const btnSearchTit = document.querySelector("#btnSearch1");
const listaCategorias = document.querySelector("#categorias");
const btnSearchCat = document.querySelector("#btnSearch2");
const inputPrecioMin = document.querySelector("#ingresoPrecioMin");
const inputPrecioMax = document.querySelector("#ingresoPrecioMax");
const btnSearchPrecios = document.querySelector("#btnSearch3");

//INICIALIZAR VARIABLES DEL CARRITO
const carritoDeLibros = JSON.parse(localStorage.getItem("carrito")) || [];

const btnMostrarCarrito = document.querySelector("#btn-mostrar-carrito");
const btnLimpiarCarrito = document.querySelector("#btn-limpiar-carrito");
const carritoContenedor = document.querySelector(".carrito-contenedor");
const btnClose = document.querySelector(".btn-close");
const carritoContenido = document.querySelector("#carrito-contenido");

//CONTENEDOR PARA EXPONER TARJETAS
const contenedor = document.querySelector("#contenedor");

//LIBROS
const categoriaDeLibros = ["ficción latinoamericana", "no ficción", "poesía"];
function Libro(codigo, titulo, autor, editorial, genero, precio, stock, img) {
  this.codigo = String(codigo);
  this.titulo = titulo;
  this.autor = autor;
  this.editorial = editorial;
  this.genero = genero;
  this.precio = precio;
  this.stock = stock;
  this.img = img;
}

const arrayDeLibros =
  [
    new Libro(
      1,
      "Las niñas del naranjel",
      "Gabriela Cabezón Cámara",
      "Random House",
      "ficción latinoamericana",
      18200,
      10,
      "las-ninas-del-naranjel.png"
    ),
    new Libro(
      2,
      "La paciencia del agua sobre cada piedra",
      "Alejandra Kamiya",
      "Eterna Cadencia",
      "ficción latinoamericana",
      15000,
      4,
      "la-paciencia-del-agua.jpg"
    ),
    new Libro(
      3,
      "El ruido de una época",
      "Ariana Harwicz",
      "Marciana",
      "no ficción",
      11890,
      6,
      "el-ruido-de-una-epoca.jpg"
    ),
    new Libro(
      4,
      "Las primas",
      "Aurora Venturini",
      "Tusquets",
      "ficción latinoamericana",
      23000,
      8,
      "las-primas.jpg"
    ),
    new Libro(
      5,
      "Las malas",
      "Camila Sosa Villada",
      "Tusquets",
      "ficción latinoamericana",
      24000,
      3,
      "las-malas.jpg"
    ),
    new Libro(
      6,
      "La belleza del marido",
      "Anne Carson",
      "Zindo & Gafuri",
      "poesía",
      18200,
      4,
      "la-belleza-del-marido.jpg"
    ),
    new Libro(
      7,
      "Ultimos poemas en prozac",
      "Fabián Casas",
      "Emece",
      "poesía",
      12900,
      5,
      "ultimos-poemas-en-prozac.jpg"
    ),
    new Libro(
      8,
      "Libros chiquitos",
      "Tamara Kamenszain",
      "Eterna Cadencia",
      "poesía",
      9300,
      10,
      "libros-chiquitos.jpg"
    ),
  ] || [];

/* FUNCIONES DE BUSQUEDA Y FILTRADO */

function buscarPorTitulo(arr, filtro) {
  const libroEncontrado = arr.find((el) => el.titulo.includes(filtro));
  return libroEncontrado;
}

function filtrarPorTitulo(arr, filtro) {
  const libroEncontrado = arr.filter((el) => el.titulo.includes(filtro));
  console.log(libroEncontrado);
  return libroEncontrado;
}

function filtrarPorPrecio(arr, masBajo, masAlto) {
  const libroFiltrado = arr.filter(
    (el) => el.precio >= masBajo && el.precio <= masAlto
  );
  return libroFiltrado;
}

function filtrarPorGenero(arr, filtro) {
  return arr.filter((el) => el.genero == filtro);
}

// FUNCION PARA EXPONER TARJETAS ENCONTRADAS
function crearHtml(arr) {
  arr.length === 0 &&
    alert("No hay libros que cumplan con los criterios seleccionados");
  //llamo al elemento contenedor
  contenedor.innerHTML = "";
  //creo una variable con un estructura html
  let html;
  for (const el of arr) {
    const { img, titulo, precio, codigo } = el;
    html = `<div class="card">
      <img src=" ./img/${img}" alt="${titulo}">
      <hr>
      <h3>${titulo}</h3>
      <p>Precio: $${precio} </p>
        <div class="card-action">
          <button class="producto-agregar btn" id=${codigo}>Agregar</button>
        </div>
    </div>`;

    //se la agrego al contenedor
    contenedor.innerHTML += html;
  }
  const botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach((boton) =>
    boton.addEventListener("click", agregarAlCarrito)
  );
}

/* FUNCIONES PARA OPERAR EL CARRITO */
function carritoItem(codigo, titulo, precio) {
  this.codigo = String(codigo);
  this.titulo = titulo;
  this.precio = precio;
  this.cantidad = 1;
  this.subtot = this.precio;
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const itemEnCarrito = carritoDeLibros.find((item) => item.codigo == idBoton);
  if (itemEnCarrito != undefined) {
    itemEnCarrito.cantidad += 1;
    itemEnCarrito.subtot += itemEnCarrito.precio;
  } else {
    const libroNuevo = arrayDeLibros.find((libro) => libro.codigo == idBoton);
    itemNuevo = new carritoItem(
      libroNuevo.codigo,
      libroNuevo.titulo,
      libroNuevo.precio
    );
    carritoDeLibros.push(itemNuevo);
  }
  localStorage.setItem("carrito", JSON.stringify(carritoDeLibros));
  alert("Producto agregado");
}

function mostrarInformacionCarrito() {
  carritoContenido.innerHTML = "";
  if (carritoDeLibros.length == 0) {
    alert("Carrito vacío");
    return;
  }
  for (const item of carritoDeLibros) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="fila-carrito">
    <button id = ${item.codigo}  class = "producto-eliminar">-</button>
    <h3>${item.titulo}</h3>
    <p> ${item.cantidad} </p>
    <p>$${item.subtot}</p>
    </div>`;
    carritoContenido.append(li);
  }
  //le agrego una fila con el total y un botón de pagar al final
  const li = document.createElement("li");
  li.innerHTML = `<div class="fila-carrito">
    <h3>Total a pagar</h3>
    <p>$${calcularTotal(carritoDeLibros)}</p>   
    </div>
    <button class="btn btn-success" id="btn-pagar">   Pagar
    </button>`;
  carritoContenido.append(li);
  const botonesEliminar = document.querySelectorAll(".producto-eliminar");
  botonesEliminar.forEach(
    (boton) => boton.addEventListener("click", eliminarDelCarrito) //falta crear funcion eliminar
  );
  const botonPagar = document.querySelector("#btn-pagar");
  botonPagar.addEventListener("click", () => {
    pagar();
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const itemABorrar = carritoDeLibros.find((item) => item.codigo == idBoton);
  const indiceObjABorrar = carritoDeLibros.findIndex(
    (obj) => obj.codigo === itemABorrar.codigo
  );
  carritoDeLibros.splice(indiceObjABorrar, 1);
  alert("Producto eliminado: " + itemABorrar.titulo);
  localStorage.setItem("carrito", JSON.stringify(carritoDeLibros));
}

function calcularTotal(arr) {
  return arr.reduce((acc, el) => {
    return (acc = acc + el.subtot);
  }, 0);
}

function pagar() {
  alert(
    "ME QUEDO PENDIENTE PARA LA PROXIMA ENTREGA PASAR ESTO AL DOM \n\n Ingrese a continuación los datos de su tarjeta de crédito."
  );
  const nombre = prompt("Nombre: ");
  const apellido = prompt("Apellido: ");
  const tarjetaDeCredito = prompt("Número de tarjeta: ");
  const confirmarPago = prompt(
    "Se debitará de su tarjeta el monto de: $" +
      calcularTotal(carritoDeLibros) +
      "\n Presione 1 para confirmar."
  );
  if (confirmarPago == "1") {
    vaciarCarrito();
    return "Pago confirmado";
  } else {
    return "Operación cancelada";
  }
}

function vaciarCarrito() {
  carritoDeLibros.splice(0, carritoDeLibros.length);
  localStorage.removeItem("carrito");
  mostrarInformacionCarrito();
}

//EVENTOS DE BUSQUEDA

// 1 - Filtra por palabra en título

btnSearchTit.addEventListener("click", () => {
  const encontrado = filtrarPorTitulo(arrayDeLibros, inputSearchTit.value);
  crearHtml(encontrado);
});

// 2 - Filtra por categoría

categoriaDeLibros.forEach((categoria) => {
  let option = document.createElement("option");
  option.value = categoria;
  option.innerText = categoria;
  listaCategorias.append(option);
});

btnSearchCat.addEventListener("click", () => {
  const categoriaActual =
    listaCategorias.options[listaCategorias.selectedIndex].value;
  const encontrado = filtrarPorGenero(arrayDeLibros, categoriaActual);
  crearHtml(encontrado);
});

// 3 - Filtra por rango de precios

btnSearchPrecios.addEventListener("click", () => {
  const encontrado = filtrarPorPrecio(
    arrayDeLibros,
    inputPrecioMin.value,
    inputPrecioMax.value
  );
  crearHtml(encontrado);
});

// EVENTOS PARA OPERAR SOBRE EL CARRITO

btnClose.addEventListener("click", () => {
  carritoContenedor.classList.add("oculto");
});

btnMostrarCarrito.addEventListener("click", () => {
  carritoContenedor.classList.remove("oculto");
  mostrarInformacionCarrito();
});

btnLimpiarCarrito.addEventListener("click", () => {
  alert("vamos a vaciar tu carrito");
  vaciarCarrito();
});
