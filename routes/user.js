const { Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const {  usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user.controller');
const router = Router();

router.get('/', usuariosGet );


router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'Este  no es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost );      

router.delete('/:id', usuariosDelete );




module.exports = router;