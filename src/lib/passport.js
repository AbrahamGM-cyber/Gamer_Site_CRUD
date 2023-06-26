const passport = require('passport');
const bcrypt = require('bcryptjs');

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    nombre_completoField: 'nombre_completo',
    nombre_usuarioField: 'nombre_usuario',
    correo_electronicoField: 'correo_electronico',
    contraseñaField: 'contraseña',
    telefonoField: 'telefono',
    generoField: 'genero',
    fecha_registroField: 'fecha_registro',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, async(req, nombre_completo, nombre_usuario, correo_electronico, contraseña, telefono, genero, fecha_registro, done) => {


    connection.query("SELECT * FROM usuarios WHERE correo_electronico = '" + correo_electronico + "'", function(err, userdata) {
        console.log(userdata);
        console.log("above row object");
        if (err)
            return done(err);
        if (userdata.length) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // if there is no user with that email
            // create the user
            var newUserMysql = new Object();

            newUserMysql.correo_electronico = correo_electronico;
            newUserMysql.contraseña = contraseña;
            newUserMysql.nombre_completo = nombre_completo;
            newUserMysql.nombre_usuario = nombre_usuario;
            newUserMysql.telefono = telefono;
            newUserMysql.genero = genero; // use the generateHash function in our user model

            var insertQuery = "INSERT INTO Usuarios ( correo_electronico, password, nombre_completo, nombre_usuario, telefono, genero ) values ('" + correo_completo + "','" + contraseña + "')";
            console.log(insertQuery);
            connection.query(insertQuery, function(err, rows) {
                newUserMysql.id = rows.insertId;

                return done(null, newUserMysql);
            });
        }
    });
}));