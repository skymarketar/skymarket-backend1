const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
const publicacionesRoutes = require('./routes/publicaciones');
const authRoutes = require('./routes/auth');

app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/auth', authRoutes);

// Server online
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`));
