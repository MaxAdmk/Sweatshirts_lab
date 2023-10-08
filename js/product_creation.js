const form = document.getElementById("add_form");
const itemList = document.getElementById("items-container");
const itemMap = new Map();

const summButton = document.getElementById("summ_button");
const totalPriceOutput = document.createElement("h3");

const findButton = document.getElementById("find_button");
const findInput = document.getElementById("find_input");

const sortButton = document.getElementById("sort_button");

const deleteButton =document.querySelector("delete_button");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title_input");
    const priceInput = document.getElementById("price_input");

    const title = titleInput.value;
    const price = priceInput.value;

    if (!/^\d+$/.test(price)) {
        alert("Поле Price повинно містити лише цифри.");
        return;
    }

    if (title && price) {
        const listItem = document.createElement("li");
        listItem.className = "product";
        listItem.innerHTML = `
            <img src="./img/Hoodie.png" alt="hoodie img" class="item_image">
            <div class="product_body">
                <h5 class="product_title">${title}</h5>
                <p class="product_price">${price}</p>
                <div class="product_buttons">
                    <button class="delete_button">Delete</button>
                    <button class="edit_button">Edit</button>
                    <button class="save_button" style="display: none;">Save</button>
                </div>
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
                <div class="product_buttons">
                    <button class="delete_button">Delete</button>
                    <button class="edit_button">Edit</button>
                    <button class="save_button" style="display: none;">Save</button>
                </div>
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

itemList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete_button")) {
        
        const listItem = event.target.closest(".product");
        
        if (listItem) {
            const productTitle = listItem.querySelector(".product_title").textContent;
            itemMap.delete(productTitle);
            itemList.removeChild(listItem);
        }
    }
});

itemList.addEventListener("click", function (event) {
    const listItem = event.target.closest(".product");
    
    if (!listItem) return;

    if (event.target.classList.contains("edit_button")) {
        const titleElement = listItem.querySelector(".product_title");
        const priceElement = listItem.querySelector(".product_price");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.className = "edit-title-input";
        titleInput.value = titleElement.textContent;

        const priceInput = document.createElement("input");
        priceInput.type = "text";
        priceInput.className = "edit-price-input";
        priceInput.value = priceElement.textContent;

        titleElement.replaceWith(titleInput);
        priceElement.replaceWith(priceInput);

        const editButton = listItem.querySelector(".edit_button");
        const saveButton = listItem.querySelector(".save_button");
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    } else if (event.target.classList.contains("save_button")) {
        const titleInput = listItem.querySelector(".edit-title-input");
        const priceInput = listItem.querySelector(".edit-price-input");

        const newTitle = titleInput.value;
        const newPrice = priceInput.value;

        if (!/^\d+$/.test(newPrice)) {
            alert("Поле Price повинно містити лише цифри.");
            return;
        }

        const newTitleElement = document.createElement("h5");
        newTitleElement.className = "product_title";
        newTitleElement.textContent = newTitle;

        const newPriceElement = document.createElement("p");
        newPriceElement.className = "product_price";
        newPriceElement.textContent = newPrice;

        titleInput.replaceWith(newTitleElement);
        priceInput.replaceWith(newPriceElement);

        const editButton = listItem.querySelector(".edit_button");
        const saveButton = listItem.querySelector(".save_button");
        editButton.style.display = "inline-block";
        saveButton.style.display = "none";

        const productTitle = listItem.querySelector(".product_title").textContent;
        itemMap.set(productTitle, newPrice);
    }
});
