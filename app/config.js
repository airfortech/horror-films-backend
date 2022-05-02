require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || "mongodb://localhost:27017/films-db",
  apiKey: process.env.API_KEY || "getYourOwnKey",
  urlFilmDetails: "https://api.themoviedb.org/3/movie",
  urlFilms: "https://api.themoviedb.org/3/discover/movie",
  resultsPerPage: 12,
  imgBaseUrl: "https://image.tmdb.org/t/p/",
  imgSize: {
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w300: "w300",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    w1280: "w1280",
    original: "original",
  },
};
