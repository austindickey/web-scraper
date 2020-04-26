const mongoose = require("mongoose")

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    articleId: {
      type: String
    }
})

const Note = mongoose.model("Note", NoteSchema)

module.exports = Note