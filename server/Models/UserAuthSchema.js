const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minlength: [6, "Username is too short, it needs to be at least 6 characters"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a strong password"],
        minlength: [8, "Password is too short, it needs to be at least 8 characters"]
    },
    Cart: {
        type: [{}] 
    },
    createdAt: {
		type: Date,
		default: new Date().toISOString().split('T')[0]
	}
});

userSchema.pre('save', async function (next){
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;