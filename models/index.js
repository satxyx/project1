const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost:27017/journalapp'

// Fire off the connection to Mongo DB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
  });

  module.exports = {
      Entry: require('./Entry.js'),
      User: require('./User.js')
  }
