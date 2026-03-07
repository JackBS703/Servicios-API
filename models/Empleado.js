const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema Empleado — 10 campos con 10 TIPOS de datos distintos de Mongoose
 *
 * 1. String       → nombre
 * 2. Number       → edad
 * 3. Date         → fechaContratacion
 * 4. Boolean      → activo
 * 5. Array        → habilidades
 * 6. ObjectId     → jefe
 * 7. Decimal128   → salarioPreciso
 * 8. Mixed        → metadata
 * 9. Map          → configuraciones
 * 10. Buffer      → fotoPerfil
 */
const EmpleadoSchema = new Schema(
    {
        // 1. String — Texto con validaciones
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: [2, 'Mínimo 2 caracteres'],
            maxlength: [100, 'Máximo 100 caracteres'],
        },

        // 2. Number — Número entero con rango
        edad: {
            type: Number,
            required: [true, 'La edad es obligatoria'],
            min: [18, 'Edad mínima 18 años'],
            max: [80, 'Edad máxima 80 años'],
        },

        // 3. Date — Fecha ISO 8601
        fechaContratacion: {
            type: Date,
            required: [true, 'La fecha de contratación es obligatoria'],
            default: Date.now,
        },

        // 4. Boolean — Estado binario
        activo: {
            type: Boolean,
            default: true,
        },

        // 5. Array (de Strings) — Lista dinámica
        habilidades: {
            type: [String],
            default: [],
        },

        // 6. ObjectId — Referencia a otro Empleado (relación self-join)
        jefe: {
            type: Schema.Types.ObjectId,
            ref: 'Empleado',
            default: null,
        },

        // 7. Decimal128 — Decimal de alta precisión (dinero)
        salarioPreciso: {
            type: Schema.Types.Decimal128,
            required: [true, 'El salario es obligatorio'],
            get: (v) => (v ? parseFloat(v.toString()) : v),
        },

        // 8. Mixed — JSON flexible sin estructura fija
        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        },

        // 9. Map — Mapa clave-valor con valores String
        configuraciones: {
            type: Map,
            of: String,
            default: () => new Map(),
        },

        // 10. Buffer — Datos binarios (ej: foto de perfil en base64)
        fotoPerfil: {
            type: Buffer,
            default: null,
        },
    },
    {
        timestamps: true,       // createdAt y updatedAt automáticos
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

module.exports = mongoose.model('Empleado', EmpleadoSchema);
