// Dependencies
const express = require("express")
const mongoose = require("mongoose")

// Port
const PORT = 8000

// Require db model
// const db = require("./models")

// Initialize Express
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.connect(MONGODB_URI)

// Routes
require("./routes/htmlRoutes")(app)

// Server Listener
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!")
})