const jwt = require('jsonwebtoken')

const secret = "this is jwt hash phrase"

const createToken = (id, username) => {

    const maxAge = 60 * 60 * 24 // Seconds - Minutes - Hours = day
    return jwt.sign({id, username}, secret, {})

}

const validateUser = (req, res, next) => {

    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, secret, async (err, decodedToken) => {
            if(err){

                console.log(err.message);
                return res.json({ status: "failed", message: "invalid token" })

            }
            else{                
                res.json({ status: "ok", message: "validated" })
                next()
            }
        })

    }
    else{
        return res.json({ status: "failed", message: 'no token found' })
    }
    
}

module.exports = {
    createToken,
    validateUser
}