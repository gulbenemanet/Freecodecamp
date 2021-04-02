const User = require('../models/userModel');

const addUser = async(req, res) => {
    try {
        const user = User.create({
            username: req.body.username
        }).then((user) => {
            //console.log(user);
            res.json({
                username: user.username,
                _id: user._id
            })
        })
    } catch (err) {
        console.log(err);
    }

}

const getAllUsers = async(req, res) => {
    User.find()
        .then((sonuc) => res.json(sonuc))
        .catch(err => console.log(err))
}

const addExercise = async(req, res) => {
    try {
        //console.log(req.body)
        const updatedUser = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date
        }
        if (updatedUser.date == '') {
            updatedUser.date = new Date().toISOString().substring(0, 10)
        }
        User.findByIdAndUpdate({ _id: req.body.userId }, { exercises: updatedUser }, {
                new: true,
                runValidators: true
            })
            .then((sonuc) => {
                //console.log(sonuc);
                res.json({
                    username: sonuc.username,
                    description: sonuc.exercises[0].description,
                    duration: sonuc.exercises[0].duration,
                    _id: sonuc._id,
                    date: sonuc.exercises[0].date
                })
            })
    } catch (err) {
        console.log(err);
    }

}
const logExercise = (req, res) => {
    //code
    let userid = req.query.userId;
    let from = new Date(req.query.from);
    let to = new Date(req.query.to);
    let limit = Number(req.query.limit);

    User.findOne({ _id: userid }, (err, data) => {
        if (err) { return console.error(err); } else if (data !== null) {
            let arr = data.workouts;

            if (!isNaN(to.getTime()) && !isNaN(from.getTime())) {
                arr = arr.filter((item) => ((item.date <= to) && (item.date >= from)));
            }

            if (!isNaN(limit)) {
                arr = arr.slice(0, limit);
            }

            let count = arr.length;

            res.send({ "log": arr, count: count });

        } else {
            res.json({ "error": "cannot retrieve workout" });
        }
    })
}

module.exports = {
    addUser,
    getAllUsers,
    addExercise,
    logExercise
}