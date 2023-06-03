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

//contactme
controller.contactme = (req, res) => { res.render('contact.ejs') };


module.exports = controller;