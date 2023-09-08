const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"],
        min: [1, "The Price should be bigger than 0"]
    },
    image: {
        type: String,
        required: [true, "Please enter image"]
    },
    type: {
        type: String,
        enum: ['t-shirt', 'jeans', 'hat', 'shorts', 'shoes'],
        required: [true, "Please choose the type"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, "Please choose the Gender"]
    },
    createdAt: {
		type: Date,
		default: new Date().toISOString().split('T')[0]
	}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post