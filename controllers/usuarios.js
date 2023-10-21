const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  try{
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find()
  ]);

  res.json({
    total : total,
    data : {
      usuarios
    }
  });
} catch (error) {
  console.log(error);
  res.status(500).json({
    ok: false,
    msg: "Error get User",
    error: error,
  });
}
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en la base de datos
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO: Validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario;

  res.json({
    usuario,
    usuarioAutenticado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
