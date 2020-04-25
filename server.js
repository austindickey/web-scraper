// Dependencies
const express = require("express")

// Port
const PORT = 8000

// Initialize Express
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Routes
require("./routes/htmlRoutes")(app)

// Server Listener
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!")
})