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
                            link: "https://www.usatoday.com" + summary.parent.attribs.href
                        })
                    }
                }

            })

            for (let i = 0; i < results.length; i++) {
                db.Article.create(results[i])
                    .then(function(data){
                        // console.log("Stored into database: " + data)
                    })
                    .catch(function(err){
                        console.log("Error Message: " + err)
                    })
            }

            res.redirect("/")
        })
    })

    // Get Non-Saved Articles Route
    app.get("/articles", function(req,res) {
        db.Article.find({"saved": false})
            .then(function(data){
                res.json(data)
            })
            .catch(function(err){
                res.json(err)
            })
    })

    // Get Saved Articles Route
    app.get("/true", function(req,res) {
        db.Article.find({"saved": true})
            .then(function(data){
                res.json(data)
            })
            .catch(function(err){
                res.json(err)
            })
    })

    // Get Notes for Saved Article
    app.get("/true/:id", function(req,res) {
        db.Article.findOne({_id: req.params.id})
            .populate("note")
            .then(function (data) {
                res.json(data)
            })
            .catch(function (err) {
                res.json(err)
            })
    })

    // Post Notes to DB
    app.post("/true/:id", function(req, res) {
        db.Note.create(req.body)
          .then(function(data){
              console.log(data)
            return db.Article.updateOne({_id: req.params.id}, {note: data._id}, {new: true})
          })
          .then(function(art){
            res.json(art)
          })
          .catch(function(err){
            res.json(err)
          })
    })

    // Save Article Route
    app.post("/articles/:id", function (req, res) {
        let savedVal = req.body.saved
        db.Article.updateOne({ _id: req.params.id }, {$set: {saved: savedVal}})
            .catch(function (err) {
                res.json(err)
            })
    })

    // Remove All Articles Route
    app.get("/remove", function(req,res) {
        db.Article.remove({})
            .catch(function(err){
                res.json(err)
            })

        res.redirect("/")
    })

    // Saved Articles Page Route
    app.get("/saved", function (req, res) {
        res.sendFile(path.join(__dirname + "../../public/saved.html"))
    })

}