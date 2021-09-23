'use strict';

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
        color: getComputedStyle(card.querySelector('.color .active')).backgroundColor,
        price: card.querySelector('.price p').textContent,
        dataId: card.querySelector('.agregar').dataset.id,
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

                // outOfStock(card, element);

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

const toHTML = () => {

    // Limpiar el HTML para que no se dupliquen los items
    cleanHTML();

    // Recorre el carrito y genera el HTML
    cartProducts.forEach(element => {
        const {name, image, size, price, dataId, amount} = element;
        const row = document.createElement('tr');
        row.innerHTML=`
            <tr>
                <td>
                    <img src="${image}" width="100" class="image">
                </td>
                <td width="200" class="name">${name}</td>
                <td class="size">${size}</td>
                <td>${price}</th>
                <td>${amount}</th>
                <td>
                    <a href="#" class="delete-btn">
                        <img src="images/icons/delete-button.png" class="delete-btn__img" data-id="${dataId}">
                    </a>
                </th>
            </tr>
        `;
        cartList.appendChild(row);

    });
    document.querySelector('#contador').style.animation = 'jump 0.5s';
    setTimeout(() => {
        document.querySelector('#contador').style.animation = '';
    }, 500);
    document.querySelector('#contador span').textContent = amountInCart(cartProducts);

    header.style.top = '0';

};

// const outOfStock = (card, element) => {
//     if(element.amount >= 5) {
//         const {name, image, size, dataId} = element;
//         const cardName = card.querySelector('.card__contentBx h2').textContent;
//         const cardImg = card.querySelector('.card__imgBx img').src;
//         const cardSize = card.querySelector('.size .active').textContent;
//         const cardColor = getComputedStyle(card.querySelector('.color .active')).backgroundColor;

//         if(cardName === element.name || cardImg === element.image || cardSize === element.size || cardColor === element.color) {
//             console.log('es el mismo!', card.querySelector('.agregar').disabled);
//             card.querySelector('.agregar').textContent = 'Out of Stock !';
//             card.querySelector('.agregar').style.backgroundColor = 'grey';
//             card.querySelector('.agregar').disabled = true;
//         } else {
//             console.log('ya no es el mismo!');

//         }

//     }
// };


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
};

const deleteProduct = e => {
    e.preventDefault();

    if(e.target.classList.contains('delete-btn__img')){
        const row = e.target.parentElement.parentElement.parentElement;
        const prodData = {
            image: row.querySelector('.image').src,
            size: row.querySelector('.size').textContent,
            id: e.target.dataset.id,
        }

        console.log(cartProducts)
        cartProducts = cartProducts.filter(prod => prod.image !== prodData.image || prod.size !== prodData.size || prod.dataId !== prodData.id);
        // cartProducts = cartProducts.filter(prod => prod.image !== prodData.image);
        console.log(cartProducts)

        toHTML();
    };
};


const cargarEventListeners = () => {
    shoesList.addEventListener('click', addProduct);
    clearCartBtn.addEventListener('click', clearCart);
    cartList.addEventListener('click', deleteProduct);
}

cargarEventListeners()
