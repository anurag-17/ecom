const express = require("express")
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile,getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController")
const {isAuthuser,authorizeRoles} = require("../middleware/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout)

router.route("/me").get(isAuthuser,getUserDetails)

router.route("/password/update").put(isAuthuser,updatePassword)
router.route("/me/update").put(isAuthuser,updateProfile)


router.route("/admin/users").get(isAuthuser,authorizeRoles("admin"),getAllUser)
router.route("/admin/user/:id").get(isAuthuser,authorizeRoles("admin"),getSingleUser).put(isAuthuser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthuser,authorizeRoles("admin"),deleteUser)


module.exports = router;