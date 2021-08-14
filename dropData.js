const db = require('./models/index.js');

db.User.deleteMany({}, (err) => {
    console.log('deleted all users')
})

db.Entry.deleteMany({}, (err) => {
    console.log('deleted all entries')
})