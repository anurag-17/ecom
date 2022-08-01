const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router()
const {isAuthuser,authorizeRoles} = require("../middleware/auth")


router.route("/order/new").post(isAuthuser,newOrder)
router.route("/order/:id").get(isAuthuser,getSingleOrder)
router.route("/orders/me").get(isAuthuser,myOrders)
router.route("/admin/orders").get(isAuthuser,authorizeRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthuser,authorizeRoles("admin"),updateOrder)
.delete(isAuthuser,authorizeRoles("admin"),deleteOrder)


module.exports = router;