const express =  require("express")
const app = express()
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cors  = require("cors")
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.json())
const dotenv = require("dotenv")

//config
dotenv.config({path:"./config/config.env"})

//Route Imports

const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

//middleware for error handling

app.use(errorMiddleware)
module.exports = app