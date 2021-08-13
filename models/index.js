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
  console.log(`Our cool journal is connected at ${connectionString}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB!", err);
});

module.exports = {
  Entry: require('./Entry.js'),
  User: require('./User.js')
}