
const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// GET
router.get('/', usuariosGet );

// PUT --- HACER LO MISMO DE GET CON EL RESTO
router.put('/:id', usuariosPut);

// POST
router.post('/', usuariosPost);

// PATCH
router.patch('/', usuariosPatch);

// DELETE

router.delete('/', usuariosDelete )

module.exports = router;