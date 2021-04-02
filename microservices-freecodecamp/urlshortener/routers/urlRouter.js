const router = require('express').Router();
const controller = require('../controllers/urlController');

router.post('/api/shorturl/new', controller.urlShortener);
router.get('/api/shorturl/:short_url?', controller.urlRedirect);

module.exports = router