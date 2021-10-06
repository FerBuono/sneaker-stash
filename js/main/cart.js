'use strict';


/////////////////// Variables ///////////////////

const cartList = document.querySelector('#lista-carrito tbody');
const cart = document.querySelector('#lista-carrito');
const priceList = document.querySelector('#lista-precios tbody');
const prices = document.querySelector('#lista-precios');
const pricesTotal = document.querySelector('#total .total__total');
const backBtn = document.querySelector('#volver');
const buyBtn = document.querySelector('#checkout');
const clearCartBtn = document.querySelector('#vaciar-carrito');
let oldURL;


/////////////////// Clases ///////////////////

class Cart {
    constructor() {
        this.cart = [];
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

class UI {

    // Método para mostrar el cart en el HTML
    printCart({cart}) {
        this.cleanCarts();

        // Ordeno la lista por precio
        cart.sort((a, b) => a.price - b.price);

        // Precio total
        const totalPrice = cart.reduce((sum, prod) => sum + (prod.price * prod.amount), 0)

        // Muestro cada producto
        cart.forEach(product => {
            const {name, logo, image, size, price, amount} = product;
            const row = document.createElement('tr');
            row.innerHTML=`
            <tr>
                <td>
                    <img src="${logo}" width="60" style="position: relative; z-index: -1;filter: invert(.5);">
                </td>
                <td>
                    <img src="${image}" width="100" class="image">
                </td>
                <td width="200" class="name">${name}</td>
                <td class="size">${size}</td>
                <td>$${price}</td>
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

            const prices = document.createElement('tr');
            prices.innerHTML=`
            <tr>
                <td>
                    <span>${name}</span><span style="font-weight: 200; margin-left: 10px">x ${amount}</span>
                </td>
                <td></td>
                <td>
                    <span>$${price * amount}</span>
                </td>
            </tr>
            `;

            cartList.appendChild(row);
            priceList.appendChild(prices);
            pricesTotal.innerHTML = `<span>Total:  $${totalPrice}</span>`;
        });
    }

    // Método para limpiar el HTML del carrito así no se duplican los productos
    cleanCarts() {
        while(cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        }
        while(priceList.firstChild) {
            priceList.removeChild(priceList.firstChild);
        }

        pricesTotal.innerHTML = `<span>Total:  $0</span>`;
    }
}


/////////////////// Instancias ///////////////////

const cartAdmin = new Cart();
const ui = new UI();

/////////////////// Funciones ///////////////////

// Función para cambiar la cantidad de un producto con los botones
const changeAmount = e => {
    e.preventDefault();

    cartAdmin.changeAmountInCart(e);

    ui.printCart(cartAdmin);

    // Paso el cart al local storage
    toLocalStorage(cartAdmin);
}

const clearCart = e => {
    e.preventDefault();

    cartAdmin.cart = [];
    
    ui.cleanCarts();

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

const changeScroll = () => {
   prices.scrollTop = cart.scrollTop;
};

const getURL = () => {
    oldURL = document.referrer;
    
    if(oldURL.includes('nike')) {
        document.documentElement.style.setProperty('--color', '#FA1E1E');
        document.documentElement.style.setProperty('--background-image', 'url("../images/backgrounds/nike2.jpg")');
    } else if(oldURL.includes('adidas')) {
        document.documentElement.style.setProperty('--color', '#9bdc28');
        document.documentElement.style.setProperty('--background-image', 'url("../images/backgrounds/adidas.jpg")');
    } else if(oldURL.includes('jordan')) {
        document.documentElement.style.setProperty('--color', '#36F5F5');
        document.documentElement.style.setProperty('--background-image', 'url("../images/backgrounds/jordan.jpg")');
    }
    
    backBtn.href = oldURL;

}

/////////////////// Eventos ///////////////////

cartList.addEventListener('click', changeAmount);

clearCartBtn.addEventListener('click', clearCart);

cart.addEventListener('scroll', changeScroll);

document.addEventListener('DOMContentLoaded', loadCart);

document.addEventListener('DOMContentLoaded', getURL);


