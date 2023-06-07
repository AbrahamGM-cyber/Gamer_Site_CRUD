const express = require('express');
const router = express.Router();

const GameController = require('../controllers/Game_Controller');
/* GET home page. */
router.get('/', GameController.home);

router.get('/catalogo', GameController.catalogo);

router.get('/about', GameController.about);

/* login */

router.get('/login', GameController.login);

router.post('/login', GameController.signup);


/* Registro */
router.get('/registro', GameController.registro);

router.get('/contact', GameController.contactme);

module.exports = router;