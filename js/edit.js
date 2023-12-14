function deleteItem(listItem) {
    const titleElement = listItem.querySelector(".product_title");
    const productTitle = titleElement.textContent;
    listItem.remove();
    localStorage.removeItem(productTitle);
    fetch(`http://localhost:3000/api/products/${productTitle}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateProduct(oldTitle, newTitle, newPrice) {
    fetch(`http://localhost:3000/api/products/${oldTitle}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldTitle, newTitle, newPrice }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', oldTitle, data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



document.addEventListener("DOMContentLoaded", function() {
    const itemList = document.getElementById("items-container");
    let titleElement; 

    itemList.addEventListener("click", function (event) {
        const listItem = event.target.closest(".product");

        if (!listItem) return;

        if (event.target.classList.contains("edit_button")) {
            titleElement = listItem.querySelector(".product_title");
            const priceElement = listItem.querySelector(".product_price");

            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.className = "edit-title-input";
            titleInput.value = titleElement.textContent;

            const priceInput = document.createElement("input");
            priceInput.type = "text";
            priceInput.className = "edit-price-input";
            priceInput.value = priceElement.textContent;

            const productTitle = titleElement.textContent;

            localStorage.removeItem(productTitle);

            titleElement.replaceWith(titleInput);
            priceElement.replaceWith(priceInput);

            const editButton = listItem.querySelector(".edit_button");
            const saveButton = listItem.querySelector(".save_button");
            editButton.style.display = "none";
            saveButton.style.display = "inline-block";
        } else if (event.target.classList.contains("save_button")) {
            if (titleElement) {
                

                const titleInput = listItem.querySelector(".edit-title-input");
                const priceInput = listItem.querySelector(".edit-price-input");

                const newTitle = titleInput.value;
                const newPrice = priceInput.value;

                if (!/^\d+$/.test(newPrice)) {
                    alert("Поле Price повинно містити лише цифри.");
                    return;
                }

                if (!/^[a-zA-Z]+$/.test(newTitle)) {
                    alert("Поле Title повинно містити лише букви.");
                    return;
                }

                const oldTitle = titleElement.textContent;

                updateProduct(oldTitle, newTitle, newPrice);

                localStorage.setItem(newTitle, newPrice);

                const newTitleElement = document.createElement("h5");
                newTitleElement.className = "product_title";
                newTitleElement.textContent = newTitle;

                const newPriceElement = document.createElement("p");
                newPriceElement.className = "product_price";
                newPriceElement.textContent = newPrice + " $";

                titleInput.replaceWith(newTitleElement);
                priceInput.replaceWith(newPriceElement);

                const editButton = listItem.querySelector(".edit_button");
                const saveButton = listItem.querySelector(".save_button");
                editButton.style.display = "inline-block";
                saveButton.style.display = "none";
            } else {
                console.error('titleElement is undefined');
            }
        } else if (event.target.classList.contains("delete_button")) {
            deleteItem(listItem);
        }
    });
});