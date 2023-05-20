const express = require('express');
const router = express.Router();

const GameController = require('../controllers/Game_Controller');
/* GET home page. */
router.get('/', GameController.home);

router.get('/catalogo', GameController.catalogo);

router.get('/about', GameController.about);

router.get('/contact', GameController.contactme);

module.exports = router;