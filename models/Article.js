const mongoose = require("mongoose")

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: {
        type: Array
    }
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article