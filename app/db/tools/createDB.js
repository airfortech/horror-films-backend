const mongoose = require("mongoose");
const { FetchFilms } = require("./fetchFilms");
const { saveEntriesToDB } = require("./saveEntriesToDB");
const { connectToDB } = require("../mongoose");

const getFilms = new FetchFilms({
  languages: ["en", "pl"],
  yearFrom: 1980,
  // yearTo: 1999,
  // genre: 80,
});

async function createDB() {
  try {
    getFilms.validateOptions();
    await connectToDB();
    const films = await getFilms.byYears();
    await saveEntriesToDB(films);
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  } finally {
    mongoose.connection.close();
  }
}

createDB();
