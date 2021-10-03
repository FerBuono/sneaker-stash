'use strict';


/////////////////// Variables ///////////////////

const shoesList = document.querySelector('#shoes-list');
const circles = Array.from(document.querySelectorAll('.card__circle'));
const cards = Array.from(document.querySelectorAll('.card'));


/////////////////// Funciones ///////////////////

// Funcion para asignar el color del circulo al cargar la página
window.onload = () => {
    circles.forEach(circle => {
        const colorElement = circle.parentElement.querySelector('.active');
        circle.style.backgroundColor = getComputedStyle(colorElement).backgroundColor;
    });
};

// Función para obtener todos los elementos hermanos del elemento accionado
const getSiblings = (element) => {
    const parent = element.parentElement;
    let children = Array.from(parent.querySelectorAll('span'));
    return children.filter(sibling => sibling !== element);
};


// Función que realiza todos los cambios en la tarjeta (size, color)
const change = e => {
    const siblings = getSiblings(e.target);
    const circle = e.target.parentElement.parentElement.parentElement.firstElementChild;
    const newCircleColor = getComputedStyle(e.target).backgroundColor;
    
    // Cambios relacionados con la selección del size
    if(e.target.parentElement.classList.contains('size')) {
        
        if(e.target.textContent.length <= 2) {
            e.target.classList.add('active');
            if(e.target.classList.contains('active')) {
                siblings.forEach(sibling => sibling.classList.remove('active'));
            };
        };
    };

    // Cambios relacionados a la selección de color
    if(e.target.parentElement.classList.contains('color')) {
        
        if(!e.target.textContent) {
            
            // Selección de color
            e.target.classList.add('active');
            siblings.forEach(sibling => sibling.classList.remove('active'));
        
            // Cambiar el color del círculo
            const shoeImg = e.target.parentElement.parentElement.previousElementSibling.firstElementChild;
            circle.style.backgroundColor = newCircleColor;

            // Cambiar la imágen de acuerdo al color establecido
            shoeImg.setAttribute('src', e.target.getAttribute('img-id'));

            // Cambiar el color del boton size de acuerdo al color del circulo
            const sizeBtn = Array.from(e.target.parentElement.previousElementSibling.children);
            sizeBtn.forEach(btn => {
                if(btn.style.backgroundColor !== '') {
                    btn.style.backgroundColor = newCircleColor;
                };
            });
        };
    };
};

// Función que borra la selección del size al salir de una card
const removeSize = 


/////////////////// Eventos ///////////////////

shoesList.addEventListener('click', change);
    
cards.forEach(card => {
    card.addEventListener('mouseleave', () => {
        const size = card.querySelector('.size');
        size.style.backgroundImage = '';
    
        if(size.querySelector('.active')) {
            size.querySelector('.active').style.backgroundColor = '';
            size.querySelector('.active').classList.remove('active');
        };
    });
});

