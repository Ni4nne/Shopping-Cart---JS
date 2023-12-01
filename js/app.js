//Variables
const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Agrega un curso al presionar el botón "comprar"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Otra función***



}

//Funciones
function agregarCurso(e){
    e.preventDefault(); //Evita el desplazamiento hacia arriba de la página cuanda va a buscar el #
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);        
    } 
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        //Obtener la id del curso
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del array articulosCarrito
        //Trae al array todos los cursos excepto el que estamos eliminando
        articulosCarrito = articulosCarrito.filter(curso=> curso.id !== cursoId);

        //Actualiza la vista del array "articulosCarrito" en el HTML
        carritoHTML();
    }
}

//Lee y extrae la info del curso seleccionado
function leerDatosCurso(curso){

    //Se crea un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Comprueba si el curso seleccionado ya existe en el carrito
    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
    if(existe){
        //Si existe el curso, incrementa cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];

    }else{
        //Si no existe, añade curso
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Actualiza la vista del array "articulosCarrito" en el HTML
    carritoHTML();
}

//Función que imprime los articulosCarrito en HTML
function carritoHTML(){

    //Primero se limpia el HTML previo
    limpiarHTML();

    //Recorre el array articulosCarrito y genera el HTML
    articulosCarrito.forEach(curso=> {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${curso.imagen}"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>
        `;

    //Añade el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    });

}

//Elimina los cursos del tbody
function limpiarHTML(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}