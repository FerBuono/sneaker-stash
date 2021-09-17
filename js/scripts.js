VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 15,
    speed: 400
});

const cardsContainer = document.querySelector('#cards-container');
const title = document.querySelector('#title');
const video = document.querySelector('.bg-video');



const changes = e => {
    if(e.target.parentElement.classList.contains('card')) {
        let circle = e.target.parentElement.querySelector('.card__circle');
        title.parentElement.style.borderColor = getComputedStyle(circle).backgroundColor;
        title.parentElement.style.boxShadow = `0 3px 20px  black,0 10px 30px ${getComputedStyle(circle).backgroundColor}`;
    } 
    else if(e.target.parentElement.parentElement.classList.contains('card')) {
        circle = e.target.parentElement.parentElement.querySelector('.card__circle');
        title.parentElement.style.borderColor = getComputedStyle(circle).backgroundColor;
        title.parentElement.style.boxShadow = `0 3px 20px  black,0 10px 30px ${getComputedStyle(circle).backgroundColor}`;
    };
};

const removeChanges = e => {
    title.style.textShadow = '';
    title.parentElement.style.borderColor = '';
    title.parentElement.style.boxShadow = '';
}

const loadEventListeners = () => {
    cardsContainer.addEventListener('mouseover', changes);
    cardsContainer.addEventListener('mouseout', removeChanges)
};

loadEventListeners()