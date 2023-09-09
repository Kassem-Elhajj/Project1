const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../Models/UserAuthSchema')

const router = express.Router()
const HandleUserError = require('../handleErrors/handleUserErrors')
const {createToken, validateUser} = require('../Helpers/token')


const secret = "this is jwt hash phrase"


router.post('/signup', async (req, res) => {
    const {username, password, reenteredPassword} = req.body
    if(!username){
        res.json({status: 'failed', message: 'Please enter your username'})
    }else{
        if(password === reenteredPassword){
            try{
                const user = await User.create({username, password})
	            const token = await createToken(user._id, user.username)
                res.cookie('jwt', token)
                res.json({status: 'ok', userId: user._id, username: user.username})
            }catch(err){
                res.json({status: 'failed', message: HandleUserError(err)})
            }
        }else{
            if(!password)
                res.json({status: 'failed', message: 'Please enter you password'})
            else
                res.json({status: 'failed', message: 're-entered password is wrong'})
        }
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username}).lean()
    //const maxAge = 60 * 60 * 24

    if(!user){
        res.json({staus: 'failed', message: 'The user is invalid'})
    }
    else{
        if(password && await bcrypt.compare(password, user.password)){
	        const token = await createToken(user._id, user.username)
            await res.cookie('jwt', token) //,{ httpOnly: true, maxAge: maxAge })
            res.json({userId: user._id, username: user.username})
        }else{
            res.json({status: 'failed', message: 'Something went wrong'})
        }
    }

})

router.get('/profile', (req, res) => {
    token = req.cookies.jwt
    if(token){
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    }
    else{
        res.json('')
    }
})

router.post('/AddToCart', async (req, res) =>{

    const {userId, PostId} = req.body

    try{
        const user = await User.findById(userId)
        let PostsId = []
        for(let i = 0 ; i < user.Cart.length; i++){
            PostsId.push(user.Cart[i].PostId)
        }

        if(PostsId.includes(PostId)){
            res.json({status: 'failed', message: 'You already added this item to your Cart!'})
        }else{
            const response = await User.findByIdAndUpdate(userId, {
                $push: {Cart: {PostId: PostId, quantity: 1}}
            })
            res.json({status: 'ok', message: 'Added to Cart'})
        }

    }catch(err){
        res.json({status: 'failed', message: err.message})
        console.log(err.message)
    }

})

router.post('/ChangeQuantity', async (req, res) =>{

    const {userId, operator, index} = req.body
    let value = 0

    if(operator === '+'){
        value = 1
    }else{
        value = -1
    }

    try{

        const user = await User.findById(userId)
        let cart = user.Cart

        cart[index].quantity += value

        if(cart[index].quantity <= 0){

            cart[index].quantity += 1
            res.json({status: 'failed', message: 'Click the trash button to delete the order!'})

        }else{

            const response = await User.findByIdAndUpdate(userId, {
                Cart: cart
            })
    
            res.json({status: 'ok', quantity: cart[index].quantity})
        }

    }catch(err){
        res.json({status: 'failed', message: err.message})
    }


})

router.post('/DeleteFromCart', async (req, res) => {

    const {userId, PostId} = req.body

    try{
        const response = await User.findOneAndUpdate({_id: userId}, {
            $pull: {Cart: {PostId: PostId}}
        })
        res.json({status: 'ok', message: 'Deleted From the Cart'})
    }catch(err){
        res.json({status: 'failed', message: err})
    }

})

router.get('/getUser/:id', async (req, res) => {

    const userId = req.params.id

    try{
        const response = await User.findById(userId)
        res.json({status: 'ok', user: response})
    }catch(err){
        if(userId === 'undefined'){
            res.json({status: 'failed', message: "undefined id"})
        }else{
            res.json({status: 'failed', message: err})
        }
    }
    
})

router.post('/ChangePassword/:id', async (req, res) => {

    const userId = req.params.id
    let {password, reenteredPassword} = req.body

    if(password === reenteredPassword){
        if(password.length >= 8){
            try{

                const salt = await bcrypt.genSalt()
                password = await bcrypt.hash(password, salt)

                const response = await User.findByIdAndUpdate(
                    userId,
                    {password: password}
                )

                res.json({status: 'ok', message: 'Password has been updated'})

            }catch(err){
                res.json({status: 'failed', message: err })
            }
        }else{
            res.json({status: 'failed', message: "Password should be 8 character or more!"})
        }
    }else{
        res.json({status: 'failed', message: 're-entered password is wrong'})
    }

})


router.delete('/logout', async (req, res) => {
    await res.cookie('jwt', '', { maxAge: 1 })
    res.json({ status: "ok", message: "removed jwt" })
})

router.delete('/DeleteAccount/:id', async (req, res) => {

    userId = req.params.id

    try{
        await res.cookie('jwt', '', { maxAge: 1 })
        const response = await User.findByIdAndDelete(userId)
        res.json({status: 'ok', message: "Account is deleted"})
    }catch(err){
        console.log(err)
    }

})



module.exports = router