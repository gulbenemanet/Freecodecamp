const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exercisesSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String
    }
})

const userSchema = new Schema({
    username: {
        type: String,
    },
    exercises: [exercisesSchema]
}, { collection: 'kullanicilar' })

const User = mongoose.model('kullanicilar', userSchema)

userSchema.set('toJSON', {
    transform: function(doc, user) {
        delete user.__v;

        return user;
    }
});

module.exports = User;