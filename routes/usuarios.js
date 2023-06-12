
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');


const router = Router();

// GET
router.get('/', usuariosGet );

// PUT --- HACER LO MISMO DE GET CON EL RESTO
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

// POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passwrod debe tener al menos 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos,

    //  check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

// PATCH
router.patch('/', usuariosPatch);


// DELETE
router.delete('/:id', [
  esAdminRole,
  validarJWT,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete )

module.exports = router;