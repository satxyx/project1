const mongoose = require('mongoose')

// Schema
const entrySchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    title: { type: String, required: true},
    content: { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Model
const Entry = mongoose.model('Entry', entrySchema)

// Export
module.exports = Entry;