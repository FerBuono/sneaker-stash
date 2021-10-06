// Variables
const cardsContainer = document.querySelector('#cards-container');
const header = document.querySelector('#header');
const logo = document.querySelector('#logo');
const title = document.querySelector('#title');

// Backgrounds
const bgAdidas = document.querySelector('#bg-adidas');
const bgNike = document.querySelector('#bg-nike');
const bgJordan = document.querySelector('#bg-jordan');



const changes = e => {
    const firstParent = e.target.parentElement;
    const secondParent = e.target.parentElement.parentElement;

    // Cambiar los colores de borde y shadow del header y el logo según cada marca
    if(firstParent.classList.contains('card')) {
        let circle = firstParent.querySelector('.card__circle');
        const bgColor = getComputedStyle(circle).backgroundColor;

        header.style.borderColor = bgColor;
        header.style.boxShadow = `0 3px 20px  black, 0 10px 30px ${bgColor}`;
        
        logo.style.borderColor = bgColor;
        logo.style.boxShadow = `0 3px 20px  black, 0 10px 30px ${bgColor}`;
    } 
    else if(secondParent.classList.contains('card')) {
        circle = secondParent.querySelector('.card__circle');
        const bgColor = getComputedStyle(circle).backgroundColor;

        header.style.borderColor = bgColor;
        header.style.boxShadow = `0 3px 20px  black,0 10px 30px ${bgColor}`;
        
        logo.style.borderColor = bgColor;
        logo.style.boxShadow = `0 3px 20px  black,0 10px 30px ${bgColor}`;
    };

    // Cambiar el bg según cada marca
    if(firstParent.classList.contains('card--adidas')) {
        bgAdidas.classList.add('active');
        title.style.animation = 'flicker-red 1.5s infinite alternate';
    }
    else if(firstParent.classList.contains('card--nike')) {
        bgNike.classList.add('active');
        title.style.animation = 'flicker-cyan 1.5s infinite alternate';
    }
    else if(firstParent.classList.contains('card--jordan')) {
        bgJordan.classList.add('active');
        title.style.animation = 'flicker-green 1.5s infinite alternate';
    }
    
    if(secondParent.classList.contains('card--adidas')) {
        bgAdidas.classList.add('active');
        title.style.animation = 'flicker-red 1.5s infinite alternate';
    }
    else if(secondParent.classList.contains('card--nike')) {
        bgNike.classList.add('active');
        title.style.animation = 'flicker-cyan 1.5s infinite alternate';
    }
    else if(secondParent.classList.contains('card--jordan')) {
        bgJordan.classList.add('active');
        title.style.animation = 'flicker-green 1.5s infinite alternate';
    }
};

const removeChanges = e => {
    header.style.textShadow = '';
    header.style.borderColor = '';
    header.style.boxShadow = '';
    
    logo.style.textShadow = '';
    logo.style.borderColor = '';
    logo.style.boxShadow = '';

    bgAdidas.classList.remove('active');
    bgNike.classList.remove('active');
    bgJordan.classList.remove('active');

    title.style.animation = 'flicker-base 1.5s infinite alternate';
}

const loadEventListeners = () => {
    cardsContainer.addEventListener('mouseover', changes);
    cardsContainer.addEventListener('mouseout', removeChanges)
};

loadEventListeners()