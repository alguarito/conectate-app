# Skill: Notebook Generator (v1.0)

Este "skill" define los estándares técnicos y gráficos para la reconstrucción de los cuadernos interactivos de la plataforma CONECTATE.

## Estándar Gráfico

### 1. Estructura de Temas
Cada grado debe usar su clase de cuerpo (`body class`) específica para activar los colores y gradientes del sistema:
- **Grado Noveno**: `theme-uiux` (Rosa/Púrpura/Cian).
- **Grado Décimo**: `theme-coder` (Azul/Cian).
- **Grado Undécimo**: `theme-academico` (Púrpura/Índigo).

### 2. Encabezado Requerido (Hero)
Todos los cuadernos deben incluir el logo institucional y una insignia distintiva:
```html
<header class="hero">
    <img src="../IMAGENES/LOGO 1.png" alt="Logo Institucional" class="hero-logo">
    <span class="badge" style="background: rgba(var(--accent-rgb), 0.2); color: var(--accent-color);">Guía N° X</span>
    <h1>Título de la Sesión</h1>
    <p>Bajada o subtítulo motivador del Profe Alvarito.</p>
</header>
```

### 3. Componentes Interactivos
- **Secciones**: Usar la clase `interactive-section glass-panel`.
- **Grids**: Usar `grid-2` o `grid-3` para organizar tarjetas de conceptos (`concept-card`).
- **Videos**: Usar `video-cine-container` con un `iframe-wrapper` para YouTube. Si no hay video, usar `placeholder-premium`.

### 4. Datos de Gamificación (Obligatorios)
Deben definirse en un script antes de cerrar el body:
- `window.FLASH_DATA`: Mínimo 4 tarjetas con campos `question`, `answer` e `icon`.
- `window.QUIZ_DATA`: Mínimo 5 preguntas con `question`, `options` (array) y `correct` (índice 0-2).

## Estándar Técnico

### 1. Enlaces de Cabecera
```html
<link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="./CORE/notebook-core.css?v=4.0">
```

### 2. Scripts Finales (Orden Crítico)
1. `notebook-core.js`: Lógica base del cuaderno.
2. `gamification.js`: Motor de XP, Flashcards y Quices.
3. `chat-tesla.js`: Asistente IA Profe Alvarito.
4. `translate-engine.js`: Motor de traducción.

## Nivel Pedagógico: Análisis y Mediación

Este nivel define cómo transformar una guía PDF estática en una experiencia de aprendizaje activo.

### 1. Análisis de Contenido (Método Conéctate)
Al leer la guía, se deben identificar tres dimensiones:
- **Dimensión Técnica (El Saber)**: Conceptos básicos, definiciones y herramientas.
- **Dimensión Práctica (El Hacer)**: Procedimientos, pasos a seguir o aplicaciones reales.
- **Dimensión Crítica (El Ser)**: Reflexiones éticas, impacto social y "voz del Inforg".

### 2. Mapeo de Interactividad
Se debe elegir el componente que mejor se adapte al tipo de información:
- **Conceptos Clave / Glosario** $\rightarrow$ **Flashcards**. (Uso: Memorización rápida y repaso).
- **Procesos / Categorías / Listas** $\rightarrow$ **Grid Cards**. (Uso: Visualización de estructuras de datos o clasificaciones).
- **Casos de Estudio / Dilemas Éticos** $\rightarrow$ **Challenge Cards (Borde Rojo)**. (Uso: Fomentar el pensamiento crítico y el debate).
- **Contenido Audiovisual** $\rightarrow$ **Video Cine**. (Uso: Enganche inicial y demostraciones prácticas).
- **Cierre de Ciclo** $\rightarrow$ **Quiz de 5 preguntas**. (Uso: Validación de saberes y obtención de XP).

### 3. Mediación del "Profe Alvarito"
- **Tono**: Cercano, técnico pero no aburrido, motivador y retador.
- **Estructura**: Siempre debe haber una bienvenida personalizada en el `hero` y una frase de cierre en el `footer`.
- **Apodos**: Referirse al estudiante como "Inforg" o "Analista Junior" para sumergirlo en la narrativa de gamificación.

## Flujo de Trabajo Pedagógico
1. **Curaduría**: Seleccionar el 40% más relevante de la guía PDF (evitar saturación de texto).
2. **Transformación**: Convertir párrafos largos en puntos clave accionables o tarjetas interactivas.
3. **Gamificación**: Diseñar el Quiz asegurando que al menos 2 preguntas requieran análisis (no solo memoria).
4. **Ensamblaje**: Aplicar la plantilla técnica asegurando que el scroll sea fluido y los gradientes correspondan al grado escolar.
