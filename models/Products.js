const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'product price is required']
    },

    description: {
        type: String,
        trim: true
    },

    image: {
        type: String
    },

    category: {
        type: String,
        enum: {
            values: ['bebida', 'pizzas'],
            message: ['this is not a valid type of category']
        },
        required: [true, 'category is required']
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', ProductSchema);