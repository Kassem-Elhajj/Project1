const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const app = express()
const PORT = process.env.PORT || 3500

//initialize the route path
const User = require('./Models/UserAuthSchema')

const userAuthRoute = require('./Routes/UserAuth')
const post = require('./Routes/Post')

//cors helps connect to front-end
app.use(cors({
    origin: `http://localhost:3000`,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));


//1-recieve json objects  
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' })) //so that I can send the image 64bits(large) from front to backend
app.use(cookieParser())


//Use the Routes
app.use('/user', userAuthRoute)
app.use('/', post)


const MONGODB_URI = `mongodb+srv://kassem-elhajj:kassemabc@kassem-elhajj.po92fjy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Mongo DB") 
    app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}/`))
})
.catch(error => console.error('Error connecting to MongoDB:', error));

