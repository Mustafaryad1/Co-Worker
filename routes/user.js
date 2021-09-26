const router = require('express').Router();
const controller = require('../controllers/user');
const {requireAuth}   = require('../middleware/authentication')


// Sign in User in system
router.post('/login', controller.login);
// Create a new user
router.post('/register', controller.register);

module.exports = router;
