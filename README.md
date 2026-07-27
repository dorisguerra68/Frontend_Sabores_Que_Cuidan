# 🥗  Sabores que Cuidan

Una aplicación web moderna dedicada a la gestión, difusión o recomendación de recetas y hábitos de alimentación saludable, diseñada para ofrecer una experiencia de usuario rápida, accesible y reconfortante.
---
## 🛠️ Tecnologías Utilizadas

El proyecto está construido con las herramientas más recientes del ecosistema de desarrollo web:

* **React 19**: Biblioteca principal para la construcción de la interfaz de usuario basada en componentes.
* **Vite 8**: Herramienta de construcción y entorno de desarrollo de última generación, ultra rápida.
* **Tailwind CSS v4**: Framework de diseño de primera utilidad para estilos modernos y adaptables a través de su nuevo plugin nativo de Vite.
* **React Router DOM 7**: Sistema de enrutamiento dinámico para navegar de forma fluida entre las diferentes secciones.
* **Axios**: Cliente HTTP para la gestión y consumo de servicios y APIs externas.
* **React Icons**: Colección de iconos vectoriales optimizados para complementar el diseño visual.
---
## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu entorno local:

* [Node.js](https://nodejs.org) (Versión 18 o superior recomendada)
* Un gestor de paquetes como **npm** (incluido con Node) o **yarn**
---
## 🔧 Instalación y Configuración

Sigue estos pasos para clonar el repositorio y ejecutar el proyecto de forma local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com
   ```

2. Acceder al directorio del proyecto:
   ```bash
   cd sabores-que-cuidan
   ```

3. Instalar todas las dependencias del sistema:
   ```bash
   npm install
   ```
---
## 💻 Comandos Disponibles

En el directorio del proyecto puedes ejecutar los siguientes scripts desde la terminal:

* **Ejecutar en modo de desarrollo:**
  ```bash
  npm run dev
  ```
  Inicia el servidor local (usualmente en `http://localhost:5173`).

* **Construir para producción:**
  ```bash
  npm run build
  ```
  Compila y optimiza la aplicación dentro de la carpeta `dist`, lista para ser desplegada en servidores como Vercel, Netlify o Firebase.

* **Ejecutar análisis de código (Linter):**
  ```bash
  npm run lint
  ```
  Evalúa el código fuente utilizando ESLint para asegurar las buenas prácticas y consistencia en el proyecto.
---
## 📁 Estructura del Proyecto

El código fuente se organiza dentro del directorio `src` bajo una arquitectura modular y escalable:

```text
src/
├── assets/images/          # Recursos estáticos (Logotipos e imágenes)
├── components/
│   ├── calculos/           # Lógica y componentes de cálculos nutricionales o métricas
│   └── ui/                 # Componentes visuales genéricos y reutilizables (Botones, inputs, etc.)
├── context/                # Estados globales de la aplicación (Autenticación, preferencias)
├── hooks/                  # Hooks personalizados para encapsular lógica reutilizable
├── layouts/                # Estructuras de diseño comunes para las páginas
├── pages/                  # Vistas principales vinculadas al enrutador
│   ├── Dashboard.jsx       # Panel de control principal del usuario
│   ├── Diary.jsx           # Vista del diario o historial alimentario
│   ├── RegistrarComida.jsx # Formulario e interfaz para añadir alimentos
│   └── Welcome.jsx         # Pantalla de bienvenida o landing page
├── services/               # Módulos encargados de las peticiones HTTP (Axios) a la API
│   ├── alimentoService.js  # Gestión del catálogo de alimentos y nutrientes
│   ├── RegistroComidaService.js # Persistencia de los registros diarios del usuario
│   └── usuarioService.js   # Gestión de perfil, autenticación y datos de usuario
├── styles/                 # Configuraciones de estilos globales complementarios
├── App.jsx                 # Componente raíz con la definición de rutas
└── main.js                 # Punto de entrada de la aplicación React
```
---
## 🌟 Funcionalidades Clave

Basado en los módulos implementados, la aplicación cuenta con las siguientes capacidades:

* **Control de Nutrición Diario (`Diary.jsx`)**: Historial cronológico donde el usuario puede visualizar lo consumido durante el día.
* **Registro Automatizado (`RegistrarComida.jsx`)**: Formulario interactivo para dar de alta alimentos consumidos, conectándose en tiempo real con el backend.
* **Cálculos Métricos (`components/calculos/`)**: Procesamiento inteligente de datos para evaluar calorías, macronutrientes o estadísticas según el perfil del usuario.
* **Panel Analítico (`Dashboard.jsx`)**: Resumen gráfico y visual del progreso, metas alcanzadas y estado nutricional actual.
* **Capa de Servicios Desacoplada (`services/`)**: Centralización de las llamadas a la API REST, garantizando un código limpio, mantenible y libre de duplicación.
### 📚 Fuentes Oficiales de Información
Los valores numéricos cargados en la base de datos y los umbrales de validación aplicados por la API se han fundamentado en los criterios y guías oficiales de las siguientes instituciones:

1. **Agencia Española de Seguridad Alimentaria y Nutrición (AESAN)**: Directrices oficiales de nutrición, ingestas de referencia y herramientas de evaluación nutricional en España.
2. **Sistema Nacional de Salud (SNS) - Ministerio de Sanidad de España**: Directrices de nutrición clínica y guías de salud para el control metabólico.
3. **Consejería de Sanidad - Comunidad de Madrid**: Manuales de alimentación saludable, recomendaciones dietéticas oficiales y planes de prevención.
4. **BEDCA** (Base de Datos Española de Composición de Alimentos) para los macronutrientes adaptados al mercado español.
---
## ✒️ Autores y Créditos

* **Doris Guerra Loreto** - *Desarrollador Full Stack* - [dorisguerra68](https://github.com)
