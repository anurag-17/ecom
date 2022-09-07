const app = require("./app")
const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
const path = require("path");
const express = require("express");


const connectDatabase = require("./config/database")

//Handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to uncaught exception`)
    process.exit(1)
})

//config
dotenv.config({path:"./config/config.env"})


//connecting  to database
connectDatabase()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection error
// --------------------------deployment------------------------------
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }
  ("hi");
  
  // --------------------------deployment------------------------------

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
});