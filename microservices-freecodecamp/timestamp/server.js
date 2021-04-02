const express = require('express');
const app = express();
require('dotenv').config()

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date', (req, res) => {
    const date = req.params.date;
    if (/\d{5,}/.test(date)) {
        const dateInt = parseInt(date);
        res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    } else {
        let dateObject = new Date(date);

        if (dateObject.toString() === "Invalid Date") {
            res.json({ error: "Invalid Date" });
        } else {
            res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
        }
    }
})

app.get("/api/timestamp/", (req, res) => {
    res.json({ unix: Date.now(), utc: Date() });
});


const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});