const express = require('express');
const router = express.Router();
const {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
} = require('../controllers/empleadosController');

// GET  /api/empleados      → Lista todos
// POST /api/empleados      → Crea uno nuevo
router.route('/')
    .get(getEmpleados)
    .post(createEmpleado);

// GET    /api/empleados/:id → Obtiene uno por ID
// PATCH  /api/empleados/:id → Actualiza parcialmente
// DELETE /api/empleados/:id → Elimina
router.route('/:id')
    .get(getEmpleadoById)
    .patch(updateEmpleado)
    .delete(deleteEmpleado);

module.exports = router;
