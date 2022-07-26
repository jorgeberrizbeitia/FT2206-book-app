const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: String,
  country: String,
  yearBorn: Number
},
{
  timestamps: true
})

const Author = model("Author", authorSchema)

module.exports = Author