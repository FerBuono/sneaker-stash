const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
let cartProducts = [];

const amountInCart = (array) => {
    return array.reduce((sum, obj) => sum + obj.amount, 0);
}



const addProduct = e => {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar')) {
        const card = e.target.parentElement.parentElement;
        const size = card.querySelector('.size');

        if(size.querySelector('.active')) {
            size.style.backgroundImage = '';
            readCardData(card);
        } else {
            size.style.backgroundImage = 'linear-gradient(#fd000042, #fd000042)';
        };
    };
};

const readCardData = card => {
    const product = {
        image: card.querySelector('.card__imgBx img').src,
        name: card.querySelector('.card__contentBx h2').textContent,
        size: card.querySelector('.size .active').textContent,
        price: card.querySelector('.price p').textContent,
        amount: 1
    };
    
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
    
    document.querySelector('#contador').style.animation = 'jump 0.5s';
    setTimeout(() => {
        document.querySelector('#contador').style.animation = '';
    }, 500);
    document.querySelector('#contador span').textContent = amountInCart(cartProducts);

    header.style.top = '0';

    toHTML();
};

const toHTML = () => {

    // Limpiar el HTML para que no se dupliquen los items
    cleanHTML();

    // Recorre el carrito y genera el HTML
    cartProducts.forEach(element => {
        const {name, image, size, price, amount} = element;
        const row = document.createElement('tr');
        row.innerHTML=`
            <tr>
                <td>
                    <img src="${image}" width="100">
                </td>
                <td width="200">${name}</td>
                <td>${size}</td>
                <td>${price}</th>
                <td>${amount}</th>
                <td>${amount}</th>
            </tr>
        `;
        cartList.appendChild(row)
    });
};

const cleanHTML = () => {
    while(cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    };
};

const clearCart = e => {
    e.preventDefault();

    document.querySelector('#contador span').textContent = 0; // Lleva a 0 el contador

    cartProducts = []; // Resetea el array cartProducts

    cleanHTML(); // Elimina los rows creados en la tabla
}


const cargarEventListeners = () => {
    shoesList.addEventListener('click', addProduct);
    clearCartBtn.addEventListener('click', clearCart)
}

cargarEventListeners()
