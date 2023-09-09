const express = require('express')

const Post = require('../Models/PostSchema')
const handlePostError = require('../handleErrors/handlePostErrors')
const router = express.Router()


router.post('/post', async (req, res) => {
    const {title, price, image, type, gender} = req.body
    try{
        const post = await Post.create({title, price, image, type, gender})
        res.json({status: 'ok', message: 'post has been added'})
    }
    catch(err){
        res.json({status: 'failed', message: handlePostError(err)})
    }
})

router.post('/posts/:id', async (req, res) => {
    
    let param = req.params.id
    let {type} = req.body

    if(type === ''){
        type = 'ok'
    }

    if(param === 'all'){
        const posts = await Post.find({})
        res.json({status: 'ok', posts: posts})
    }
    else{
        if(type === 'ok'){
            const posts = await Post.find({ gender: param})
            res.json({status: 'ok', posts: posts})
        }else{
        const posts = await Post.find({ gender: param , type: type})
        res.json({status: 'ok', posts: posts})
        }
    }
})

router.post('/getPost', async (req, res) => {
    
    const {carts} = req.body
    let posts = []
    let quantities = []
    let response = ''
    let price = 0

    try{
        for(let i = 0; i < carts.length; i++){
            response = await Post.findById(carts[i].PostId)
            posts.push(response)
            quantities.push(carts[i].quantity)
            price += response.price * quantities[i]
        }
        res.json({status : 'ok', posts: posts, quantities: quantities, price: price})
    }catch(err){
        res.json({status: 'failed', message: err})
        console.log(`error: ${err}`)
    }
    
})

router.delete('/Delete/:id', async (req, res) => {

    const PostId = req.params.id

    try{
        const response = await Post.findByIdAndDelete(PostId)
        res.json({status: 'ok', message: 'Post has been deleted'})
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
    
})

module.exports = router