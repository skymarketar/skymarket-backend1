const express = require('express');
const multer = require('multer');
const path = require('path');
const Publicacion = require('../models/Publicacion');

const router = express.Router();

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Crear nueva publicación
router.post('/', upload.single('imagen'), async (req, res) => {
  const { titulo, descripcion, precio, destacadaPagada } = req.body;

  if (!req.file) return res.status(400).json({ message: 'Imagen requerida' });

  try {
    const nueva = new Publicacion({
      titulo,
      descripcion,
      precio,
      imagenUrl: `https://skymarket-backend.onrender.com/uploads/${req.file.filename}`,
      destacadaPagada: destacadaPagada === 'true'
    });

    await nueva.save();
    res.status(201).json({ message: 'Publicación creada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar publicación' });
  }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const lista = await Publicacion.find().sort({ fecha: -1 });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener publicaciones' });
  }
});

// Obtener una publicación por ID
router.get('/:id', async (req, res) => {
  try {
    const pub = await Publicacion.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: 'No encontrada' });
    res.json(pub);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar publicación' });
  }
});

module.exports = router;
