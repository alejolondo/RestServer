const { Schema, model} = require('mongoose')


const usuarioSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    correo: {type: String, required: [true, 'El correo es obligatorio']},
    password: {type: String, required: [true, 'El nombre es obligatorio']},
    img: {type: String},
    rol: {type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROL']},
    estado: {type: Boolean, default: true},
    google: { type: Boolean, default: false}

})


module.exports = model('Usuario', usuarioSchema);