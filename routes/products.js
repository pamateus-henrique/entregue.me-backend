const express = require('express');
const router = express.Router();

const {
    getProducts, getSingleProduct, insertProduct
} = require('../controller/products');

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.post('/', insertProduct);

module.exports = router;