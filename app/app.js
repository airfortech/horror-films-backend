const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api", require("./routes/api"));

module.exports = app;

// https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${this.options.genre}&language=${this.language}&primary_release_year=${year}&page=${page}

// detailed film
// localhost:3001/api/film/343611?language=pl

// wyszukiwanie api
// http://localhost:3001/api/films/?sort_type=descending&sort_by=release_date&page=89&title=vampire&language=pl

// routy:
// https://localhost/?title=vampire&sort_type=ascending&sort_by=title&page=2&film=234234

// title
// sort_type = ascending, descending
// sort_by = title, release_date, vote_average, popularity
// page
// film - current film with details

// wyszukiwanie filmow ma zwracac tablice filmow, aktualna strone i ilosc stron
