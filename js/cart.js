'use strict';


/////////////////// Variables ///////////////////

const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
const contador = document.querySelector('#contador');


/////////////////// Clases ///////////////////

class Cart {
    constructor() {
        this.cart = [];
    }
    
    // Método para chequear si un producto ya esta agregado al cart
    alreadyInCart(product) {
        const exist = this.cart.some(card =>  {
            return card.name === product.name && card.size === product.size && card.image === product.image;
        });
        return exist;
    }

    // Método para agregar un nuevo producto al cart si este no existe
    addToCart(product) {
        this.cart = [...this.cart, product];
    }

    // Método para aumentar la cantidad de un producto si este existe en el cart
    updateAmount(product) {
        const items = this.cart.map(element => {
            if(element.size === product.size && element.image === product.image) {
                element.amount ++;
                return element;
            } else {
                return element;
            }
        });

        this.cart = [...items];
    }

    // Método para cambiar la cantidad de un producto en el cart con los botones up-btn y down-btn
    changeAmountInCart(e) {
        const row = e.target.parentElement.parentElement.parentElement.parentElement;
        const prodData = {
            image: row.querySelector('.image').src,
            size: row.querySelector('.size').textContent,
            amount: row.querySelector('.amount').textContent
        };

        if(e.target.classList.contains('down-btn__img')){
        
            this.cart = this.cart.map(prod => {
                if(prod.image === prodData.image && prod.size === prodData.size) {
                    prod.amount--;
                }
                return prod;
            }).filter(prod => prod.amount !== 0);
        };
    
        if(e.target.classList.contains('up-btn__img')){
    
            this.cart = this.cart.map(prod => {
                if(prod.image === prodData.image && prod.size === prodData.size) {
                    prod.amount++;
                }
                return prod;
            });
        };
    }
}

class Product {
    constructor(name, image, size, color, price) {
        this.name = name;
        this.image = image;
        this.size = size;
        this.color = color;
        this.price = price;
        this.amount = 1;
    }
}

class UI {

    // Método que envía una alerta si el size no fue elegido
    sizeRequired(card) {
        const size = card.querySelector('.size');

        if(size.querySelector('.active')) {
            size.style.backgroundImage = '';
            return true;
        } else {
            size.style.backgroundImage = 'linear-gradient(#fd000042, #fd000042)';
            setTimeout(() => {
                size.style.backgroundImage = '';
            }, 2000);
        };
    }

    // Método para mostrar el cart en el HTML
    printCart({cart}) {
        this.cleanCart();

        cart.forEach(product => {
            const {name, image, size, price, amount} = product;
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
        this.changeCounter()
    }

    // Método para limpiar el HTML del carrito así no se duplican los productos
    cleanCart() {
        while(cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        }

        this.changeCounter();
    }

    // Método para cambiar el contador de productos del carrito
    changeCounter() {
        let amountInCart = cartAdmin.cart.reduce((sum, obj) => sum + obj.amount, 0);

        if(amountInCart > 0) {
            contador.style.display = 'flex';
            contador.querySelector('span').textContent = amountInCart;
            header.style.top = '0';
        } else {
            contador.style.display = 'none'
        }
    }
}


/////////////////// Instancias ///////////////////

const cartAdmin = new Cart();
const ui = new UI();


/////////////////// Funciones ///////////////////

// Función que agrega un producto al carrito
const addProduct = e => {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar')) {
        const card = e.target.parentElement.parentElement;
        
        if(ui.sizeRequired(card)) {
    
            // Leo la info de la card
            const name = card.querySelector('.card__contentBx h2').textContent;
            const image = card.querySelector('.card__imgBx img').src;
            const size = card.querySelector('.size .active').textContent;
            const color = getComputedStyle(card.querySelector('.color .active')).backgroundColor;
            const price = card.querySelector('.price p').textContent;
        
            // Creo un nuevo objeto con esa info
            const newProduct = new Product(name, image, size, color, price);

            if(cartAdmin.alreadyInCart(newProduct)) {
                cartAdmin.updateAmount(newProduct);
            } else {
                cartAdmin.addToCart(newProduct);
            };
        };
    };

    ui.printCart(cartAdmin);
    
    // Paso el carrito al local storage
    toLocalStorage(cartAdmin);
};

// Función para limpiar todo el carrito
const clearCart = e => {
    e.preventDefault();

    cartAdmin.cart = [];
    
    ui.cleanCart();

    // Paso el cart al local storage
    toLocalStorage(cartAdmin);
}

// Función para cambiar la cantidad de un producto con los botones
const changeAmount = e => {
    e.preventDefault();

    cartAdmin.changeAmountInCart(e);

    ui.printCart(cartAdmin);

    // Paso el cart al local storage
    toLocalStorage(cartAdmin);

}

// Función para enviar el cart al local storage
const toLocalStorage = ({cart}) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para pasar el cart del local storage al HTML al cargar la página
const loadCart = () => {
    cartAdmin.cart = JSON.parse(localStorage.getItem('cart')) || [];

    ui.printCart(cartAdmin);
};

/////////////////// Eventos ///////////////////

shoesList.addEventListener('click', addProduct);

clearCartBtn.addEventListener('click', clearCart);

cartList.addEventListener('click', changeAmount);

document.addEventListener('DOMContentLoaded', loadCart);






