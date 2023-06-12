const categoria = require('../models/categoria');
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
   
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado.`)
        };
    }

const existeUsuarioPorId = async(id) => {

// Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario) {
        throw new Error(`El id ${id} no existe`)
        };
}

const existeCategoriaPorId = async(id) => {

    // Verificar si el correo existe
        const existeCategoria = await categoria.findById(id);
        if( !existeCategoria) {
            throw new Error(`El id ${id} no existe`)
        };
    }

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}