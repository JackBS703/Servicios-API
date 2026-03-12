# Taller de Servicios APIs — REST API CRUD Empleados

- **Materia:** Pruebas y Gestión de la Configuración
- **Profesor:** David Fernando Mejía Tabares
- **Universidad:** Politécnico Colombiano Jaime Isaza Cadavid
- **Fecha de entrega:** 14 de marzo de 2026

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-v7+-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Postman](https://img.shields.io/badge/Postman-Docs-FF6C37?style=flat&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/38562704/2sBXierZW7)
[![SoapUI](https://img.shields.io/badge/SoapUI-5.9.1-FABD08?style=flat)](https://www.soapui.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Tabla de Contenidos

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Modelo de datos](#modelo-de-datos)
3. [Endpoints de la API](#endpoints-de-la-api)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
6. [Pruebas con Postman](#pruebas-con-postman)
7. [Pruebas con SoapUI](#pruebas-con-soapui)
8. [Autores](#autores)
9. [Referencias](#referencias)

---

## Descripción del proyecto

Se desarrolló una **API REST completa** para gestionar información de empleados, construida con Node.js, Express y MongoDB Atlas. La API implementa operaciones CRUD completas y fue probada con dos herramientas profesionales de QA: **Postman** y **SoapUI**.

Adicionalmente, se realizaron pruebas sobre la API pública **JSONPlaceholder** para comparar el comportamiento de una API externa con la implementación propia.

---

## Modelo de datos

### Entidad: `Empleado`

El modelo implementa **10 campos con 10 tipos de datos diferentes** de MongoDB/Mongoose:

| # | Campo | Tipo Mongoose | Ejemplo |
|---|-------|---------------|---------|
| 1 | `nombre` | `String` | `"Ana María López"` |
| 2 | `edad` | `Number` | `28` |
| 3 | `fechaContratacion` | `Date` | `"2023-08-20T00:00:00Z"` |
| 4 | `activo` | `Boolean` | `true` |
| 5 | `habilidades` | `Array` | `["JavaScript", "React"]` |
| 6 | `jefe` | `ObjectId` | `"65f1a2b3c4d5e6f7..."` |
| 7 | `salarioPreciso` | `Decimal128` | `3850000.75` |
| 8 | `metadata` | `Mixed` | `{ "lastLogin": "..." }` |
| 9 | `configuraciones` | `Map` | `{ "idioma": "es" }` |
| 10 | `fotoPerfil` | `Buffer` | Imagen en Base64 |

### Ejemplo de JSON válido

```json
{
  "nombre": "María Fernanda Gómez",
  "edad": 29,
  "fechaContratacion": "2023-08-20T00:00:00Z",
  "activo": true,
  "habilidades": ["Python", "Django", "AWS"],
  "jefe": null,
  "salarioPreciso": 4200000.50,
  "metadata": { "certificaciones": ["AWS Certified", "Scrum Master"] },
  "configuraciones": { "idioma": "es", "timezone": "America/Bogota" },
  "fotoPerfil": null
}
```

---

## Endpoints de la API

**Base URL local:** `http://localhost:3000`

| Método | Endpoint | Descripción | Código esperado |
|--------|----------|-------------|----------------|
| `GET` | `/api/empleados` | Listar todos los empleados | `200 OK` |
| `GET` | `/api/empleados/:id` | Obtener empleado por ID | `200 OK` / `404` |
| `POST` | `/api/empleados` | Crear uno o varios empleados | `201 Created` |
| `PATCH` | `/api/empleados/:id` | Actualizar campos específicos | `200 OK` |
| `PUT` | `/api/empleados/:id` | Reemplazar documento completo | `200 OK` |
| `DELETE` | `/api/empleados/:id` | Eliminar empleado | `200 OK` / `404` |

---

## Estructura del proyecto

```
Servicios-API/
├── config/
│   └── db.js                  # Conexión a MongoDB Atlas
├── controllers/
│   └── empleadosController.js # Lógica CRUD completa
├── models/
│   └── Empleado.js            # Schema Mongoose (10 tipos)
├── routes/
│   └── empleados.js           # Definición de rutas HTTP
├── docs/
│   ├── postman/               # Colecciones Postman exportadas
│   ├── soapui/                # Proyectos SoapUI exportados
│   │   ├── Empleado-API/      # XML y screenshots nuestra API
│   │   └── jsonplaceholder/   # XML y screenshots API pública
│   ├── empleados-test-data.json
│   └── empleados-soapui-data.json
├── .env.example               # Plantilla de variables de entorno
├── app.js
├── server.js
└── package.json
```

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/nightsky18/Servicios-API.git
cd Servicios-API
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con los valores reales:

```env
MONGO_URI=mongodb+srv://USUARIO:PASSWORD@cluster0.xxxxx.mongodb.net/empleadosDB
PORT=3000
```

### 4. Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (recarga automática)
npm run dev
```

Servidor disponible en `http://localhost:3000`

---

## Pruebas con Postman

Postman es un cliente HTTP gráfico que permite probar APIs de forma visual, documentar endpoints y compartir colecciones con el equipo.

### Documentación publicada

- [Nuestra API — Postman Docs](https://documenter.getpostman.com/view/38562704/2sBXierZW7)
- [JSONPlaceholder — Postman Docs](https://documenter.getpostman.com/view/38562704/2sBXierZf5)

### Nuestra API — 13 casos de prueba

| # | Nombre | Método | Endpoint | Resultado |
|---|--------|--------|----------|-----------|
| 1 | Crear empleado válido | `POST` | `/api/empleados` | `201` ✅ |
| 2 | Crear múltiples empleados | `POST` | `/api/empleados` | `201` ✅ |
| 3 | Edad menor de 18 | `POST` | `/api/empleados` | `400` ❌ |
| 4 | Nombre muy corto | `POST` | `/api/empleados` | `400` ❌ |
| 5 | Sin salarioPreciso | `POST` | `/api/empleados` | `400` ❌ |
| 6 | ObjectId inválido en jefe | `POST` | `/api/empleados` | `400` ❌ |
| 7 | Listar todos | `GET` | `/api/empleados` | `200` ✅ |
| 8 | Obtener por ID | `GET` | `/api/empleados/:id` | `200` ✅ |
| 9 | ID inexistente | `GET` | `/api/empleados/:id` | `404` ❌ |
| 10 | Actualizar parcialmente | `PATCH` | `/api/empleados/:id` | `200` ✅ |
| 11 | Reemplazar completamente | `PUT` | `/api/empleados/:id` | `200` ✅ |
| 12 | Eliminar empleado | `DELETE` | `/api/empleados/:id` | `200` ✅ |
| 13 | Eliminar ID inexistente | `DELETE` | `/api/empleados/:id` | `404` ❌ |

### JSONPlaceholder — 7 casos de prueba

| # | Nombre | Método | Endpoint | Resultado |
|---|--------|--------|----------|-----------|
| 1 | Listar todos los usuarios | `GET` | `/users` | `200` ✅ |
| 2 | Obtener usuario por ID=1 | `GET` | `/users/1` | `200` ✅ |
| 3 | Usuario inexistente ID=999 | `GET` | `/users/999` | `404` ❌ |
| 4 | Posts del usuario ID=1 | `GET` | `/posts?userId=1` | `200` ✅ |
| 5 | Crear post nuevo | `POST` | `/posts` | `201` ✅ |
| 6 | Reemplazar post completo | `PUT` | `/posts/1` | `200` ✅ |
| 7 | Eliminar post ID=1 | `DELETE` | `/posts/1` | `200` ✅ |

---

## Pruebas con SoapUI

SoapUI es una herramienta profesional de testing usada en entornos empresariales de QA. Permite probar APIs REST y SOAP, y organizar pruebas en proyectos exportables.

### Importar proyectos

1. Abrir SoapUI
2. `File → Import Project`
3. Seleccionar el archivo `.xml` de la carpeta `docs/soapui/`

### Nuestra API — 11 casos de prueba

| # | Nombre | Método | Resultado | Evidencia |
|---|--------|--------|-----------|-----------|
| 1 | Crear Ana QA (BUENO_1) | `POST` | `201` ✅ | [ver](docs/soapui/Empleado-API/soapui-POST-bueno1.png) |
| 2 | Crear Carlos QA (BUENO_2) | `POST` | `201` ✅ | [ver](docs/soapui/Empleado-API/soapui-POST-bueno2.png) |
| 3 | Edad menor de 18 (MALO_1) | `POST` | `400` ❌ | [ver](docs/soapui/Empleado-API/soapui-POST-malo1-edad.png) |
| 4 | Nombre muy corto (MALO_2) | `POST` | `400` ❌ | [ver](docs/soapui/Empleado-API/soapui-POST-malo2-nombre.png) |
| 5 | Sin salarioPreciso (MALO_3) | `POST` | `400` ❌ | [ver](docs/soapui/Empleado-API/soapui-POST-malo3-salario.png) |
| 6 | Listar todos los empleados | `GET` | `200` ✅ | [ver](docs/soapui/Empleado-API/soapui-GET-todos.png) |
| 7 | Obtener empleado por ID | `GET` | `200` ✅ | [ver](docs/soapui/Empleado-API/soapui-GET-id.png) |
| 8 | Actualizar parcialmente | `PATCH` | `200` ✅ | [ver](docs/soapui/Empleado-API/soapui-PATCH-ana.png) |
| 9 | Reemplazar completamente | `PUT` | `200` ✅ | [ver](docs/soapui/Empleado-API/soapui-PUT-carlos.png) |
| 10 | PUT ID inexistente | `PUT` | `404` ❌ | [ver](docs/soapui/Empleado-API/soapui-PUT-malo1-inexistente.png) |
| 11 | Eliminar empleado | `DELETE` | `200` ✅ | [ver](docs/soapui/Empleado-API/soapui-DELETE-ana.png) |

### JSONPlaceholder — 7 casos de prueba

| # | Nombre | Método | Resultado | Evidencia |
|---|--------|--------|-----------|-----------|
| 1 | Listar todos los usuarios | `GET` | `200` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-GET-usuarios.png) |
| 2 | Obtener usuario por ID=1 | `GET` | `200` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-GET-usuario-id.png) |
| 3 | Usuario inexistente ID=999 | `GET` | `404` ❌ | [ver](docs/soapui/jsonplaceholder/soapui-public-GET-404.png) |
| 4 | Posts del usuario ID=1 | `GET` | `200` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-GET-posts.png) |
| 5 | Crear post nuevo | `POST` | `201` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-POST-crear.png) |
| 6 | Reemplazar post completo | `PUT` | `200` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-PUT-actualizar.png) |
| 7 | Eliminar post ID=1 | `DELETE` | `200` ✅ | [ver](docs/soapui/jsonplaceholder/soapui-public-DELETE.png) |

---
## Autores
  - Mateo Berrio Cardona
  - Esteban Cano Ramírez
  - Yeimy Daniela Herrera Bedoya
  - Mariana Montoya Sepúlveda


## Referencias

- [Express.js — Documentación oficial](https://expressjs.com/)
- [Mongoose — Documentación oficial](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Postman Learning Center](https://learning.postman.com/)
- [SoapUI Docs](https://www.soapui.org/docs/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---

**Última actualización:** 11 de marzo de 2026 | **Estado:** Entregado
