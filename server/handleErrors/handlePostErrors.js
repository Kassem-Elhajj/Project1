const handlePostError = (err) => {
    let message = ''

    if(err.message.includes('Post validation failed')){
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

module.exports = handlePostError