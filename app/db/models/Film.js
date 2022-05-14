const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  original_title: { type: String, required: true },
  title: { type: Object, required: true },
  original_language: { type: String, required: true },
  adult: { type: Boolean, required: true },
  backdrop_path: { type: Object, required: true },
  genre_ids: { type: Array, required: true },
  overview: { type: Object, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: Object, required: true },
  release_date: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
});

filmSchema.query.byTitle = function (title, language, sort_by, sort_type) {
  const titleQuery = "title." + language;
  const sortBy = {
    ascending: 1,
    descending: -1,
  };
  const sortTitle = sort_by === "title" ? titleQuery : sort_by;
  return this.find({
    [titleQuery]: { $regex: `${title}`, $options: "i" },
  }).sort({ [sortTitle]: sortBy[sort_type] });
};

const Film = mongoose.model("Film", filmSchema);

module.exports = { Film };
