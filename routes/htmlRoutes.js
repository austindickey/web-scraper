// Dependencies
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        const newsUrl = "http://www.nfl.com/news"
        axios.get(newsUrl).then(function (response) {
            let $ = cheerio.load(response.data)

            res.send("Scrape Complete")
        })
    })

}