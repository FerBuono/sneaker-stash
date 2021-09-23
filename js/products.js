// Variables

const header = document.querySelector('#header')
const brands = document.querySelector('#brands')
let ubicacionPrincipal = window.scrollY;

const carrito = document.querySelector('#carrito');
const imgCarrito = document.querySelector('.compras');


// Funciones
  
// Mostrar header al acercar el mouse a la parte de arriba de la página
document.addEventListener('mousemove', e => {
    let vertical = e.pageY;
    let offset = window.scrollY;

    if(offset > 0) {
        if(vertical-offset <= 80) {
            header.style.top = '0';
            header.style.backgroundColor = 'black'
        }
    }
});

header.addEventListener('mouseleave', () => {
    if(window.scrollY > 0) {
        header.style.top = '-6rem';
    };
});

// Funciones al hacer scroll
window.onscroll = () => {

    // Esconder el header al scrollear hacia abajo
    let desplazamientoActual = window.scrollY;
    if (ubicacionPrincipal >= desplazamientoActual){
        setTimeout(() => {
            header.style.top = '0';
        }, 300);
    }
    else{
        if(carrito.style.display == '' || carrito.style.display == 'none'){
            setTimeout(() => {
                header.style.top = '-6rem';
            }, 300);
        } else {
            header.style.top = '0';
        }

    };
    ubicacionPrincipal = desplazamientoActual;
    
    // Cambiar el bg del header y marcas al pasar un punto
    if(ubicacionPrincipal > 100) {
        header.style.backgroundColor = 'black'
        brands.style.backgroundColor = 'black'
        
    } else {
        header.style.backgroundColor = 'transparent'
        brands.style.backgroundColor = 'transparent'
    };
};


// Mostrar y esconder el carrito
imgCarrito.addEventListener('mouseover', () => carrito.style.display = 'flex');
imgCarrito.addEventListener('mouseleave', () => carrito.style.display = 'none');



