const express = require("express")

const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
require("./app/routing/htmlRoutes.js")(app)

// Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI)

// Server Listener
app.listen(port, function() {
    console.log("Server listening on port: " + port)
})