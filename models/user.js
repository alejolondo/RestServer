const { Schema, model} = require('mongoose')


const usuarioSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    correo: {type: String, required: [true, 'El correo es obligatorio']},
    password: {type: String, required: [true, 'El nombre es obligatorio']},
    img: {type: String},
    rol: {type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROL']},
    estado: {type: Boolean, default: true},
    google: { type: Boolean, default: false}

});   

usuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', usuarioSchema);