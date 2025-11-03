# 🖼️ Image Classification Frontend

Una aplicación web moderna para clasificación de imágenes utilizando Machine Learning. Permite cargar imágenes y obtener predicciones instantáneas sobre el contenido (Gato, Avión, Persona) junto con métricas detalladas y análisis del historial.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/maosorio94-4279s-projects/v0-image-classification-frontend)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación Local](#instalación-local)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue](#despliegue)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Uso](#uso)

## ✨ Características

- **Carga de Imágenes**: Drag & drop intuitivo o selección de archivos
- **Predicciones en Tiempo Real**: Clasificación instantánea con confianza de predicción
- **Predicciones Alternativas**: Muestra las 3 mejores predicciones (top-k)
- **Historial Visual**: Visualiza todas las imágenes procesadas recientemente
- **Dashboard de Métricas**: Estadísticas en tiempo real:
  - Total de predicciones realizadas
  - Confianza promedio de predicciones
  - Clase más común identificada
  - Tiempo promedio de respuesta
- **Vista Modal de Imágenes**: Visualiza imágenes en alta resolución
- **Interfaz Responsiva**: Funciona perfectamente en desktop, tablet y móvil

## 🛠️ Tecnologías

### Frontend
- **Next.js 16**: Framework React con App Router
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS v4**: Estilos utilities
- **Shadcn/ui**: Componentes pre-diseñados

### Despliegue
- **Vercel**: Hospedaje del frontend
- **Docker**: Containerización
- **Cloud Run**: Backend de ML (Google Cloud)

## 📦 Instalación Local

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/MiguelOsorio11/project-image-classification-frontend.git
cd project-image-classification-frontend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno** (opcional para desarrollo local)
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

### Comandos Disponibles

\`\`\`bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar build en producción
npm start

# Linting
npm run lint
\`\`\`

## 🔐 Variables de Entorno

### Para Desarrollo Local (`.env.local`)
\`\`\`env
# URL del backend de ML
BACKEND_URL=https://clasificadorml-be-473939580343.us-central1.run.app
\`\`\`

### Para Cloud Run / Vercel (Variables de Entorno)
Configurar en el panel de administración:
\`\`\`
BACKEND_URL=https://clasificadorml-be-473939580343.us-central1.run.app
\`\`\`

## 🚀 Despliegue

### Opción 1: Despliegue Local

\`\`\`bash
npm install
npm run dev
\`\`\`

Accede a `http://localhost:3000`

### Opción 2: Docker Local

#### Build de imagen Docker
\`\`\`bash
docker build -t image-classifier:latest .
\`\`\`

#### Ejecutar contenedor
\`\`\`bash
docker run -p 3000:3000 \
  -e BACKEND_URL=https://clasificadorml-be-473939580343.us-central1.run.app \
  image-classifier:latest
\`\`\`

#### Usando Docker Compose (Recomendado)
\`\`\`bash
docker-compose up --build
\`\`\`

Accede a `http://localhost:3000`

Para detener:
\`\`\`bash
docker-compose down
\`\`\`

### Opción 3: Vercel (Producción)

1. **Conectar repositorio a Vercel**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Importa tu repositorio de GitHub

2. **Configurar variables de entorno**
   - En el panel de Vercel, ve a Settings → Environment Variables
   - Agrega: `BACKEND_URL=https://clasificadorml-be-473939580343.us-central1.run.app`

3. **Deploy**
   - Vercel desplegará automáticamente en cada push a main
   - O despliega manualmente desde el dashboard

### Opción 4: Cloud Run (Google Cloud)

\`\`\`bash
# Requiere autenticación en Google Cloud
gcloud auth login

# Build y deploy a Cloud Run
gcloud run deploy image-classifier \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars BACKEND_URL=https://clasificadorml-be-473939580343.us-central1.run.app
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
project-image-classification-frontend/
├── app/
│   ├── api/
│   │   ├── predict/route.ts       # Endpoint para predicciones
│   │   ├── history/route.ts       # Endpoint para historial
│   │   └── metrics/route.ts       # Endpoint para métricas
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Página principal
│   └── globals.css                # Estilos globales
├── components/
│   ├── image-upload.tsx           # Componente de carga
│   ├── prediction-result.tsx      # Muestra resultados
│   ├── metrics-dashboard.tsx      # Dashboard de métricas
│   ├── history-panel.tsx          # Panel de historial
│   └── image-modal.tsx            # Modal para ver imágenes
├── public/                        # Archivos estáticos
├── Dockerfile                     # Configuración Docker
├── docker-compose.yml             # Compose para desarrollo
├── next.config.mjs                # Configuración Next.js
├── tsconfig.json                  # Configuración TypeScript
├── tailwind.config.ts             # Configuración Tailwind
└── package.json                   # Dependencias
\`\`\`

## 🔌 API Endpoints

### Predicción
**POST** `/api/predict`

Realiza una predicción sobre una imagen cargada.

**Request:**
\`\`\`json
{
  "image": "base64_encoded_image_data"
}
\`\`\`

**Response:**
\`\`\`json
{
  "predicted_class": "avion",
  "confidence": 0.6980284452438354,
  "topk": {
    "avion": 0.6980284452438354,
    "gato": 0.19734659790992737,
    "persona": 0.10462494194507599
  },
  "timestamp": "2025-11-03T22:02:01.849744",
  "filename": "imagen.png"
}
\`\`\`

### Historial
**GET** `/api/history`

Obtiene el historial de predicciones realizadas.

**Response:**
\`\`\`json
[
  {
    "id": "1",
    "predicted_class": "avion",
    "confidence": 0.698,
    "image": "base64_data",
    "timestamp": "2025-11-03T22:02:01.849744"
  },
  ...
]
\`\`\`

### Métricas
**GET** `/api/metrics`

Obtiene estadísticas generales.

**Response:**
\`\`\`json
{
  "total_predictions": 42,
  "avg_confidence": 0.75,
  "most_common_class": "persona",
  "avg_response_time": 250
}
\`\`\`

## 💻 Uso

1. **Abre la aplicación** en tu navegador
2. **Carga una imagen** usando drag & drop o el botón de selección
3. **Obtén resultados instantáneos** con:
   - Clase predicha
   - Confianza (%)
   - Top 3 predicciones alternativas
4. **Visualiza el historial** de imágenes procesadas
5. **Monitorea métricas** en el dashboard

## 🔍 Resolución de Problemas

### La aplicación no se conecta al backend
- Verifica que `BACKEND_URL` esté correctamente configurada
- Asegúrate de que el backend esté activo y accesible
- Revisa la consola del navegador (F12) para errores

### Las imágenes no se cargan
- Verifica que el navegador soporte drag & drop
- Intenta con un archivo más pequeño
- Revisa que el formato sea válido (JPG, PNG, GIF)

### Docker no inicia
\`\`\`bash
# Verifica logs
docker-compose logs -f

# Reconstruye
docker-compose down
docker-compose up --build
\`\`\`

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar issues o solicitar features, abre un issue en el repositorio.

---

**Último actualizado:** Noviembre 2025
**Versión:** 1.0.0
