
const mongoose = require("mongoose");

const connnectDatabase = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongodb connected");
};

module.exports = connnectDatabase;
