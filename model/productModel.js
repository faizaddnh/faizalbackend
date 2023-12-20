const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema(
    {
        name: { type: String },
        brand: { type: String },
        model: { type: String },
        category: { type: String },
        description: { type: String },
        price: { type: Number },
        image: { type: String },
        countInStock: { type: Number },
    },
    {
        timestamps: true,

    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;