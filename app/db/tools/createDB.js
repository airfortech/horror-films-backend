const mongoose = require("mongoose");
const { FetchFilms } = require("./fetchFilms");
const { saveEntriesToDB } = require("./saveEntriesToDB");
const { connectToDB } = require("../mongoose");
const { languagesToFetch, yearFrom, yearTo, genre } = require("../../config");

const getFilms = new FetchFilms({
  languages: languagesToFetch || ["en"],
  yearFrom: yearFrom || 2022,
  yearTo: yearTo || yearFrom || 2022,
  genre: genre,
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
