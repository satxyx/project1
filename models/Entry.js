const mongoose = require('mongoose')

// Schema 
const entrySchema = new mongoose.Schema({
    date: { type: String, required: true }, //change to date once we have date HTML set up
    user: { type: String, required: true }, //change to object once we have user model
    title: { type: String, required: true},
    content: { type: String, required: true},
    image: { type: String, required: true } //change once we figure out how to upload IMGs
    
})

// Model
const Entry = mongoose.model('Entry, entrySchema')

// Export
module.exports = Entry