const fetch = require("node-fetch");
const { apiKey, urlFilmDetails, resultsPerPage } = require("../../config");
const { Film } = require("../../db/models/Film");

class FilmsController {
  async getFilm(req, res) {
    try {
      const fetchData = async url => {
        let result = await fetch(url);
        if (result.json) return await result.json();
      };
      const id = req.params.id;
      const language = req.query.language || "en";
      const numberOfBackdrops = req.query.backdrops || 10;
      const numberOfPosters = req.query.posters || 10;
      const numberOfCast = req.query.cast || 10;
      /* main */
      const url1 = `${urlFilmDetails}/${id}?api_key=${apiKey}&language=${language}`;
      /* main english */
      const url2 = `${urlFilmDetails}/${id}?api_key=${apiKey}`;
      /* videos */
      const url3 = `${urlFilmDetails}/${id}/videos?api_key=${apiKey}&language=${language}`;
      /* videos english */
      const url4 = `${urlFilmDetails}/${id}/videos?api_key=${apiKey}`;
      /* images */
      const url5 = `${urlFilmDetails}/${id}/images?api_key=${apiKey}`;
      /* credits */
      const url6 = `${urlFilmDetails}/${id}/credits?api_key=${apiKey}`;

      const allPromise = Promise.all([
        fetchData(url1),
        fetchData(url2),
        fetchData(url3),
        fetchData(url4),
        fetchData(url5),
        fetchData(url6),
      ]);
      const values = await allPromise;

      if (values[1].success === false) {
        res.status(404).json({ error: `Details for film not found.` });
        return;
      }

      const {
        title,
        original_title,
        overview,
        vote_average,
        vote_count,
        popularity,
        release_date,
        tagline,
        budget,
        revenue,
        genres,
        runtime,
        poster_path,
      } = values[0];
      const { overview: overview_en, poster_path: poster_path_en } = values[1];
      const { results: videos } = values[2];
      const { results: videos_en } = values[3];
      const { backdrops, posters } = values[4];
      const { cast, crew } = values[5];

      const result = {
        id,
        title,
        original_title,
        overview,
        overview_en,
        vote_average,
        vote_count,
        popularity,
        release_date,
        tagline,
        budget,
        revenue,
        genres: genres.map(({ name }) => name),
        runtime,
        poster_path: poster_path ? poster_path : poster_path_en,
        video_url: videos_en.length > 0 ? videos_en[0].key : null,
        backdrops: backdrops
          .slice(0, numberOfBackdrops)
          .map(({ file_path }) => file_path),
        posters: posters
          .slice(0, numberOfPosters)
          .map(({ file_path }) => file_path),
        cast: cast
          .slice(0, numberOfCast)
          .map(({ id, name, profile_path, original_name, character }) => ({
            id,
            name,
            original_name,
            character,
            profile_path,
          })),
        directors: crew
          .filter(({ job }) => job === "Director")
          .slice(0, 3)
          .map(({ id, name, profile_path, original_name }) => ({
            id,
            name,
            original_name,
            profile_path,
          })),
        screenplay: crew
          .filter(({ job }) => job === "Screenplay" || job === "Writer")
          .slice(0, 3)
          .map(({ id, name, profile_path, original_name }) => ({
            id,
            name,
            original_name,
            profile_path,
          })),
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      console.log(error);
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
