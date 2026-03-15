# Escuela de Formación — Colombia Renaciente

Plataforma de capacitación en liderazgo, estrategia y campaña política para militantes y líderes del Partido Colombia Renaciente.

## Tecnologías

- **React 18** + **Vite 6**
- CSS vanilla con variables institucionales
- Google Fonts (DM Sans)
- Despliegue en **Netlify** vía GitHub

## Desarrollo local

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

## Build de producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`

## Despliegue en Netlify vía GitHub

### Paso 1: Subir a GitHub

```bash
# Inicializar repositorio
git init
git add .
git commit -m "Escuela de Formación - Colombia Renaciente"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/escuela-colombia-renaciente.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Netlify

1. Entra a [app.netlify.com](https://app.netlify.com)
2. Haz clic en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** como proveedor
4. Autoriza Netlify para acceder a tu cuenta de GitHub
5. Busca y selecciona el repositorio `escuela-colombia-renaciente`
6. Configura el build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Haz clic en **"Deploy site"**

### Paso 3: ¡Listo!

Netlify desplegará automáticamente cada vez que hagas `git push` a la rama `main`.

El archivo `netlify.toml` ya incluye la configuración de redirects para que funcione como SPA (Single Page Application).

## Estructura del proyecto

```
escuela-renaciente/
├── public/
│   └── logo.png              # Logo oficial del partido
├── src/
│   ├── App.jsx                # Componente principal con todas las vistas
│   ├── main.jsx               # Punto de entrada React
│   └── index.css              # Estilos globales y variables
├── index.html                 # HTML base
├── netlify.toml               # Configuración de Netlify
├── vite.config.js             # Configuración de Vite
└── package.json
```

## Colores institucionales

| Color      | Hex       | Uso                           |
|------------|-----------|-------------------------------|
| Amarillo   | `#F2C94C` | Sol, acento principal         |
| Naranja    | `#E8873C` | CTA, botones, énfasis         |
| Rojo       | `#C0392B` | Alertas, urgencia             |
| Azul       | `#2B7CB8` | Información, progreso         |
| Verde      | `#2D8F4E` | Éxito, completado             |
| Oscuro     | `#1A1A2E` | Sidebar, fondos oscuros       |

## Licencia

Uso exclusivo del Partido Colombia Renaciente.
