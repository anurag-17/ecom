const ErrorHandler = require("../utils/errrorhandler");
const catchAsyncerror = require("./catchAsyncerror");
const jwt = require("jsonwebtoken")
const User= require("../models/userModel")
exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
    const {token} = await  req.cookies ; 

    if(!token){
        return next(new ErrorHandler("please login to access this resource",401))
    }

const decodeData = jwt.verify(token,process.env.JWT_SECRET)
req.user = await User.findById(decodeData.id)
next()
});


exports.authorizeRoles = (...roles)=>{

    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next ( new ErrorHandler(`Role: ${req.user.role} is not allowed  to access this resource`,403))
        }
        next();
    }
}


