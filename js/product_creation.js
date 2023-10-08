const form = document.getElementById("add_form");
const itemList = document.getElementById("items-container");
const itemMap = new Map();

const summButton = document.getElementById("summ_button");
const totalPriceOutput = document.createElement("h3");

const findButton = document.getElementById("find_button");
const findInput = document.getElementById("find_input");

const sortButton = document.getElementById("sort_button");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title_input");
    const priceInput = document.getElementById("price_input");

    const title = titleInput.value;
    const price = priceInput.value;

    if (title && price) {
        const listItem = document.createElement("li");
        listItem.className = "product";
        listItem.innerHTML = `
            <img src="./img/Hoodie.png" alt="hoodie img" class="item_image">
            <div class="product_body">
                <h5 class="product_title">${title}</h5>
                <p class="product_price">${price}</p>
            </div>
        `;

        itemList.appendChild(listItem);

        itemMap.set(title, price);

        titleInput.value = "";
        priceInput.value = "";
    } else {
        alert("Будь ласка, заповніть обидва поля (Title та Price).");
    }
});

summButton.addEventListener("click", function () {

    let total = 0;
    itemMap.forEach((price) => {
        total += parseFloat(price);
    });

    totalPriceOutput.textContent = `Total Price: ${total}`;

    summButton.after(totalPriceOutput);

})

findButton.addEventListener("click", function () {
    const searchText = findInput.value;

    const items = document.querySelectorAll(".product");
    let found = false;
    for (const item of items) {
        const titleElement = item.querySelector(".product_title");
        if (titleElement && titleElement.textContent === searchText) {
            found = true;

            item.scrollIntoView({ behavior: "smooth" });

            item.style.backgroundColor = "gray";

            setTimeout(function () {
                item.style.backgroundColor = "";
            }, 3000);

            break;
        }
    }

    if (!found) {
        alert(`Елемент з заголовком "${searchText}" не знайдено.`);
    }
});

function renderItemList() {
    const itemList = document.getElementById("items-container");

    itemList.innerHTML = "";

    itemMap.forEach((price, title) => {
        const listItem = document.createElement("li");
        listItem.className = "product";
        listItem.innerHTML = `
            <img src="./img/Hoodie.png" alt="hoodie img" class="item_image">
            <div class="product_body">
                <h5 class="product_title">${title}</h5>
                <p class="product_price">${price}</p>
            </div>
        `;

        itemList.appendChild(listItem);
    });
}

sortButton.addEventListener("click", function () {
    const itemArray = Array.from(itemMap.entries()).map(([title, price]) => ({ title, price }));

    itemArray.sort((a, b) => a.price - b.price);

    itemMap.clear();

    itemArray.forEach((item) => {
        itemMap.set(item.title, item.price);
    });

    renderItemList();
});
