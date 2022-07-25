const books = [
  {
    title: "Dune",
    description: "Arena y politica",
    author: "Frank Herbert"
  },
  {
    title: "Harry Potter",
    description: "Escuela de Magia y magos locos",
    author: "JK Rowling"
  }
]

// 1. establecer la conexion a la DB
const mongoose = require("mongoose");
require("../db") // automaticamente conecta a la DB

// 2. Necesitamos el modelo
const Book = require("../models/Book.model")

// 3. usamos un metodo para insertar los elementos
async function storeBooks(){
  try {
    await Book.insertMany(books)
    console.log("todo bien, libros agregados")
    mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

storeBooks()