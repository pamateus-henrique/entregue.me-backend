const express = require('express');
const router = express.Router();

const {
    getAllProducts, insertProduct
} = require('../controller/products');

router.get('/', getAllProducts);

router.post('/', insertProduct);

module.exports = router;