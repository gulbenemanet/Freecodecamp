const router = require('express').Router();
const controllers = require('../controllers/controller')

router.post('/api/exercise/new-user', controllers.addUser)
router.get('/api/exercise/users', controllers.getAllUsers)
router.post('/api/exercise/add', controllers.addExercise)
router.get('/api/exercise/log', controllers.logExercise)

module.exports = router;