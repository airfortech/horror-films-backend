const fetch = require("node-fetch");
const { apiKey, urlFilms } = require("../../config");
const { ProgressBar } = require("./progressBar");

class FetchFilms {
  constructor(options) {
    this.options = {
      genre: 27,
      languages: ["en"],
      yearFrom: 2022,
      yearTo: options.yearTo || options.yearFrom,
      ...options,
    };

    this.years = {
      from: Math.min(this.options.yearFrom, this.options.yearTo),
      to: Math.max(this.options.yearFrom, this.options.yearTo),
    };
    this.language = "en";
    this.page = 1;
    this.url = null;
    this.resultsFromPage = [];
    this.resultsFromPageMultilanguage = [];
    this.progressBar = new ProgressBar();
  }

  validateOptions() {
    const invalidParams = [];
    const params = Object.keys(this.options);
    for (const param of params) {
      if (!this.options[param]) invalidParams.push(param);
    }
    if (invalidParams.length > 0)
      throw new Error(
        "Invalid options: " +
          invalidParams.map(param => `"${param}"`).join(", ")
      );
  }

  generateUrl(year, page) {
    return `${urlFilms}?api_key=${apiKey}&with_genres=${this.options.genre}&language=${this.language}&primary_release_year=${year}&page=${page}`;
  }

  async countTotals(dataType, barDescription) {
    const totalCounts = this.years.to + 1 - this.years.from;
    this.progressBar.start(totalCounts, 1, barDescription);
    let totals = 0;
    for (let i = this.years.from; i <= this.years.to; i++) {
      this.url = this.generateUrl(i, 1);
      const response = await fetch(this.url);
      const data = await response.json();
      if (data?.status_code) {
        this.progressBar.end();
        throw new Error(data.status_message);
      }
      totals += data[dataType];
      this.progressBar.update();
    }
    this.progressBar.end();
    if (!totals) throw new Error("No films to fetch!");
    return totals;
  }

  async byYear(year) {
    this.url = this.generateUrl(year, this.page);
    const response = await fetch(this.url);
    const data = await response.json();
    if (data?.status_code) {
      this.progressBar.end();
      throw new Error(data.status_message);
    }
    if (data.results.length === 0) return;
    this.progressBar.update();
    const newFilms = data.results.map(film => {
      const { title, poster_path, backdrop_path, overview } = film;
      const obj = film;
      obj.title = {};
      obj.poster_path = {};
      obj.backdrop_path = {};
      obj.overview = {};
      obj.title[this.language] = title;
      obj.poster_path[this.language] = poster_path;
      obj.backdrop_path[this.language] = backdrop_path;
      obj.overview[this.language] = overview;
      return obj;
    });
    this.resultsFromPage = this.resultsFromPage.concat(newFilms);
    this.page++;
    await this.byYear(year);
  }

  async byYearMultilanguage(year) {
    for (const language of this.options.languages) {
      this.page = 1;
      this.language = language;
      await this.byYear(year);
      this.addOtherLanguage();
    }
  }

  async byYears() {
    const totalPages = await this.countTotals("total_pages", "Counting pages");
    const totalCounts = totalPages * this.options.languages.length;
    this.progressBar.start(totalCounts, 1, "Fetching films");
    for (let year = this.years.from; year <= this.years.to; year++) {
      await this.byYearMultilanguage(year);
    }
    this.progressBar.end();
    return this.resultsFromPageMultilanguage;
  }

  findFilmIndex(id) {
    return this.resultsFromPageMultilanguage.findIndex(film => film.id === id);
  }

  addOtherLanguage() {
    this.resultsFromPage.forEach(film => {
      const index = this.findFilmIndex(film.id);
      if (index < 0) this.resultsFromPageMultilanguage.push(film);
      else {
        const { title, poster_path, backdrop_path, overview } = film;
        this.resultsFromPageMultilanguage[index].title = {
          ...this.resultsFromPageMultilanguage[index].title,
          ...title,
        };
        this.resultsFromPageMultilanguage[index].poster_path = {
          ...this.resultsFromPageMultilanguage[index].poster_path,
          ...poster_path,
        };
        this.resultsFromPageMultilanguage[index].backdrop_path = {
          ...this.resultsFromPageMultilanguage[index].backdrop_path,
          ...backdrop_path,
        };
        this.resultsFromPageMultilanguage[index].overview = {
          ...this.resultsFromPageMultilanguage[index].overview,
          ...overview,
        };
      }
    });
    this.resultsFromPage = [];
  }
}

module.exports = { FetchFilms };
