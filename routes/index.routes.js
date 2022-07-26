const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const bookRoutes = require("./book.routes.js")
router.use("/books", bookRoutes)

const authorRoutes = require("./author.routes.js")
router.use("/author", authorRoutes)

module.exports = router;
