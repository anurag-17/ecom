const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errrorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");

//Create new Order
exports.newOrder = catchAsyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,
  })

  res.status(201).json({
    success:true,
    order,
  })
});


//get Single order 

exports.getSingleOrder = catchAsyncerror(async(req,res,next)=>{

const order = await Order.findById(req.params.id).populate("user","name email")

if(!order){
    return next(new ErrorHandler("order not found with this id",404))
}
res.status(200).json({
    success:true,
    order,
})


});


//get Logged in user orders

exports.myOrders = catchAsyncerror(async(req,res,next)=>{

const orders = await Order.find({user:req.user._id})

res.status(200).json({
    success:true,
    orders,
})


});



//get All orders --Admin

exports.getAllOrders = catchAsyncerror(async(req,res,next)=>{

const orders = await Order.find();


let totalAmount = 0;

orders.forEach(order=>{
   
    totalAmount+= order.totalPrice
})

res.status(200).json({
    success:true,
    totalAmount,
    orders,
})

});


//update order status --Admin

exports.updateOrder = catchAsyncerror(async(req,res,next)=>{

const order = await Order.findById(req.params.id);


if(!order){
    return next(new ErrorHandler("order not found with this id ",404))
}


if(order.orderStatus ==="Delivered"){
    return next(new ErrorHandler("you have already delevred this order",400))
}

order.orderItems.forEach( async(o)=>{
    await updateStock(o.product,o.quantity)
});

order.orderStatus = req.body.status;

if(req.body.status ==="Delivered"){
    order.deliveredAt  = Date.now()
}
await order.save({validateBeforeSave:false})
res.status(200).json({
    success:true,
 
})

});


async function updateStock(id,quantity){

    const product = await Product.findById(id);

    product.Stock = product.Stock-quantity
    
    await product.save({validateBeforeSave:false})
}


//delete Order --Admin

exports.deleteOrder = catchAsyncerror(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);
    
if(!order){
    return next(new ErrorHandler("order not found with this id ",404))
}

order.remove()
    
    res.status(200).json({
        success:true,
    
    })
    
    });