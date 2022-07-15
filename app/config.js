require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  frontEndHost: "http://localhost:3000",
  database: process.env.DATABASE || "mongodb://localhost:27017/films-db",
  apiKey: process.env.API_KEY || "getYourOwnKey",
  urlFilmDetails: "https://api.themoviedb.org/3/movie",
  urlFilms: "https://api.themoviedb.org/3/discover/movie",
  resultsPerPage: 12,
  imgBaseUrl: "https://image.tmdb.org/t/p/",
  languagesToFetch: ["en", "pl"],
  yearFrom: 1980,
  yearTo: 1981,
  genre: 27,
};
