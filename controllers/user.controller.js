const { response, request } = require('express')
const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')


const usuariosGet = (req = request, res = response) => {

    const { name, age, skill = 300 } = req.query
    
    res.status(200).json({
        msg: 'get',
        name,
        age,
        skill
    })
  }

const usuariosPost = async (req , res) => {


    const {nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol });

    //verificar si el correo existe
    const existeCorreo = await Usuario.findOne({correo})
    if(existeCorreo){
      return res.status(400).json({
        msg: 'El correo ingresado ya esta registrado'
      });
    }

    //encryotar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guarda en base de datos
    await usuario.save();
    res.status(201).json({
        usuario
    })
  }

const usuariosPut = (req = request, res) => {

  const {id } = req.params
    res.status(201).json({
        msg: 'put',
        id
    })
  }

  const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete'
    })
  }
  

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }


