const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to the database."))
    .catch(err => console.log("An error occurred while connecting to the database: " + err))