const fetch = require("node-fetch");
const { apiKey, urlFilmDetails, resultsPerPage } = require("../../config");
const { Film } = require("../../db/models/Film");

class FilmsController {
  async getFilm(req, res) {
    try {
      const id = req.params.id;
      const language = req.query.language || "en";
      const url = `${urlFilmDetails}/${id}?api_key=${apiKey}&language=${language}`;
      const response = await fetch(url);
      const film = await response.json();
      if (film.success === false) {
        console.log("No film " + id);
        res.status(404).json({ error: `Details for film not found.` });
      } else res.status(200).json(film);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Database is not responding. Try again later." });
    }
  }

  async getFilms(req, res) {
    try {
      const queries = {
        title: req.query.title.trim() || "",
        sort_type: req.query.sort_type || "ascending",
        sort_by: req.query.sort_by || "title",
        page: req.query.page || "1",
        language: req.query.language || "en",
      };
      const { title, language, sort_type, sort_by, page } = queries;

      const filmsCount = await Film.find()
        .byTitle(title, language, sort_by, sort_type)
        .count();
      const pages = Math.ceil(filmsCount / resultsPerPage) || 1;
      let currentPage = Math.max(
        page * resultsPerPage > filmsCount ? pages : page,
        1
      );
      const films = (
        await Film.find()
          .byTitle(title, language, sort_by, sort_type)
          .skip((currentPage - 1) * resultsPerPage)
          .limit(resultsPerPage)
      ).map(film => {
        return {
          id: film.id,
          original_title: film.original_title,
          title: film.title[language],
          overwiew: film.overview[language],
          release_date: film.release_date,
          popularity: film.popularity,
          vote_average: film.vote_average,
          poster_path: film.poster_path[language],
          backdrop_path: film.backdrop_path[language],
        };
      });

      res
        .status(200)
        .json({ count: filmsCount, pages, page: Number(currentPage), films });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Database is not responding. Try again later." });
    }
  }
}

module.exports = new FilmsController();
