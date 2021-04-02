require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());



app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

require('./db/dbConnection')

const router = require('./routers/urlRouter');
app.use('/', router);


app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});