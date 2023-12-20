const express = require('express');
const Product = require('../model/productModel')
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const data = await Product.find({});
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
});

productRouter.get('/:id', async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error.message);
    }
});

productRouter.post('/', async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            countInStock: req.body.countInStock,
            category: req.body.category,
            model: req.body.model,
        });
        const product = await newProduct.save();
        res.send({
            name: product.name,
            brand: product.brand,
            image: product.image,
            price: product.price,
            description: product.description,
            countInStock: product.countInStock,
            category: product.category,
            model: product.model,
        });
    } catch (err) {
        res.send(err.message)
    }
});

productRouter.delete('/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    } catch (err) {
        res.json(err);
    }
});


productRouter.put('/quantity/:id', async (req, res) => {
    const id = req.params.id;
    const updateCountInStock = req.body;
    const filter = { _id:id };
    const options = { upsert: true };
    const updateDoc = { $inc: { 'countInStock': 1 } };
    const result = await Product.findOneAndUpdate(filter, updateDoc, options).exec()
    res.send(result);
});

productRouter.put('/quantitydecrement/:id', async (req, res) => {
    const id = req.params.id;
    const updateCountInStock = req.body;
    const filter = { _id:id };
    const options = { upsert: true };
    const updateDoc = { $inc: { 'countInStock': -1 } };
    const result = await Product.findOneAndUpdate(filter, updateDoc, options).exec()
    res.send(result);
});




module.exports = productRouter;  