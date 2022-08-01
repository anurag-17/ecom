const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthuser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthuser, processPayment);

router.route("/stripeapikey").get(isAuthuser, sendStripeApiKey);

module.exports = router;