const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion' }]
});

module.exports = mongoose.model('User', userSchema);
