const mongoose = require("mongoose");
const { connectToDB } = require("../mongoose");

async function testConnectionToDB() {
  try {
    await connectToDB();
    console.log("All was fine.");
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  } finally {
    mongoose.connection.close();
  }
}

testConnectionToDB();
