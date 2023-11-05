const mongoose = require("mongoose");

const Autor = mongoose.model(
  "Autor",
  new mongoose.Schema({
    nome: String,
    sobrenome: String,
    email: String,
    telefone: String,
    ativo: Boolean
  })
);

module.exports = Autor;
