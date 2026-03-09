const express = require('express');
const cors = require('cors');
const empleadosRoutes = require('./routes/empleados');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
// Rutas
app.use('/api/empleados', empleadosRoutes);

// Ruta raíz de salud
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API REST Empleados — Taller Servicios APIs',
        version: '1.0.0',
        endpoints: {
            listar: 'GET    /api/empleados',
            obtener: 'GET    /api/empleados/:id',
            crear: 'POST   /api/empleados',
            actualizar: 'PATCH  /api/empleados/:id',
            reemplazar: 'PUT    /api/empleados/:id',
            eliminar: 'DELETE /api/empleados/:id',
        },
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: `Ruta '${req.originalUrl}' no encontrada` });
});

module.exports = app;
