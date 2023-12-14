const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productMap = new Map();

app.post('/api/products', (req, res) => {
    const { title, price } = req.body;

    if (!title || !price || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    productMap.set(title, parseFloat(price));

    res.status(201).json({ message: 'Product added successfully' });
});

app.get('/api/products', (req, res) => {
    const products = Array.from(productMap.entries()).map(([title, price]) => ({ title, price }));
    res.status(200).json(products);
});

app.get('/api/products/:title', (req, res) => {
    const title = req.params.title;
    const price = productMap.get(title);

    if (price === undefined) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ title, price });
});

app.delete('/api/products/:title', (req, res) => {
    const title = req.params.title;

    if (!productMap.has(title)) {
        return res.status(404).json({ error: 'Product not found' });
    }

    productMap.delete(title);

    res.status(200).json({ message: 'Product deleted successfully' });
});

app.put('/api/products/:oldTitle', (req, res) => {
    const oldTitle = req.params.oldTitle;
    const { newTitle, newPrice } = req.body;

    console.log('Received PUT request:', { oldTitle, newTitle, newPrice });

    if (!productMap.has(oldTitle)) {
        console.log('Product not found');
        return res.status(404).json({ error: 'Product not found' });
    }

    productMap.delete(oldTitle);
    productMap.set(newTitle, parseFloat(newPrice));

    console.log('Product updated successfully');
    res.status(200).json({ message: 'Product updated successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

