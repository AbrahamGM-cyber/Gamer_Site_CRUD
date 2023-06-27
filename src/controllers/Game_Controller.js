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
controller.login = (req, res) => {
    if (req.session.loggedin != true) {
        res.render('login/login.ejs');
    } else {
        res.redirect('user')
    }

};

controller.signin = (req, res) => {
    const newUser = req.body;
    const { contraseña } = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [newUser.correo_electronico], (err, userdata) => {

            if (userdata.length > 0) {
                const storedUser = userdata[0];

                bcrypt.compare(contraseña, storedUser.contraseña, (err, isMatch) => {
                    if (isMatch) {
                        // Las contraseñas coinciden, almacenar el nombre de usuario en la sesión y redirigir al usuario a la página de usuario
                        req.session.loggedin = true;
                        req.session.nombre_usuario = storedUser.nombre_usuario;
                        res.redirect('user');
                    } else {
                        // Las contraseñas no coinciden, mostrar un mensaje de error al usuario
                        res.render('login/login.ejs');
                        console.log('Error');
                    }
                });

            } else {
                // El usuario no está registrado, redirigir al usuario a la página de registro
                res.render('login/registro.ejs')
            }

        });
    });
};


//registro
controller.registro = (req, res) => {
    if (req.session.loggedin != true) {
        res.render('login/registro.ejs');
    } else {
        res.redirect('user')
    }
};

controller.signup = (req, res) => {
    const newUser = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [newUser.correo_electronico], (err, userdata) => {
            if (userdata.length > 0) {
                req.flash('message', 'user alredy exists');
                res.render('login/registro.ejs');
            } else {

                bcrypt.hash(newUser.contraseña, 10).then(hash => {
                    newUser.contraseña = hash;

                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO usuarios SET ?', [newUser], (err, usuarios) => {
                            if (err) {
                                res.json(err);
                            }
                            req.flash('success', 'user save successfully');
                            res.redirect('login');
                        });
                    });
                });
            }

        });
    });
};

//usuario
controller.user = (req, res) => {
    if (req.session.loggedin == true) {
        const userName = req.session.nombre_usuario; // Obtener el nombre de usuario de la sesión
        res.render('user/user.ejs', { userName: userName }); // Renderizar la vista de usuario con el nombre de usuario
    } else {
        res.redirect('/')
    }
};

controller.dashboard = (req, res) => {
    if (req.session.loggedin == true) {
        const userName = req.session.nombre_usuario;
        req.getConnection((err, conn) => {
            if (err) throw err;

            // Realizar una consulta para recuperar los datos del usuario
            conn.query('SELECT * FROM juegos WHERE nombre_usuario = ?', [userName], (err, results) => {
                if (err) throw err;

                // Renderizar la vista EJS con los datos del usuario
                res.render('user/dashboard.ejs', { data: results, userName: userName });
            });
        });
    } else {
        res.redirect('/')
    }
};


controller.Add = (req, res) => {
    if (req.session.loggedin == true) {
        const userName = req.session.nombre_usuario;
        res.render('user/Add-dashboard.ejs', { userName: userName });
    } else {
        res.redirect('/')
    }
};

controller.AddGame = (req, res) => {
    const nombre_usuario = req.session.nombre_usuario;
    const newGame = req.body;
    const fechaLanzamiento = new Date(newGame.fecha_lanzamiento).toISOString();
    req.getConnection((err, conn) => {
        // Insertar los datos en la tabla de datos_usuario
        conn.query('INSERT INTO juegos (nombre_usuario, nombre_juego, descripcion, requisitos_sistema, link_descarga, fecha_lanzamiento) VALUES (?, ?, ?, ?, ?, ?)', [nombre_usuario, newGame.nombre_juego, newGame.descripcion, newGame.requisitos_sistema, newGame.link_descarga, fechaLanzamiento], (err, result) => {
            if (err) throw err;
            res.redirect('/dashboard');
        });
    });
};

controller.logout = (req, res) => {
    if (req.session.loggedin == true) {
        req.session.destroy()
        res.redirect('login')
    }
};
//contactme
controller.contactme = (req, res) => { res.render('contact.ejs') };


module.exports = controller;