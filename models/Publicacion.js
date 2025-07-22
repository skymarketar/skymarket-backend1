const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagenUrl: {
    type: String,
    required: true
  },
  destacada: {
    type: Boolean,
    default: false
  },
  destacadaPagada: {
    type: Boolean,
    default: false
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Publicacion', publicacionSchema);
