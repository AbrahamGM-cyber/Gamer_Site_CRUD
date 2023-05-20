const controller = {};
//home
controller.home = (req, res) => { res.render('main.ejs') };
//catalogo
controller.catalogo = (req, res) => { res.render('catalogo.ejs') };

//about
controller.about = (req, res) => { res.render('about.ejs') };

//contactme
controller.contactme = (req, res) => { res.render('contact.ejs') };


module.exports = controller;