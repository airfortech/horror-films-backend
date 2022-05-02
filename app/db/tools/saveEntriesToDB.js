const { ProgressBar } = require("./progressBar");
const { Film } = require("../models/Film");

async function saveEntriesToDB(films) {
  const progressBar = new ProgressBar();
  try {
    progressBar.start(films.length, 1, "Creating database");
    for (const film of films) {
      const entry = await Film.findOne({ id: film.id });
      if (entry) {
        await entry.updateOne({ ...film });
      } else await new Film({ ...film }).save();
      progressBar.update();
    }
    progressBar.end();
  } catch (error) {
    progressBar.end();
    throw error;
  }
}

module.exports = { saveEntriesToDB };
