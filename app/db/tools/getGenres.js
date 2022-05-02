const fetch = require("node-fetch");
const { apiKey } = require("../../config");
const { tableLog } = require("../../helpers/tableLog");

async function getGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    const genres = data.genres.map(genre => {
      const obj = {};
      obj.genre = genre.name;
      obj.id = genre.id;
      return obj;
    });
    tableLog(genres);
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
}

getGenres();
