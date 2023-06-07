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

controller.busqueda = (req, res) => {
    const busqueda = req.params;

    req.getConnection((err, conn) => {
        conn.query('WHERE nombre_juego LIKE= ?', [busqueda], 'OR nombre_juego LIKE= ?', [busqueda], (err, Juegos) => {
            if (err) {
                res.json(err);
            }
            res.render('catalogo.ejs', {
                data: Juegos[0]
            });
        });
    });
};

//about
controller.about = (req, res) => { res.render('about.ejs') };

//login
controller.login = (req, res) => { res.render('login.ejs') };

controller.signup = (req, res) => {
    console.log(req.body)
    res.send('received')
};


//resgitro
controller.registro = (req, res) => { res.render('registro.ejs') };


//contactme
controller.contactme = (req, res) => { res.render('contact.ejs') };


module.exports = controller;