const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errrorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");
const apiFeatures = require("../utils/Features");

//create product  --Admin
exports.createProducts = catchAsyncerror(async (req, res, next) => {
  req.body.user = req.user.id;

  const products = await Product.create(req.body);
  res.status(201).json({
    success: true,
    products,
  });
});

//getAllProducts
exports.getAllProducts = catchAsyncerror(async (req, res,next) => {
  const resultPerPage =50;
  const productsCount = await Product.countDocuments();
  const apiFeature = new apiFeatures(Product.find(), req.query)
  .search()
  .filter()
  
  
  
  let products = await apiFeature.query 

  // let filteredProductsCount = products.length;
  
  // apiFeature.pagination(resultPerPage)

  // products = await apiFeature.query
  
  res.status(200).json({ 
    success: true, 
    products,
    productsCount ,
    resultPerPage,
    // filteredProductsCount,
  });

});

//Get Product Details
exports.getProductDetails = catchAsyncerror(async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

//Update Products

exports.updateProducts = catchAsyncerror(async (req, res) => {
  let products = await Product.findById(req.params.id);

  if (!products) {
    return next(new ErrorHandler("product not found", 404));
  }
  products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    products,
  });
});

//delete product

exports.deleteProducts = catchAsyncerror(async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("product not found", 404));
  }

  await products.remove();

  res.status(200).json({
    success: true,
    message: "product Delete Succesfully",
  });
});

//create new review or update the review

exports.createProductReview = catchAsyncerror(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a product

exports.getProductReviews = catchAsyncerror(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
  //Delete Reviews 

  exports.deleteReview  = catchAsyncerror(async (req, res, next) => {

const product  = await Product.findById(req.query.productId)

if(!product){
  return next(new ErrorHandler("Product not Found",404))
}

const reviews = product.reviews.filter(rev =>rev._id.toString() !==req.query.id.toString());

let avg = 0;
reviews.forEach((rev) => {
  avg += rev.rating;
});

  let ratings = 0;
  if(reviews.length ===0){
    ratings = 0
  }
  else{
const ratings = avg / reviews.length;
  }


const numOfReviews  = reviews.length;

await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  ratings,
  numOfReviews,

},
{

  new:true,
  runValidators:true,
  useFindAndModify:false,


})

res.status(200).json({
  success:true,
  
})

  })



