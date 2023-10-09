const { Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');

const {  usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user.controller');
const router = Router();

router.get('/', usuariosGet );


router.put('/:id', usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'Este  no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']),
    validarCampos
] ,usuariosPost );

router.delete('/', usuariosDelete );




module.exports = router;