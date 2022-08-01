const ErrorHandler = require('../utils/errrorhandler')
const catchAsyncerror = require('../middleware/catchAsyncerror')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail= require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//register a user

exports.registerUser = catchAsyncerror(
    async(req,res,next)=>{ 

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })
        const{name,email,password} = req.body
        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        });
        sendToken(user,201,res)
    });

 //Login User
    exports.loginUser = catchAsyncerror(async(req,res,next)=>{
const {email,password} = req.body;
//checking if user inputs pw and email both
if(!email||!password){
    return next(new ErrorHandler("please enter email & password",400))
}
const user = await User.findOne({email}).select("+password")

if(!user){
    return next (new ErrorHandler("invalid email or password",401))
}

const isPasswordMatched = await user.comparePassword(password)

if(!isPasswordMatched){
    return next (new ErrorHandler("invalid email or password",401))
}


sendToken(user,200,res)

});

//Logout User
exports.logout = catchAsyncerror(async (req, res, next) => {
   await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
  

  //forgot password 
  exports.forgotPassword = catchAsyncerror(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("user not found ", 404))
    }

  
    //get resset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`
    const message = `your password reset token is:- \n\n${resetPasswordUrl}\n\n you have not requested this email then plese ignore it`
    try {
        await sendEmail({
            email: user.email,
            subject: `ecom password recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`
        })
    }
    catch (error) {
        user.getResetPassowordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))


    }
});
//reset Password
  exports.resetPassword = catchAsyncerror(async(req,res,next)=>{


    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},

    });

if(!user){
    return next( new ErrorHandler("reset Password Token is invalid or has been expired",400))
}

if(req.body.password !== req.body.confirmPassword){
    return next( new ErrorHandler(" password doesn't match",400))
}
user.password = req.body.password
// user.resetPasswordToken = undefined;
// user.resetPasswordExpire = undefined



await user.save()

sendToken(user,200,res)

  })



//   Get user details

exports.getUserDetails = catchAsyncerror(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });


//update User Password 

exports.updatePassword = catchAsyncerror(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
  
   
const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

if(!isPasswordMatched){
    return next (new ErrorHandler("Old password is incorrect",400))
}

if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not match",400))
}

user.password  = req.body.newPassword

await user.save()
 
sendToken(user,200,res)

  });


  //update user profile
  exports.updateProfile = catchAsyncerror(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
 
const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
})

res.status(200).json({
    success:true,
    
})

  });

//   Get All users (admin)

exports.getAllUser = catchAsyncerror(async(req,res,next)=>{

    const users  = await User.find()

    res.status(200).json({
        success:true,
        users,
    })
})

//   Get single user (Admin)
exports.getSingleUser= catchAsyncerror(async(req,res,next)=>{

    const user  = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user does not exist with  id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user,
    })
});


//update user role --Admin

exports.updateUserRole = catchAsyncerror(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role:req.body.role,
    };
 
const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
})

res.status(200).json({
    success:true,
    
})

  });


  //delete  User  --Admin
exports.deleteUser = catchAsyncerror(async (req, res, next) => {
 
const user  = await User.findById(req.params.id)

if(!user){
    return next (new ErrorHandler(`user does not exist with id:${req.params.id}`))
}

await user.remove()

res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
    
})

  });


