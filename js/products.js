// Variables

const header = document.querySelector('#header')
const brands = document.querySelector('#brands')
let ubicacionPrincipal = window.pageYOffset;

const carrito = document.querySelector('#carrito');
const imgCarrito = document.querySelector('#img-carrito');
const main = document.querySelector('#main');


// Funciones

// Funciones al hacer scroll
window.onscroll = () => {
    navFunction();
    cartListHide();
};

const navFunction = () => {

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
        header.classList.add('black');
        brands.classList.add('black');
        
    } else {
        header.classList.remove('black');
        brands.classList.remove('black');
    };
};

// Mostrar y esconder el carrito
imgCarrito.addEventListener('click', () => {
    if(carrito.style.display !== 'flex') carrito.style.display = 'flex';
    else carrito.style.display = 'none';
    console.log(carrito.style.display)
});
main.addEventListener('click', () => {
    if(carrito.style.display === 'flex') {
        imgCarrito.click()
    }
});
const cartListHide = () => {
    if(carrito.style.display === 'flex') {
        imgCarrito.click()
    }
};

