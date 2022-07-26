const router = require("express").Router();
const Author = require("../models/Author.model.js");

// GET "/author/create" => renderizar un formulario de creacion de autor al cliente
router.get("/create", (req, res, next) => {
  res.render("author/add-form.hbs")
})

// POST "/author/create" => crear un autor en la DB
router.post("/create", (req, res, next) => {

  const { name, country, yearBorn } = req.body
  console.log(req.body)

  Author.create({
    name,
    country,
    yearBorn
  })
  .then(() => {
    res.redirect("/")
  })
  .catch((err) => {
    next(err)
  })
})

// GET "/author" => Listar todos los autores
router.get("/", (req, res, next) => {

  // 1. buscar todos los autores
  Author.find()
  .then((allAuthors) => {

    // 2. renderizarlos en una vista
    res.render("author/list.hbs", {
      allAuthors
    })
  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router;