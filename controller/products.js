const Product = require('../models/Products');
const asyncWrapper = require('../middleware/async');

const getAllProducts = asyncWrapper( async (req,res) => {
    const products = await Product.find({});
    res.status(200).json({products});
});

const insertProduct = asyncWrapper( async (req,res) => {
    const result = await Product.create(req.body);
    res.status(201);
})


module.exports = {getAllProducts, insertProduct};