const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: String,
  description: String,
  author: [{
    type: Schema.Types.ObjectId, // esto será un ID qu aputa a otro documento de la DB
    ref: "Author" // el nombre del Modelo
  }],
  image: String
},
{
  timestamps: true
})

const Book = model("Book", bookSchema)

module.exports = Book