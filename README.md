# English App API

API RESTful para la aplicación English App, que permite gestionar un vocabulario de palabras en inglés y generar quizzes para practicar.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Requisitos previos

- Node.js (v16 o superior)
- MongoDB (local o remoto)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/EricMI-JS/english-app-backend.git
cd english-app-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
PORT=3000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/
NODE_ENV=development
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## Estructura del proyecto

```
src/
├── config/         # Configuración (base de datos, etc.)
├── controllers/    # Controladores
├── middlewares/    # Middlewares
├── models/         # Modelos y DTOs
├── routes/         # Rutas
├── services/       # Servicios
└── index.ts        # Punto de entrada
```

## API Endpoints

### Palabras

- `GET /api/words` - Obtener todas las palabras
- `GET /api/words/search?term=example` - Buscar palabras por término
- `GET /api/words/:id` - Obtener una palabra por ID
- `POST /api/words` - Crear una nueva palabra
- `PUT /api/words/:id` - Actualizar una palabra existente
- `DELETE /api/words/:id` - Eliminar una palabra

### Quiz

- `GET /api/quiz` - Generar un quiz con todas las palabras disponibles

## Modelos de datos

### Palabra (Word)

```json
{
  "id": "string",
  "word": "string",
  "definition": "string",
  "exampleSentence": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Quiz

```json
{
  "questions": [
    {
      "id": "string",
      "word": "string",
      "options": [
        {
          "id": "string",
          "text": "string"
        }
      ],
      "correctOptionId": "string"
    }
  ]
}
```

## Licencia

ISC 