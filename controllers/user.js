const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { name, age, skill = 300 } = req.query
    
    res.status(200).json({
        msg: 'get',
        name,
        age,
        skill
    })
  }

const usuariosPost = (req , res) => {

    const {nombre, apellido} = req.body;

    res.status(201).json({
        msg: 'post',
        nombre,
        apellido
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


