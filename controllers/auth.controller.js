const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')
const {generarToken} = require('../helpers/generar-jwt')

const login =  async (req, res ) => {
    const {correo, password} = req.body
    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/password incorrectos - correo'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/password incorrectos - password'
            })
        }

        //generar token 
        const token = generarToken(usuario.id)

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
    
}

module.exports = {
    login
}