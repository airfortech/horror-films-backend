const express = require("express");
const router = new express.Router();
const FilmsController = require("../controllers/api/FilmsController");

router.get("/films/:id", FilmsController.getFilm);
router.get("/films/", FilmsController.getFilms);

module.exports = router;
