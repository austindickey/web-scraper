var express = require("express")

var app = express()
var port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require("./app/routing/htmlRoutes.js")(app)

app.listen(port, function() {
    console.log("Server listening on port: " + port)
})