const { writeFile } = require("fs").promises;
const { FetchFilms } = require("./fetchFilms");

async function saveJsonToFile(data) {
  try {
    await writeFile("./app/db/data/films.json", JSON.stringify(data), "utf8");
    console.log("File is saved.");
  } catch (error) {
    throw error;
  }
}

const getFilms = new FetchFilms({
  languages: ["en", "pl"],
  yearFrom: 1990,
  // yearTo: 1999,
  // genre: 80,
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
