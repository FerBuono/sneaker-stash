const url = $(location).attr('pathname');
const page = url.split("/").pop().split(".").shift();

$(window).on("load", loadCards)

function loadCards() {
    const db = `data/${page}.json`;
    $.ajax({
        url: db,
        method: "GET",
        dataype: "json",
        success: (data) => showCards(data),
        error: (error) => console.log(error)
    })
};

function showCards(products) {
    const shoesList = document.querySelector('#shoes-list');

    products[page].forEach(product => {
        const {name, price, models, models: [{color, img}], collab} = product;

        let colorsList = `<span class="${color} active" img-id="${img}"></span>`
        models.forEach(model => {
            const {color, img} = model;
            if(models.indexOf(model) > 0) {
                colorsList += `<span class="${color}" img-id="${img}"></span>`;
            }
        });

        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card__circle"></div>
            <div class="card__imgBx">
                <img src="${img}" alt="">
            </div>
            <div class="card__contentBx">
                <h2>${name}</h2>
                <h4>${collab}</h4>
                <div class="size" id="sizes">
                    <h3>Size :</h3>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                </div>
                <div class="color" id="colors">
                    <h3>Color :</h3>
                    ${colorsList}
                </div>
                <div class="price" id="price">
                    <h3>Price :</h3>
                    <p>$<span>${price}</span></p>
                </div>
                <a href="#" class='agregar'>Add to cart!</a>
            </div>
        `;

        shoesList.appendChild(card)
    });
}