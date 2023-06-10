const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


passport.use('local.signup', new LocalStrategy({
    nombre_usuarioField: 'nombre_usuario',
    correo_electronicoField: 'correo_electronico',
    telefonoField: 'telefono',
    fecha_registroField: 'fecha_registro',
    contraseñaField: 'contraseña',
    passReqToCallback: true

}, async(req, nombre_usuario, correo_electronico, telefono, fecha_registro, contraseña, done) => {

    console.log(req.body)
    const newUser = {
        nombre_usuario,
        correo_electronico,
        telefono,
        fecha_registro,
        password,
    };
    await conn.query('INSERT FROM usuarios SET ?', [newUser]);
}));

//passport.serializeUser((usr, done)=>{

//})