const { Router } = require('express');
const {check} = require('express-validator')
const {login} = require('../controllers/auth.controller')

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña no es valida').not().isEmpty(),


],login )

module.exports = router;