const router = require("express").Router();
const Book = require("../models/Book.model.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET "/books" => Listar todos los titulos de los libros
// router.get("/books", (req, res, next) => {

//   // 1 Obtener los datos de los libros (solo titulos) como promesa
//   Book.find().select("title")
//   .then((listOfBooks) => {
//     // 2. renderizamos una vista hbs y le pasamos los libros
//     res.render("book/list.hbs", {
//       listOfBooks
//     })
//   })
//   .catch((err) => {
//     next(err)
//   })
//   // 3. visualizar los libros en la vista
// })

// GET "/books" => Listar todos los titulos de los libros
router.get("/books", async (req, res, next) => {
  // EJEMPLO CON ASYNC/AWAIT
  try {
    // 1 Obtener los datos de los libros (solo titulos) como promesa
    const listOfBooks = await Book.find().select("title")
    // 2. renderizamos una vista hbs y le pasamos los libros
    res.render("book/list.hbs", { listOfBooks})
    // 3. visualizar los libros en la vista
  } catch (err) {
    next(err)
  }
})

// GET "/books/:id/details" => Ver los detalles de un libro por su id
router.get("/books/:bookId/details", (req, res, next) => {

  // 0. obtener el id especifico del libro
  const {bookId} = req.params
  console.log(bookId) // :id
  // 1. obtener el obj de libro completo
  // .find pero que me retorne un obj
  Book.findById(bookId)
  .then((bookDetails) => {
    // 2. hacer vista, render de una vista y le pasamos la data

    res.render("book/details.hbs", {
      bookDetails
    })
    // 3. visualizar los detalles en la vista

  }).catch((err) => {
    next(err)
  })
})

// GET "/books/create" => Renderizar el formulario de crear libro
router.get("/books/create", (req, res, next) => {
  res.render("book/add-form.hbs")
})

// POST "/books/create" => recibir detalles de un libro y crearlo en la BD
router.post("/books/create", (req, res, next) => {
  // 1. es donde recibimos la data
  console.log("Accediendo a la RUTA!")
  console.log(req.body)
  const {title, description, author} = req.body
  // 2. creamos el libro en la DB
  Book.create({
    title,
    description,
    author
  })
  .then(() => {
    console.log("Libro creado")
    res.redirect("/books")
  })
  .catch((err) => {
    next(err)
  })

})

module.exports = router;
