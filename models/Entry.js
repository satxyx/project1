const mongoose = require('mongoose')

// Schema  -- > ADD BACK IN USER require later
const entrySchema = new mongoose.Schema({
    date: { type: Date, required: true }, //change to date once we have date HTML set up
    user: { type: mongoose.Schema.Types.ObjectId,
            ref:''
        },
    title: { type: String, required: true},
    content: { type: String, required: true},
    image: { type: String, required: true } //change once we figure out how to upload IMGs
    
})

// Model
const Entry = mongoose.model('Entry', entrySchema)

// Export
module.exports = Entry