'use strict';


/////////////////// Variables ///////////////////

const header = document.querySelector('#header')
const brands = document.querySelector('#brands')
let ubicacionPrincipal = window.scrollY;

const carrito = document.querySelector('#carrito');
const imgCarrito = document.querySelector('.compras');


/////////////////// Funciones ///////////////////

// Función para mostrar el header al acercar el mouse a la parte superior de la página
const showHeader = e => {

    // Tomo la posición del mouse y la posición en Y de la página
    let vertical = e.pageY;
    let offset = window.scrollY;
    let difference = vertical - offset;

    if(window.scrollY > 0) {
        if(difference <= 100) {
            header.style.top = '0';
        } else {
            if(getComputedStyle(brands).display === 'flex' || carrito.style.display === 'flex') {
                header.style.top = '0';
            }; 
        };

    } else {
        if(difference <= 100) {
            header.style.top = '0';
        } else if(getComputedStyle(brands).display === 'flex' || carrito.style.display === 'flex') {
            header.style.top = '0';
        } else {
            header.style.top = '0';
        };
    };
};

// Función para esconder el header cuando sacas el mouse de encima
const hideHeader = () => {

    if(window.scrollY <= 0) {
        header.onmouseleave = () => header.style.top = '0';  
    } else {
        header.onmouseleave = () => header.style.top = '-6rem';
    }
};

// Función para mostrar/esconder el header al scrollear
window.onscroll = () => {

    // Esconder el header al scrollear hacia abajo
    let desplazamientoActual = window.scrollY;
    if (ubicacionPrincipal >= desplazamientoActual){
        header.style.top = '0';
    } else {
        if(carrito.style.display !== 'flex' && getComputedStyle(brands).display !== 'flex'){
            header.style.top = '-6rem';
        } else {
            header.style.top = '0';
        }

    };
    ubicacionPrincipal = desplazamientoActual;
};


/////////////////// Eventos ///////////////////

document.addEventListener('mousemove', showHeader);

header.addEventListener('mouseleave', hideHeader);

imgCarrito.addEventListener('mouseover', () => carrito.style.display = 'flex');

imgCarrito.addEventListener('mouseleave', () => carrito.style.display = 'none');



