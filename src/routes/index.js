const express = require('express');
const router = express.Router();
const passport = require('passport')

const GameController = require('../controllers/Game_Controller');
/* GET home page. */
router.get('/', GameController.home);

router.get('/catalogo', GameController.catalogo);

router.get('/about', GameController.about);

/* login */

router.get('/login', GameController.login);

router.post('/login', GameController.signin);


/* Registro */
router.get('/registro', GameController.registro);

router.post('/registro', GameController.signup);

/* user */

router.get('/user', GameController.user);

router.get('/dashboard', GameController.dashboard);

router.get('/Add-dashboard', GameController.AddGame);

router.post('/Add-dashboard', GameController.AddGame);

/* logout */

router.get('/logout', GameController.logout);

/* Contact */

router.get('/contact', GameController.contactme);

module.exports = router;