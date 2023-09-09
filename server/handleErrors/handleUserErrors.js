const HandleUserError = (err) => {
    let message = ''

    const errorCodeForUserNameIsNotUnique = 11000

    if(err.code === errorCodeForUserNameIsNotUnique){
        message = "username is not valid" 
        return message
    }
    
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(error => {
            message = error.properties.message 
        })
    }
    else{   
        console.log(err)
        message = "Something is wrong"
    }
    return message
}

module.exports = HandleUserError
