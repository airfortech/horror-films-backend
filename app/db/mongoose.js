const mongoose = require("mongoose");
const { database } = require("../config");

async function connectToDB() {
  try {
    await mongoose.connect(database, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("Connected to db.");
  } catch (error) {
    throw error;
  }
}

module.exports = { connectToDB };
