const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aurimasvidutis:tE9GL1VSBuWKzoSp@cluster0.ky9mptq.mongodb.net/clientsDb?retryWrites=true&w=majority"
    );
    console.log("Connection to mongoDB is successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
