const { response, request } = require('express')
const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query

    const query = {estado : true}

    //Forma de mostrar usuarios y total -- más lenta
    // const usuarios = await Usuario.find(query)
    // .limit( Number( limite ))
    // .skip( Number( desde ));

    // const total = Usuario.countDocuments(query);

    //otra forma de mostra usuarios y total -- más rapida
    const [total, usuarios] = Promise.all([
      countDocuments(query),
      Usuario.find(query)
        .limit( Number( limite ))
        .skip( Number( desde ))
    ]);

    res.status(200).json({
      total,
      usuarios
    })
  }

const usuariosPost = async (req , res) => {


    const {nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol });


    //encryotar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guarda en base de datos
    await usuario.save();
    res.status(201).json({
        usuario
    })
  }

const usuariosPut =  async(req = request, res) => {

  const { id } = req.params
  const {_id, password, google, ...restoInfo} = req.body;


  if ( password ){
    const salt = bcryptjs.genSaltSync();
    restoInfo.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, restoInfo)

  res.status(201).json({
        usuario
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


