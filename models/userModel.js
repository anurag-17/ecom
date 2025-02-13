const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name can not exceed 30 characters "],
        minLength:[4,"Name should have more than 4 character"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a  valid Email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should have more than 8 character"],
        select:false

    },

 
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
    type:Date,
    default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
if(!this.isModified("password")){
next()
}
this.password = await bcrypt.hash(this.password,10)

});

//JWT TOKEN 
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},
        process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRE,
        })
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword){

    return await  bcrypt.compare(enteredPassword,this.password)

};

//Generating Password Reset Token
 userSchema.methods.getResetPasswordToken = function(){

//genrating token

const resetToken = crypto.randomBytes(20).toString("hex")


//hashing and adding resetPassword token to user schema
this.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");

this.resetPasswordExpire  = Date.now()+ 15 *60 *1000;
return resetToken;

 };

module.exports = mongoose.model("UserSchema",userSchema)