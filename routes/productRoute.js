// productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    res.send(product);
});

router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
});

router.put('/products/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        res.status(404).send('Product not found');
        return;
    }
    res.send(updatedProduct);
});

router.delete('/products/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        res.status(404).send('Product not found');
        return;
    }
    res.send('Product deleted successfully');
});

module.exports = router;
