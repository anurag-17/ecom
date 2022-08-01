const express = require("express");
const {  getAllProducts, createProducts, updateProducts, deleteProducts, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController")
const {isAuthuser,authorizeRoles} = require("../middleware/auth")

const router = express.Router()

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthuser,authorizeRoles("admin"),createProducts)

router.route("/admin/products/:id")
.put(isAuthuser,authorizeRoles("admin"),updateProducts)
.delete(isAuthuser,authorizeRoles("admin"),deleteProducts)

router.route("/products/:id").get(getProductDetails)
router.route("/review").put(isAuthuser,createProductReview)

router.route("/reviews")
.get(getProductReviews)
.delete(isAuthuser,deleteReview)


// router.route("/product/delete/:id")
module.exports = router