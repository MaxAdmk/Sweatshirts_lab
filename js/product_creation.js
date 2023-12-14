const form = document.getElementById("add_form");
const itemList = document.getElementById("items-container");
export const itemMap = new Map();

function addItemToStorage(title, price) {
    if (title && price) {
        itemMap.set(title, price);
        localStorage.setItem(title, price);
    } else {
        alert("Будь ласка, заповніть обидва поля (Title та Price).");
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("title_input");
    const priceInput = document.getElementById("price_input");

    const title = titleInput.value;
    const price = priceInput.value;

    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, price }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    if (!/^\d+$/.test(price)) {
        alert("Поле Price повинно містити лише цифри.");
        return;
    }

    if (!/^[a-zA-Z]+$/.test(title)) {
        alert("Поле Title повинно містити лише букви.");
        return;
    }

    addItemToStorage(title, price); 

    titleInput.value = "";
    priceInput.value = "";
    
});