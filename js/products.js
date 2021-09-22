// Variables

const header = document.querySelector('#header')
const brands = document.querySelector('#brands')
let ubicacionPrincipal = window.pageYOffset;

const carrito = document.querySelector('#carrito');
const imgCarrito = document.querySelector('#img-carrito img');


// Funciones
  
// Mostrar header al acercar el mouse a la parte de arriba de la página
document.addEventListener('mousemove', e => {
    let vertical = e.pageY;
    let offset = window.pageYOffset;

    if(offset > 0) {
        if(vertical-offset <= 80) {
            header.style.top = '0';
            header.style.backgroundColor = 'black'
        }
    }
});

// Funciones al hacer scroll
window.onscroll = () => {

    // Esconder el header al scrollear hacia abajo
    let desplazamientoActual = window.pageYOffset;
    if (ubicacionPrincipal >= desplazamientoActual){
        header.style.top = '0';
    }
    else{
        header.style.top = '-6rem';

    };
    ubicacionPrincipal = desplazamientoActual;
    
    // Cambiar el bg del header y marcas al pasar un punto
    if(ubicacionPrincipal > 150) {
        header.style.backgroundColor = 'black'
        brands.style.backgroundColor = 'black'
        
    } else {
        header.style.backgroundColor = 'transparent'
        brands.style.backgroundColor = 'transparent'
    };
};


// Mostrar y esconder el carrito
imgCarrito.addEventListener('click', () => {
    if(carrito.style.display !== 'flex') carrito.style.display = 'flex';
    else carrito.style.display = 'none';
});



