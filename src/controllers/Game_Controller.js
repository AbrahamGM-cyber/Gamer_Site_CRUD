const passport = require('passport');
const bcrypt = require('bcryptjs');

const controller = {};
//home
controller.home = (req, res) => { res.render('main.ejs') };
//catalogo
controller.catalogo = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Juegos', (err, Juegos) => {
            if (err) {
                res.json(err);
            }
            res.render('catalogo.ejs', {
                data: Juegos
            });
        });
    });
};

//about
controller.about = (req, res) => { res.render('about.ejs') };

//login
controller.login = (req, res) => { res.render('login.ejs') };

controller.signin = (req, res) => {
    console.log(req.body)
    res.send('received')
};


//resgitro
controller.registro = (req, res) => { res.render('registro.ejs') };

controller.signup = (req, res) => {
    const newUser = req.body;

    bcrypt.hash(newUser.contraseña, 12).then(hash => {
        newUser.contraseña = hash;

        req.getConnection((err, conn) => {
            conn.query('INSERT INTO usuarios set ?', [newUser], (err, usuarios) => {
                res.redirect('/')
            });
        });
    });
};



//contactme
controller.contactme = (req, res) => { res.render('contact.ejs') };


module.exports = controller;