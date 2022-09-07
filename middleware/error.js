const ErrorHandler = require("../utils/errrorhandler")

module.exports = (err,req,res,next)=>{
err.statusCode = err.statusCode||500
err.message = err.message || 'internal server error'


//mongodb wrong id  error
if(err.name ==='CastError'){
    const message =`Resource not Found Invalid:${err.path}`
    err = new ErrorHandler (message,400)
}


//mongoose duplicate key error

if(err.code ===11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler (message,400)


}

//wrong jwt error 
if(err.name == "jsonWebTokenError"){
    const message = `json Web Token is invalid , try again`
    err = new ErrorHandler (message,400)

}

//jwt expire error
if(err.name == "TokenExpiredError"){
    const message = `json Web Token is Expired, try again`
    err = new ErrorHandler (message,400)

}

res.status(err.statusCode).json({
    success:false,
    error:err.stack,
    message:err.message

})
}