const { writeFile } = require("fs").promises;
const { FetchFilms } = require("./fetchFilms");
const { languagesToFetch, yearFrom, yearTo, genre } = require("../../config");

async function saveJsonToFile(data) {
  try {
    await writeFile("./app/db/data/films.json", JSON.stringify(data), "utf8");
    console.log("File is saved.");
  } catch (error) {
    throw error;
  }
}

const getFilms = new FetchFilms({
  languages: languagesToFetch || ["en"],
  yearFrom: yearFrom || 2022,
  yearTo: yearTo || yearFrom || 2022,
  genre: genre,
});

(async function () {
  try {
    getFilms.validateOptions();
    const data = await getFilms.byYears();
    saveJsonToFile(data);
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
})();
