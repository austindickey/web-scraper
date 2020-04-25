// Dependencies
const axios = require("axios")
const cheerio = require("cheerio")
const path = require('path')
const db = require("../models")

module.exports = function (app) {

    // Scrape Route
    app.get("/scrape", function (req, res) {
        const newsUrl = "https://www.usatoday.com/sports/nfl"
        axios.get(newsUrl).then(function (response) {
            let $ = cheerio.load(response.data)

            let results = []

            $("div.gnt_m_flm").each(function(i,element) {

                let source = $(element).find("a")

                for (let x = 0; x < source.length; x++) {
                    let title = source[x].children[1]
                    let summary = source[x].children[0]
                    let img = source.find("img")[x]

                    if (title === undefined || img === undefined) {
                        continue
                    } else if (title.type === "text"){
                        results.push({
                            title: title.data,
                            summary: summary.parent.attribs["data-c-br"],
                            img: img.attribs["data-gl-src"],
                            link: newsUrl + summary.parent.attribs.href
                        })
                    }
                }

                
            })
            
            for (let i = 0; i < results.length; i++) {
                db.Article.create(results[i])
                    .then(function(data){
                        console.log("Stored into database: " + data)
                    })
                    .catch(function(err){
                        console.log("Error Message: " + err)
                    })
            }

            res.redirect("/")
        })
    })

    // Saved Articles Route
    app.get("/saved", function (req, res) {
        res.sendFile(path.join(__dirname + "../../public/saved.html"))
    })

}