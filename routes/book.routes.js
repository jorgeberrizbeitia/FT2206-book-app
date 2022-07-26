const router = require("express").Router();
const Book = require("../models/Book.model.js")
const Author = require("../models/Author.model.js")
const uploader = require("../middleware/uploader.js")

// aqui iran nuestras rutas de libros
// GET "/books" => Listar todos los titulos de los libros
// router.get("/", (req, res, next) => {

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
router.get("/", async (req, res, next) => {
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
router.get("/:bookId/details", (req, res, next) => {

  // 0. obtener el id especifico del libro
  const {bookId} = req.params
  console.log(bookId) // :id
  // 1. obtener el obj de libro completo
  // .find pero que me retorne un obj
  Book.findById(bookId).populate("author")
  .then((bookDetails) => {
    console.log(bookDetails)
    // populate
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
router.get("/create", async (req, res, next) => {

  try {
    // 1. buscar todos los autores
    const allAuthors = await Author.find().select("name")
  
    // 2. pasarlos a la vista
    res.render("book/add-form.hbs", {allAuthors})
  } catch (err) {
    next(err)
  }

})

// POST "/books/create" => recibir detalles de un libro y crearlo en la BD
router.post("/create", (req, res, next) => {
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

// GET "/books/:bookId/edit" => renderizar un formulario de editar un libro
router.get("/:bookId/edit", (req, res, next) => {
  const { bookId } = req.params
  console.log(bookId)
  // 1. buscar un libro en la base de datos (tenemos el id)
  Book.findById(bookId)
  .then((datosDeLibro) => {
    // 2. pasar ese libro a la vista edit-form.hbs
    res.render("book/edit-form.hbs", {
      datosDeLibro
    })
  })
  .catch((err) => {
    next(err)
  })

})

// POST "/books/:bookId/edit" => recibir la data a editar y actualizar el libro en la BD
router.post("/:bookId/edit", (req, res, next) => {

  // 1. recibir el id a utilizar
  const { bookId } = req.params

  // 2. recibir la data a edit del libro
  const { title, description, author } = req.body

  // 3. Metodo para actualizar el libro en la BD
  Book.findByIdAndUpdate(bookId, {
    title: title,
    description,
    author
  })
  .then((updatedBook) => {
    // 4. redireccion a "/books"
    // res.redirect("/books")
    res.redirect(`/books/${updatedBook._id}/details`)
  })
  .catch((err) => {
    next(err)
  })
})

// POST "/books/:bookId/delete" => borrar un libro por su id
router.post("/:bookId/delete", async (req, res, next) => {
  try {
    // 1. recibir el id a borrar
    const { bookId } = req.params
  
    // 2. usar metodo para borrar
    // await Book.findByIdAndDelete(bookId)
    const deletedBook = await Book.findByIdAndDelete(bookId)
    
    // 3. redireccionar a otra ruta
    // res.redirect("/books")
    res.render("book/final-delete.hbs", {deletedBook})

  } catch (err) {
    next(err)
  }
})


// ! RUTA PARA RECIBIR IMAGEN Y ENVIAR A CLOUDINARY
// POST "/books/:bookId/upload"
router.post("/:bookId/upload", uploader.single("image"), (req, res, next) => {

  const {bookId} = req.params

  console.log(req.body)

  // pasar la imagen por cloudinary
  // recibir el URL => req.file
  // usar findByIdAndUpdate para guardar el URL
  console.log(req.file)

  Book.findByIdAndUpdate(bookId, {
    image: req.file.path
  })
  .then(() => {
    res.redirect(`/books/${bookId}/details`)
  })
  .catch((err) => {
    next(err)
  })
})


module.exports = router;