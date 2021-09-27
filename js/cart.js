'use strict';


/////////////////// Variables ///////////////////

const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
let cartProducts = [];
const contador = document.querySelector('#contador');


/////////////////// Funciones ///////////////////

// Función para agregar productos al carrito
const addProduct = e => {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar')) {
        const card = e.target.parentElement.parentElement;
        const size = card.querySelector('.size');
        
        // Validar si el size fue seleccionado
        if(size.querySelector('.active')) {
            size.style.backgroundImage = '';
            readCardData(card); // Leer los datos de la card
        } else {
            size.style.backgroundImage = 'linear-gradient(#fd000042, #fd000042)';
        };
    };
};

// Función para leer los datos de la card y mostrarlos en un objeto. Luego este se agrega al array cartProducts
const readCardData = card => {
    const product = {
        image: card.querySelector('.card__imgBx img').src,
        name: card.querySelector('.card__contentBx h2').textContent,
        size: card.querySelector('.size .active').textContent,
        color: getComputedStyle(card.querySelector('.color .active')).backgroundColor,
        price: card.querySelector('.price p').textContent,
        amount: 1
    };
    
    // Chequear si el producto ya existe en el array
    const exist = cartProducts.some(card =>  {
        return card.name === product.name && card.size === product.size && card.image === product.image;
    });
    if(exist) {

        // Actualizamos la cantidad
        const items = cartProducts.map(element => {
            if(element.size === product.size && element.image === product.image) {
                element.amount ++;
                return element; // Retorna el objeto con la cantidad actualizada
            } else {
                return element; // Retorna el objeto
            }
        });
        cartProducts = [...items];
    } else {

        // Agregamos elementos al arreglo de carrito
        cartProducts = [...cartProducts, product];
    };
    
    toHTML();
    
};


// Función que toma los objetos de cartProducts y crea un HTML en el carrito
const toHTML = () => {
    
    cleanHTML();
    
    toLocalStorage(cartProducts);

    // Recorre el carrito y genera el HTML
    cartProducts.forEach(element => {
        const {name, image, size, price, amount} = element;
        const row = document.createElement('tr');
        row.innerHTML=`
            <tr>
                <td>
                    <img src="${image}" width="100" class="image">
                </td>
                <td width="200" class="name">${name}</td>
                <td class="size">${size}</td>
                <td>${price}</td>
                <td class="amount">${amount}</td>
                <td>
                    <div class="buttons">
                        <a href="#" class="up-btn">
                            <img src="images/icons/up.png" class="up-btn__img">
                        </a>
                        <a href="#" class="down-btn">
                            <img src="images/icons/down.png" class="down-btn__img">
                        </a>
                    </div>
                </td>
            </tr>
        `;
        cartList.appendChild(row);

    });

    if(amountInCart(cartProducts) > 0) {
        contador.style.display = 'flex';
        contador.querySelector('span').textContent = amountInCart(cartProducts);
        header.style.top = '0';
    };
};

// Función que limpia el array cartProducts y lleva a 0 el contador
const clearCart = e => {
    e.preventDefault();
    
    document.querySelector('#contador span').textContent = 0; // Lleva a 0 el contador
    
    cartProducts = []; // Resetea el array cartProducts
    
    localStorage.clear(); // Limpia el localStorage

    cleanHTML(); // Elimina los rows creados en la tabla
};

const toLocalStorage = array => {
    localStorage.setItem('cartProducts', JSON.stringify(array));
}

// Función que devuelve la cantidad de productos en el array, teniendo en cuenta los amounts
const amountInCart = (array) => {
    return array.reduce((sum, obj) => sum + obj.amount, 0);
}

// Función que limpia el HTML del carrito para que no se dupliquen los items cada vez que agrego el array de objetos al HTML
const cleanHTML = () => {
    while(cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    };

    contador.style.display = 'none';
};

// Función que cambia el amount de un producto dependiendo de que botón se clickee
const changeAmount = e => {
    e.preventDefault();

    // Selecciono la fila del producto al que le quiero cambiar la cantidad
    const row = e.target.parentElement.parentElement.parentElement.parentElement;
    const prodData = {
        image: row.querySelector('.image').src,
        size: row.querySelector('.size').textContent,
        amount: row.querySelector('.amount').textContent
    }
    
    if(e.target.classList.contains('down-btn__img')){
        
        // Busca al producto y le resta una unidad, luego si esa cantidad es 0, elimina al producto del array
        cartProducts = cartProducts.map(prod => {
            if(prod.image === prodData.image && prod.size === prodData.size) {
                prod.amount--;
            }
            return prod;
        }).filter(prod => prod.amount !== 0);
    };

    if(e.target.classList.contains('up-btn__img')){

        // Busca al producto y le agrega una unidad
        cartProducts = cartProducts.map(prod => {
            if(prod.image === prodData.image && prod.size === prodData.size) {
                prod.amount++;
            }
            return prod;
        });
    };

    toHTML();
};

const loadCart = () => {
    cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    toHTML();
}


/////////////////// Eventos ///////////////////

shoesList.addEventListener('click', addProduct);

clearCartBtn.addEventListener('click', clearCart);

cartList.addEventListener('click', changeAmount);

document.addEventListener('DOMContentLoaded', loadCart);