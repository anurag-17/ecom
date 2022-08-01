const mongoose = require('mongoose')

const connnectDatabase = ()=>{
    mongoose.connect( process.env.Db_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((data)=>{
    console.log(`connection successfull with server ${data.connection.host} `)
})
}
module.exports = connnectDatabase