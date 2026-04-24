const APP_VERSION = '2.0';
const ADMIN_EMAIL = "alvaro.cardenas.orozco@gmail.com";

// --- PERFIL DE CURADOR ESTÁTICO (Ecosistema Abierto) ---
const currentUser = {
    name: "Álvaro Cárdenas",
    email: ADMIN_EMAIL,
    isAdmin: true,
    picture: "IMAGENES/ID_CONECTATE.png"
};

console.log('CONECTATE App Version:', APP_VERSION);

// --- CONFIGURACIÓN ACADÉMICA POR PERIODOS ---
const ACADEMIC_CONFIG = {
    currentPeriod: 'P1',
    year: 2026,
    periods: {
        P1: { label: 'Primer Periodo', status: 'active', icon: 'bx-rocket', color: '#a855f7' },
        P2: { label: 'Segundo Periodo', status: 'locked', icon: 'bx-lock-alt', color: '#64748b' },
        P3: { label: 'Tercer Periodo', status: 'locked', icon: 'bx-lock-alt', color: '#64748b' }
    }
};

// --- UTILIDADES DE REGISTRO ACADÉMICO ---
function getAcademicRecord(email) {
    return JSON.parse(localStorage.getItem(`academic_${email}`)) || null;
}

function getAllAcademicRecords() {
    const records = [];
    const accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('academic_')) {
            const email = key.replace('academic_', '');
            const academic = JSON.parse(localStorage.getItem(key));
            const charData = JSON.parse(localStorage.getItem(`data_${email}`)) || {};
            const gamiData = JSON.parse(localStorage.getItem(`gami_${email}`)) || { xp: 0, level: 1, completed_sessions: [] };
            const account = accounts[email] || {};
            if (!account.isAdmin) {
                records.push({
                    email,
                    name: account.name || 'Sin nombre',
                    grade: charData.grade || 'N/A',
                    group: charData.group || 'Sin Grupo',
                    ...charData,
                    academic,
                    gamification: gamiData
                });
            }
        }
    });
    return records;
}

function saveSessionResult(sessionId, grade, xp) {
    const user = JSON.parse(localStorage.getItem('conectate_user'));
    if (!user || user.isAdmin) return;
    
    let academic = JSON.parse(localStorage.getItem(`academic_${user.email}`)) || { periodos: {} };
    const currentPeriod = ACADEMIC_CONFIG.currentPeriod;
    
    if (!academic.periodos[currentPeriod]) academic.periodos[currentPeriod] = { talleres: {} };
    if (!academic.periodos[currentPeriod].talleres) academic.periodos[currentPeriod].talleres = {};
    
    const prev = academic.periodos[currentPeriod].talleres[sessionId] || { grade: 0, attempts: 0 };
    
    // Solo guardamos si la nueva nota es mayor o igual
    if (grade >= prev.grade) {
        academic.periodos[currentPeriod].talleres[sessionId] = {
            grade: grade,
            xp: xp,
            timestamp: new Date().toISOString(),
            attempts: prev.attempts + 1
        };
        localStorage.setItem(`academic_${user.email}`, JSON.stringify(academic));
    }
}

const sectionData = {
    home: {
        theme: 'theme-etico', icon: '<i class="bx bxs-home-heart"></i>', title: 'Bienvenido a CONECTATE', subtitle: 'IE Sor María Juliana - Tu Portal de Tecnología e Informática',
        features: [ 
            { icon: 'bx bx-user-circle', title: '¿Quién es tu Profesor?', desc: 'PhD. Álvaro Cárdenas Orozco, apasionado por las TIC y la educación crítica.', action: 'openProfile' }, 
            { icon: 'bx bx-rocket', title: 'Orientación vocacional', desc: 'Descubre tu camino profesional: Apoyo y guía para explorar opciones en Cartago y el Valle.', action: 'openTeslaVocational' },
            { icon: 'bx bx-message-square-dots', title: 'Apoyo Personal', desc: 'Reconoce tus habilidades y talentos: Tips y recomendaciones para potenciar tu desarrollo personal.', action: 'openTeslaPotential' } 
        ]
    },
    octavo: {
        theme: 'theme-maker', icon: '<i class="bx bx-book-open"></i>', title: 'Grado Octavo', subtitle: 'Electrónica, Robótica y Pensamiento Maker — Del Circuito al Prototipo',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Bases de la Electrónica', file: './OCTAVO/1-8-TIC.html?v=new-layout', desc: 'Introducción a la corriente, voltaje y resistencias. Explorando el flujo energético de tus primeros circuitos.' },
            { id: 2, title: 'El Protoboard Mágico', file: './OCTAVO/2-8-TIC.html?v=new-layout', desc: 'Aprende a ensamblar tu primer circuito básico sin soldar, interactuando con LEDs y pulsadores.' },
            { id: 3, title: 'Resistencias (Ley de Ohm)', file: './OCTAVO/3-8-TIC.html?v=new-layout', desc: 'Cálculo interactivo de resistencias para evitar que tus brillantes LEDs se quemen.' },
            { id: 4, title: 'Conoce Arduino UNO', file: './OCTAVO/4-8-TIC.html?v=new-layout', desc: 'Analizamos la placa Arduino UNO, sus pines de entrada y el entorno de desarrollo IDE.' },
            { id: 5, title: 'Programando el Cerebro', file: './OCTAVO/5-8-TIC.html?v=new-layout', desc: 'Tu primer código "Blink" paso a paso. Compilando y cargando programas.' },
            { id: 6, title: 'Entradas Digitales', file: './OCTAVO/6-8-TIC.html?v=new-layout', desc: 'Conectando interruptores y botones al Arduino para controlar hardware externo.' },
            { id: 7, title: 'Entradas Analógicas (Sensores)', file: './OCTAVO/7-8-TIC.html?v=new-layout', desc: 'Uso de potenciómetros y fotoresistencias (LDR) para medir luz del ambiente.' },
            { id: 8, title: 'Salidas Variables (PWM)', file: './OCTAVO/8-8-TIC.html?v=new-layout', desc: 'Controlando el brillo de un LED gradualmente y encendiendo motores de forma rítmica.' },
            { id: 9, title: 'Sensores Ultrasónicos', file: './OCTAVO/9-8-TIC.html?v=new-layout', desc: 'Midiendo distancias como murciélagos con el potente sensor HC-SR04.' },
            { id: 10, title: 'Motores Micro Servo', file: './OCTAVO/10-8-TIC.html?v=new-layout', desc: 'Control programático de posición y movimiento con motores de precisión para brazos robóticos.' },
            { id: 11, title: 'Auditoría: Proyecto Final', file: './OCTAVO/11-8-TIC.html?v=2.0', desc: 'Sube el informe PDF de tu proyecto de robótica/electrónica y recibe evaluación IA con retroalimentación detallada.' }
        ]
    },
    noveno: {
        theme: 'theme-uiux', icon: '<i class="bx bx-laptop"></i>', title: 'Grado Noveno', subtitle: 'Ética Digital, Historia de la Tecnología y Pensamiento Crítico',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Sesión 1: El Despertar del Inforg', file: './NOVENO/1-9-TIC.html?v=1.3', desc: '¿Eres usuario o producto? Una introducción a la biopolítica y la ética de la información en el siglo XXI.' },
            { id: 2, title: 'Sesión 2: Desmontando la Historia', file: './NOVENO/2-9-TIC.html?v=1.1', desc: 'Ciencia vs. Tecnología. El Triángulo del Saber y la Autopsia Tecnológica de los objetos.' },
            { id: 3, title: 'Sesión 3: Arqueología del Saber', file: './NOVENO/3-9-TIC.html?v=1.0', desc: 'Excavando en la historia de la tecnología: De las herramientas de piedra a la inteligencia artificial.' },
            { id: 4, title: 'Sesión 4: El Dueño de las Ideas', file: './NOVENO/4-9-TIC.html?v=1.0', desc: 'Propiedad intelectual, copyleft y la lucha por el conocimiento abierto en la era digital.' },
            { id: 5, title: 'Sesión 5: Ingeniería del Documento', file: './NOVENO/5-9-TIC.html?v=1.0', desc: 'Dominando la estructura técnica y profesional de los trabajos académicos bajo normas APA 7.' },
            { id: 6, title: 'Sesión 6: El Arte de Citar', file: './NOVENO/6-9-TIC.html?v=1.0', desc: 'Construyendo el diálogo de saberes: Tipos de citas, honestidad académica y gestores de referencias.' },
            { id: 7, title: 'Sesión 7: Biopolítica y Biotecnología', file: './NOVENO/7-9-TIC.html?v=1.0', desc: '¿Hechos de datos? Reflexiones éticas sobre CRISPR, patentes biológicas y el control de los cuerpos.' },
            { id: 8, title: 'Sesión 8: Algoritmos y Sesgos', file: './NOVENO/8-9-TIC.html?v=1.0', desc: 'Justicia algorítmica: ¿Son neutrales las máquinas? Descubriendo los prejuicios ocultos en el código.' },
            { id: 9, title: 'Sesión 9: IA Generativa', file: './NOVENO/9-9-TIC.html?v=1.0', desc: 'Crear en la era de los LLM: ¿Aliado o amenaza para la creatividad humana?' },
            { id: 10, title: 'Sesión 10: El Gran Informe Final', file: './NOVENO/10-9-TIC.html?v=1.0', desc: 'Arquitectura del conocimiento aprendido. Es el momento de unir todos los hilos —ética, biopolítica e IA— en un documento sólido.' },
            { id: 11, title: 'Sesión 11: Discurso Propio', file: './NOVENO/11-9-TIC.html?v=1.0', desc: 'El poder de tu voz en la Infoesfera. Aprende a sustentar tus ideas con coherencia, pasión y rigor ético ante tu comunidad.' }
        ]
    },
    decimo: {
        theme: 'theme-coder', icon: '<i class="bx bx-code-block"></i>', title: 'Grado Décimo', subtitle: 'Ofimática Inteligente — Investigación, IA y Producción Documental',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Sesión 1: El Detective de Datos', file: './DECIMO/1-10-TIC.html?v=1.1', desc: 'Búsqueda Veraz en la Era de la IA: Cómo encontrar información real y evitar alucinaciones digitales.' },
            { id: 2, title: 'Sesión 2: El Cerebro Digital', file: './DECIMO/2-10-TIC.html?v=1.1', desc: 'Curaduría de Información: Gestiona tus fuentes y construye un segundo cerebro digital.' },
            { id: 3, title: 'Sesión 3: El Analista Veloz', file: './DECIMO/3-10-TIC.html?v=1.1', desc: 'Minería de Textos con IA: Domina la fórmula C.R.I.F. para obtener prompts perfectos.' },
            { id: 4, title: 'Sesión 4: El Arquitecto Documental', file: './DECIMO/4-10-TIC.html?v=1.1', desc: 'Dominando los Estilos en Word: Automatización, jerarquía documental y aplicación técnica de Normas APA 7.' },
            { id: 5, title: 'Sesión 5: El Anti-Plagio', file: './DECIMO/5-10-TIC.html?v=1.1', desc: 'Citación Automática en Word: Aprende a gestionar tus fuentes con ética y automatización bajo Normas APA 7.' },
            { id: 6, title: 'Sesión 6: El Escritor Centauro', file: './DECIMO/6-10-TIC.html?v=1.1', desc: 'Co-Redacción con IA: El pacto ético del Centauro y la transformación de la escritura humana.' },
            { id: 7, title: 'Sesión 7: La Evidencia Visual', file: './DECIMO/7-10-TIC.html?v=1.1', desc: 'Tablas y Figuras en APA 7: Dominando la visualización técnica de datos y la integración profesional Excel-Word.' },
            { id: 8, title: 'Sesión 8: La Venta Visual', file: './DECIMO/8-10-TIC.html?v=1.1', desc: 'Diapositivas de Alto Impacto con IA: Domina la Regla 10/20/30 y las herramientas Gamma/Canva para un pitch exitoso.' },
            { id: 9, title: 'Sesión 9: El Video-Pitch', file: './DECIMO/9-10-TIC.html?v=1.1', desc: 'Vender en 60 Segundos: Domina la oratoria digital y la economía de la atención para persuadir con tu proyecto.' },
            { id: 10, title: 'Sesión 10: Prueba de Desempeño', file: './DECIMO/10-10-TIC.html?v=1.2', desc: 'Examen Global: Demuestra tu transformación de consumidor ciego a Auditor Crítico de IA e Ingeniería Documental.' }
        ]
    },
    grados: {
        theme: 'theme-etico', icon: '<i class="bx bx-grid-alt"></i>', title: 'Selecciona tu Grado', subtitle: 'Elige tu nivel para acceder a los contenidos interactivos',
        features: [ 
            { icon: 'bx bx-book-open', title: 'Grado Octavo', desc: 'Electrónica, Robótica y Maker.', action: "navigateTo('octavo')" }, 
            { icon: 'bx bx-laptop', title: 'Grado Noveno', desc: 'Ética Digital y Pensamiento Crítico.', action: "navigateTo('noveno')" },
            { icon: 'bx bx-code-block', title: 'Grado Décimo', desc: 'Ofimática Inteligente e IA.', action: "navigateTo('decimo')" },
            { icon: 'bx bx-code-alt', title: 'Grado Undécimo', desc: 'Ingeniería Editorial y Proyectos TIC.', action: "navigateTo('undecimo')" }
        ]
    },
    undecimo: {
        theme: 'theme-coder', icon: '<i class="bx bx-code-alt"></i>', title: 'Grado Undécimo', subtitle: 'IA Aplicada — Co-creación Editorial y Autoría en la Era del Centauro',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Sesión 1: El Fin del Autor', file: './UNDECIMO/1-11-TIC.html?v=1.0', desc: 'Inteligencia Artificial y Robots: Una reflexión sobre la soberanía intelectual y el nuevo rol del humano en la Infoesfera.' },
            { id: 2, title: 'Sesión 2: Ingeniería de Prompts', file: './UNDECIMO/2-11-TIC.html?v=1.1', desc: 'El Arte de Pedir: Domina la fórmula C.R.I.F. y el principio GIGO para programar la IA con lenguaje humano y estructurar tu libro.' },
            { id: 3, title: 'Sesión 3: Escritura Centauro', file: './UNDECIMO/3-11-TIC.html?v=1.1', desc: 'Co-creando el Primer Capítulo: Domina el flujo Semilla-Expansión-Edición y aplica la regla del 30% para humanizar el contenido de tu libro.' },
            { id: 4, title: 'Sesión 4: Cazadores de Alucinaciones', file: './UNDECIMO/4-11-TIC.html?v=1.1', desc: 'Control de Calidad: Aprende a detectar datos falsos, podar "vicios de robot" y verificar fuentes para asegurar la veracidad de tu libro digital.' },
            { id: 5, title: 'Sesión 5: Diseño Editorial', file: './UNDECIMO/5-11-TIC.html?v=1.1', desc: 'Del Manuscrito al Libro: Domina la maquetación profesional, el uso de tipografías técnicas y la configuración A5 para la impresión de tu obra.' },
            { id: 6, title: 'Sesión 6: Ingeniería Editorial', file: './UNDECIMO/6-11-TIC.html?v=1.1', desc: 'Secciones y Paginación: Domina los saltos de sección y la desvinculación para crear una estructura académica con numeración romana y arábiga profesional.' },
            { id: 7, title: 'Sesión 7: Licencias y Autoría', file: './UNDECIMO/7-11-TIC.html?v=1.1', desc: 'Manifiesto del Autor: Aprende a proteger tu obra con Creative Commons y configura la página legal y los metadatos de tu libro digital.' },
            { id: 8, title: 'Sesión 8: Marketing Editorial', file: './UNDECIMO/8-11-TIC.html?v=1.1', desc: 'El Pitch y el BookTrailer: Domina la fórmula A.I.D.A. y el arte de la persuasión ética para vender tu obra en 60 segundos.' },
            { id: 9, title: 'Sesión 9: La Feria del Libro', file: './UNDECIMO/9-11-TIC.html?v=1.1', desc: 'Speed Dating Literario: Presenta tu obra ante "inversores", defiende tu autoría ética y cierra el ciclo de la Ofimática Cognitiva.' },
            { id: 10, title: 'Sesión 10: Prueba de Desempeño', file: './UNDECIMO/10-11-TIC.html?v=1.0', desc: 'Examen Global de Grado Undécimo: Validando competencias en IA y Programación.' },
            { id: 11, title: 'Sesión 11: Auditoría del Libro Final', file: './UNDECIMO/11-11-TIC.html?v=1.2', desc: 'Laboratorio de Auditoría IA: Sube tu libro PDF, recibe feedback instantáneo y envía tu reporte al profesor por WhatsApp.' }
        ]
    },
    interes: {
        theme: 'theme-academico', icon: '<i class="bx bx-bulb"></i>', title: 'Centro de Interés y Publicaciones', subtitle: 'Semilleros y Publicaciones Académicas',
        features: [ 
            { icon: 'bx bxl-facebook-circle', title: 'Comunidad ConectaTE', desc: '¡Únete a nuestro Fan Page oficial! Proyectos, noticias y participación activa.', action: 'openSocialModal' },
            { icon: 'bx bx-book-open', title: 'CosmoTEC fascículo 1', desc: 'Explora la primera edición de nuestra revista digital de tecnología.', url: 'https://canva.link/l9hyanky8wmy4ms' }, 
            { icon: 'bx bx-book-reader', title: 'CosmoTEC fascículo 2', desc: 'Segunda entrega: Innovación y pensamiento crítico en la Infoesfera.', url: 'https://canva.link/1qbbzprtgo1sf90' }
        ]
    },
    herramientas: {
        theme: 'theme-maker', icon: '<i class="bx bx-wrench"></i>', title: 'Caja de Herramientas', subtitle: 'Accesos Directos a Plataformas Educativas',
        features: [ 
            { icon: 'bx bx-code-block', title: 'Scratch', desc: 'Plataforma oficial de programación visual por bloques del MIT.', url: 'https://scratch.mit.edu/' },
            { icon: 'bx bx-chip', title: 'MakeCode', desc: 'Entorno de Microsoft para programar micro:bit y kits de robótica.', url: 'https://makecode.microbit.org/' },
            { icon: 'bx bx-package', title: 'Cardboard LOFI', desc: 'Herramienta de programación visual para proyectos LOFI Robot.', url: 'https://cardboard.lofirobot.com/' },
            { icon: 'bx bx-cube', title: 'Tinkercad', desc: 'Simulador 3D y de circuitos electrónicos online.', url: 'https://www.tinkercad.com/' },
            { icon: 'bx bx-brush', title: 'Canva / Figma', desc: 'Diseño gráfico avanzado y prototipado colaborativo.', url: 'https://www.canva.com/' }
        ]
    },
    proyectos: {
        theme: 'theme-maker', icon: '<i class="bx bx-trophy"></i>', title: 'Galeria de Proyectos TIC', subtitle: 'Exhibición de Innovación Estudiantil',
        isProjects: true
    }
};

// --- BASE DE DATOS DE PROYECTOS (con persistencia localStorage) ---
const PROJECTS_STORAGE_KEY = 'conectate_tic_projects_v2';

const defaultProjects = [
    { 
        id: 1, 
        title: 'Eco-Solar Connect', 
        student: 'Maicol & Valentina (9-2)', 
        tag: 'samsung', 
        tagLabel: 'Solve for Tomorrow', 
        desc: 'Sistema de riego inteligente alimentado por energía solar.', 
        link: 'https://facebook.com/post/1',
        isDefault: true
    },
    { 
        id: 2, 
        title: 'Brazo Robótico Inforg', 
        student: 'Juan Camilo (8-4)', 
        tag: 'energia', 
        tagLabel: 'Feria Energía Pereira', 
        desc: 'Prototipo de prótesis de bajo costo controlada por sensores.', 
        link: 'https://facebook.com/post/2' 
    },
    { 
        id: 3, 
        title: 'App Contra el Ciberacoso', 
        student: 'Grupo 10-1', 
        tag: 'colegio', 
        tagLabel: 'Feria Colegio', 
        desc: 'Plataforma de denuncia anónima y apoyo emocional escolar.', 
        link: 'https://facebook.com/post/3',
        isDefault: true
    }
];

function saveProjects() {
    // Solo guardamos los proyectos creados por usuarios (no los default)
    const userProjects = ticProjects.filter(p => !p.isDefault);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(userProjects));
}

function loadProjects() {
    try {
        const saved = JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY)) || [];
        // Fusionar: proyectos default primero, luego los del usuario al inicio
        ticProjects = [...saved, ...defaultProjects];
    } catch(e) {
        ticProjects = [...defaultProjects];
    }
}

// Cargar proyectos al iniciar
loadProjects();

// DOM Elements
const sidebarMenus = document.getElementById('sidebar-menus');
const mainNav = document.getElementById('main-nav');
const mainViewer = document.getElementById('agent-content');
const themeToggleBtn = document.getElementById('theme-toggle');

let secNavElement = null;

// Core navigation function
function navigateTo(sectionId) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const picker = document.getElementById('mobile-grade-picker');

    // Deseleccionar todo
    document.querySelectorAll('.nav-btn, .m-btn').forEach(btn => btn.classList.remove('active'));

    const data = sectionData[sectionId];
    if (!data) return;

    // Activar estados de botones comunes
    document.querySelectorAll(`[data-content="${sectionId}"]`).forEach(b => b.classList.add('active'));

    if (data.isSessions) {
        // Mostrar selector de periodos ANTES de las sesiones
        renderPeriodSelector(sectionId);
    } else if (data.isProjects) {
        renderProjectsGallery();
    } else {
        if (secNavElement) {
            secNavElement.remove();
            secNavElement = null;
            if(mainNav) mainNav.style.display = 'flex';
        }
        renderSectionInfo(sectionId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSectionInfo(sectionId) {
    const data = sectionData[sectionId];
    mainViewer.style.animation = 'none';
    mainViewer.offsetHeight;

    let html = `
        <div class="agent-viewer ${data.theme}">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel">${data.icon}</div>
                <div class="agent-header-text">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
            </div>
            <div class="dashboard-grid">
    `;

    if (data.features) {
        data.features.forEach(f => {
            let actionAttr = '';
            if (f.action) {
                // Si ya tiene paréntesis, lo usamos tal cual; si no, añadimos ()
                actionAttr = `onclick="${f.action}${f.action.includes('(') ? '' : '()'}"`;
            } else if (f.url) {
                actionAttr = `onclick="window.location.href='${f.url}'"`;
            }
            
            const interactiveStyle = (f.action || f.url) ? 'border: 1px solid rgba(139, 92, 246, 0.3); cursor: pointer;' : '';
            
            html += `
                <div class="feature-card glass-panel" ${actionAttr} style="margin-bottom: 12px; ${interactiveStyle}">
                    <i class="${f.icon}"></i>
                    <h3>${f.title}</h3>
                    <p style="font-size: 0.85rem;">${f.desc}</p>
                    ${(f.action || f.url) ? '<span style="font-size: 0.7rem; color: var(--accent-purple); font-weight: bold; margin-top: 10px; display: block;">CLICK PARA ABRIR</span>' : ''}
                </div>`;
        });
    }

    html += `</div>`;

    // Inyectar sección de noticias si es HOME
    if (sectionId === 'home') {
        html += `
        <div class="news-section">
            <div class="news-header">
                <h3><i class='bx bx-news'></i> Pulso EduTech: Noticias de hoy</h3>
                <span class="news-badge">IA & Innovación</span>
            </div>
            <div id="news-container" class="news-grid">
                <div class="news-skeleton">
                    <i class='bx bx-loader-alt bx-spin'></i> Escaneando satélites por noticias frescas...
                </div>
            </div>
        </div>`;
    }

    html += `</div>`;
    mainViewer.innerHTML = html;
    mainViewer.style.animation = 'fadeIn 0.5s ease forwards';
    
    if (sectionId === 'home') {
        loadEduTechNews();
    }
}

function renderSessionDetail(sessionData, gradeData, gradeId) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    mainViewer.style.display = 'block';
    mainViewer.innerHTML = `
        <div class="agent-viewer ${gradeData.theme}">
            <div class="agent-header" style="${isMobile ? 'flex-direction: column; text-align: center;' : ''}">
                <button onclick="navigateTo('${gradeId || 'home'}')" style="align-self: flex-start; background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px 15px; border-radius: 8px; margin-bottom: 15px; display: ${isMobile ? 'flex' : 'none'}; align-items: center; gap: 5px;">
                    <i class='bx bx-chevron-left'></i> Volver
                </button>
                <div class="agent-icon-large glass-panel" style="${isMobile ? 'margin: 0 auto 15px;' : ''}"><i class='bx bx-book-reader'></i></div>
                <div class="agent-header-text">
                    <h2>${gradeData.title} | Sesión ${sessionData.id}</h2>
                    <p>Guía de Aprendizaje Activo</p>
                </div>
            </div>
            <div class="feature-card glass-panel" style="max-width: 700px; margin: 20px auto; padding: ${isMobile ? '25px' : '40px'}; text-align: center;">
                <i class='bx bx-brain' style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;"></i>
                <h3>${sessionData.title}</h3>
                <p style="margin-bottom: 30px; line-height: 1.6;">${sessionData.desc}</p>
                <a href="${sessionData.file}" class="glass-panel" style="display: inline-flex; width: 100%; align-items: center; justify-content: center; gap: 10px; padding: 18px 30px; background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">
                    <i class='bx bx-window-open'></i> ABRIR CUADERNO
                </a>
            </div>
        </div>`;
}

// --- VISTA DE PERIODOS ---
function renderPeriodSelector(gradeId) {
    const gradeData = sectionData[gradeId];
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // Limpiar sidebar secundario
    if (secNavElement) {
        secNavElement.remove();
        secNavElement = null;
        if(mainNav) mainNav.style.display = 'flex';
    }

    const totalSessions = gradeData.sessions.length;
    
    let periodsHTML = '';
    Object.entries(ACADEMIC_CONFIG.periods).forEach(([pId, pConfig]) => {
        const isActive = pConfig.status === 'active';
        const gradientBg = isActive 
            ? 'background: linear-gradient(135deg, rgba(168,85,247,0.12), rgba(34,211,238,0.08));' 
            : 'background: rgba(255,255,255,0.015);';
        const borderStyle = isActive 
            ? 'border: 1px solid rgba(168,85,247,0.4);' 
            : 'border: 1px solid rgba(255,255,255,0.06);';
        const cursorStyle = isActive ? 'cursor: pointer;' : 'cursor: not-allowed;';
        const opacityStyle = isActive ? '' : 'opacity: 0.5;';
        const hoverClass = isActive ? 'period-card-active' : '';
        const onClickAction = isActive ? `onclick="renderSubMenu('${gradeId}')"` : '';

        const statusBadge = isActive 
            ? '<span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; background: rgba(16,185,129,0.2); color: #10b981; text-transform: uppercase; letter-spacing: 1px;">Activo</span>'
            : '<span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; background: rgba(100,116,139,0.2); color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">En Construcción</span>';

        const contentInfo = isActive 
            ? `<p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">${totalSessions} sesiones interactivas + Evaluación final</p>`
            : '<p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">Contenido disponible próximamente</p>';

        periodsHTML += `
            <div class="feature-card glass-panel ${hoverClass}" ${onClickAction}
                 style="padding: 30px; text-align: center; border-radius: 20px; ${gradientBg} ${borderStyle} ${cursorStyle} ${opacityStyle} transition: all 0.3s ease; position: relative; overflow: hidden;">
                ${isActive ? '<div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #a855f7, #22d3ee);"></div>' : ''}
                <i class='bx ${pConfig.icon}' style="font-size: 2.5rem; color: ${pConfig.color}; margin-bottom: 12px; display: block;"></i>
                ${statusBadge}
                <h3 style="margin: 12px 0 5px; font-family: var(--font-heading); font-size: 1.3rem;">${pConfig.label}</h3>
                ${contentInfo}
                ${isActive ? '<div style="margin-top: 15px; display: inline-flex; align-items: center; gap: 6px; color: #a855f7; font-weight: 600; font-size: 0.9rem;"><i class=\'bx bx-right-arrow-alt\'></i> Entrar al Periodo</div>' : ''}
            </div>`;
    });

    const backTarget = isMobile ? 'grados-picker' : 'home';

    mainViewer.innerHTML = `
        <div class="agent-viewer ${gradeData.theme}">
            <div class="agent-header" style="${isMobile ? 'flex-direction: column; text-align: center;' : ''}">
                <button onclick="navigateTo('${backTarget}')" style="align-self: flex-start; background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px 15px; border-radius: 8px; margin-bottom: 15px; display: ${isMobile ? 'flex' : 'none'}; align-items: center; gap: 5px;">
                    <i class='bx bx-chevron-left'></i> Volver
                </button>
                <div class="agent-icon-large glass-panel" style="${isMobile ? 'margin: 0 auto 15px;' : ''}">${gradeData.icon}</div>
                <div class="agent-header-text">
                    <h2>${gradeData.title}</h2>
                    <p>${gradeData.subtitle}</p>
                </div>
            </div>

            <h3 style="font-family: var(--font-heading); margin-bottom: 20px; color: var(--text-secondary); font-size: 1rem; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px;">
                <i class='bx bx-calendar'></i> Periodos Académicos ${ACADEMIC_CONFIG.year}
            </h3>

            <div class="dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding-bottom: 50px;">
                ${periodsHTML}
            </div>
        </div>
    `;
}

function renderSubMenu(sectionId) {
    const gradeData = sectionData[sectionId];
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (secNavElement) secNavElement.remove();

    if (isMobile) {
        mainViewer.style.display = 'block';
        let html = `
            <div class="agent-viewer ${gradeData.theme}">
                <div class="agent-header" style="flex-direction: column; text-align: center;">
                    <button onclick="renderPeriodSelector('${sectionId}')" style="align-self: flex-start; background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px 15px; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 5px;">
                        <i class='bx bx-chevron-left'></i> Volver a Periodos
                    </button>
                    <div class="agent-icon-large glass-panel" style="margin: 0 auto 15px;">${gradeData.icon}</div>
                    <h2>${gradeData.title} — ${ACADEMIC_CONFIG.periods[ACADEMIC_CONFIG.currentPeriod].label}</h2>
                </div>
                <div class="dashboard-grid" style="grid-template-columns: 1fr; gap: 12px; padding-bottom: 50px;">
        `;
        gradeData.sessions.forEach(s => {
            html += `
                <div class="feature-card glass-panel" onclick='renderSessionDetail(${JSON.stringify(s)}, ${JSON.stringify(gradeData)}, "${sectionId}")' style="display: flex; align-items: center; gap: 15px; padding: 15px; text-align: left;">
                    <div style="background: rgba(255,255,255,0.1); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${s.id}</div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0;">${s.title}</h4>
                    </div>
                    <i class='bx bx-chevron-right'></i>
                </div>`;
        });
        mainViewer.innerHTML = html + `</div></div>`;
        return;
    }

    const secNav = document.createElement('nav');
    secNav.className = 'agent-nav';
    secNav.innerHTML = `<button class="nav-btn" onclick="renderPeriodSelector('${sectionId}')" style="margin-bottom: 10px; background: rgba(255,255,255,0.1);"><i class='bx bx-chevron-left'></i><span>« Periodos</span></button><p class="nav-title">${ACADEMIC_CONFIG.periods[ACADEMIC_CONFIG.currentPeriod].label.toUpperCase()}</p>`;
    gradeData.sessions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerHTML = `<i class='bx bx-circle'></i><span>Sesión ${s.id}: ${s.title}</span>`;
        btn.onclick = () => renderSessionDetail(s, gradeData, sectionId);
        secNav.appendChild(btn);
    });
    if(mainNav) mainNav.style.display = 'none';
    sidebarMenus.appendChild(secNav);
    secNavElement = secNav;
    renderSessionDetail(gradeData.sessions[0], gradeData, sectionId);
}

// Global Event Listeners
document.querySelectorAll('.nav-btn, .m-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-content');
        if (sid) navigateTo(sid);
    });
});

const themes = ['default', 'light-mode', 'theme-cyber', 'theme-aurora', 'theme-eink'];
const themeIcons = ['bx-moon', 'bx-sun', 'bx-terminal', 'bx-planet', 'bx-book-reader'];

let currentThemeIndex = parseInt(localStorage.getItem('conectate_themeIndex')) || 0;

function applyTheme(index) {
    // Remove all old classes
    themes.forEach(t => {
        if (t !== 'default') {
            document.body.classList.remove(t);
            document.documentElement.classList.remove(t);
        }
    });

    // Add new class
    const nextClass = themes[index];
    if (nextClass !== 'default') {
        document.body.classList.add(nextClass);
        document.documentElement.classList.add(nextClass);
    }
    
    // Update iconic if btn exists
    if(themeToggleBtn) {
        themeToggleBtn.innerHTML = `<i class='bx ${themeIcons[index]}'></i>`;
    }
}

// Initial application on load
applyTheme(currentThemeIndex);

if(themeToggleBtn) {
    themeToggleBtn.onclick = () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(currentThemeIndex);
        localStorage.setItem('conectate_themeIndex', currentThemeIndex);
        
        // Sincronizar con el sistema de Gamificación
        const user = JSON.parse(localStorage.getItem('conectate_user'));
        if (user) {
            user.themeIndex = currentThemeIndex;
            localStorage.setItem('conectate_user', JSON.stringify(user));
        }
    };
}

// Home Button (Top Bar) + Logo (Sidebar) → Navigate to Home
function goHome() {
    // Restaurar sidebar original (quitar sesiones si estaban visibles)
    const secNav = document.getElementById('session-nav');
    if (secNav) secNav.remove();
    if (mainNav) mainNav.style.display = '';
    // Navegar al home
    navigateTo('home');
}

const homeBtn = document.getElementById('home-btn');
if (homeBtn) homeBtn.addEventListener('click', goHome);

const logoHomeBtn = document.getElementById('logo-home-btn');
if (logoHomeBtn) logoHomeBtn.addEventListener('click', goHome);

// Update App Skill System (La Campana)
const updateBtn = document.getElementById('update-app-btn');
const updateDot = document.getElementById('update-dot');

// Simulamos una detección de "nueva versión" al cabo de unos segundos
setTimeout(() => { if(updateDot) updateDot.style.display = 'block'; }, 2000);

if (updateBtn) {
    updateBtn.onclick = () => {
        const confirmUpdate = confirm("¿Deseas buscar y aplicar las últimas actualizaciones de CONECTATE? La página se recargará.");
        
        if (confirmUpdate) {
            // Skill de Limpieza Profunda
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (let reg of registrations) reg.unregister();
                });
            }
            if ('caches' in window) {
                caches.keys().then(names => {
                    for (let name of names) caches.delete(name);
                });
            }
            
            // Forzamos recarga total
            window.location.reload(true);
        }
    };
}

// Experiencia Inmersiva: Perfil del Docente (Notebook)
function openProfile() {
    window.location.href = './DOCENTE/perfil-profesor.html';
}

function closeProfile() {
    // Reducción de deuda técnica: Modal reemplazado por Cuaderno
}

// Cierre al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
    const modal = document.getElementById('profile-modal');
    if (e.target === modal) closeProfile();
});

function openTeslaVocational() {
    window.triggerTeslaContext('vocational');
}

function openTeslaPotential() {
    window.triggerTeslaContext('personal');
}

// Init Load con soporte para URL params
const urlParams = new URLSearchParams(window.location.search);
const startSection = urlParams.get('section') || 'home';
navigateTo(startSection);

// --- SISTEMA GLOBAL DE ACCESIBILIDAD PARA MODALES ---
let _lastFocusedElement = null; // Para restaurar el foco al cerrar

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Guardar el foco anterior para restaurarlo al cerrar
    _lastFocusedElement = document.activeElement;

    // Atributos ARIA
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    // Activar con animación
    setTimeout(() => modal.classList.add('active'), 10);

    // Mover el foco al primer elemento interactivo dentro del modal
    setTimeout(() => {
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length) focusable[0].focus();
    }, 50);
}

function closeModal(id, onClose) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Restaurar el foco al elemento que abrió el modal
    if (_lastFocusedElement) {
        _lastFocusedElement.focus();
        _lastFocusedElement = null;
    }

    setTimeout(() => {
        modal.remove();
        if (typeof onClose === 'function') onClose();
    }, 300);
}

// Cerrar cualquier modal activo con Escape
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // Buscar el modal activo más reciente
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal && activeModal.id) {
        closeModal(activeModal.id);
    }
});

function openSocialModal() {
    const modalHtml = `
        <div class="modal-overlay" id="social-modal" onclick="closeSocialModal()" role="dialog" aria-modal="true" aria-label="Semillero ConectaTE">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeSocialModal()" aria-label="Cerrar"><i class='bx bx-x'></i></button>
                <img src="IMAGENES/LOGO CONECTATE.png" alt="Logo ConectaTE" class="profile-img-large" style="border-color: #1877f2; border-radius: 20px; padding: 10px;">
                <h2 style="color: white; margin-bottom: 10px;">Semillero ConectaTE</h2>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 25px;">
                    ¡Bienvenido a nuestra comunidad digital! En nuestro Fan Page de Facebook compartimos los avances de investigación, 
                    proyectos de robótica y todas las actividades del semillero ConectaTE del Sor María Juliana.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://www.facebook.com/conectate.2024" target="_blank" rel="noopener" class="cv-button" style="background: linear-gradient(135deg, #1877f2, #0a52b5);">
                        <i class='bx bxl-facebook-circle'></i> SEGUIR EN FACEBOOK
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    openModal('social-modal');
}

function closeSocialModal() {
    closeModal('social-modal');
}

// --- SISTEMA DE GALERÍA DE PROYECTOS TIC ---
function renderProjectsGallery(filter = 'all') {
    const data = sectionData.proyectos;
    mainViewer.innerHTML = `
        <div class="agent-viewer ${data.theme}">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel">${data.icon}</div>
                <div class="agent-header-text">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
            </div>

            <!-- Barra de Filtros -->
            <div class="filter-bar no-scrollbar">
                <button class="filter-btn ${filter === 'all' ? 'active' : ''}" onclick="renderProjectsGallery('all')">Todos</button>
                <button class="filter-btn ${filter === 'samsung' ? 'active' : ''}" onclick="renderProjectsGallery('samsung')">Samsung</button>
                <button class="filter-btn ${filter === 'energia' ? 'active' : ''}" onclick="renderProjectsGallery('energia')">Energía Pereira</button>
                <button class="filter-btn ${filter === 'colegio' ? 'active' : ''}" onclick="renderProjectsGallery('colegio')">Feria Colegio</button>
                <button class="filter-btn ${filter === 'aula' ? 'active' : ''}" onclick="renderProjectsGallery('aula')">Proyecto Aula</button>
            </div>

            <div class="dashboard-grid" id="projects-grid">
                <!-- Proyectos se insertan aquí -->
            </div>

            <button class="fab-btn" onclick="openAddProjectModal()" title="Registrar Proyecto">
                <i class='bx bx-plus'></i>
            </button>
        </div>
    `;

    const grid = document.getElementById('projects-grid');
    const filtered = filter === 'all' ? ticProjects : ticProjects.filter(p => p.tag === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; opacity: 0.6; padding: 50px;">Aún no hay proyectos registrados en esta categoría. ¡Sube el tuyo!</p>`;
    } else {
        filtered.forEach(p => {
            const tagClass = `tag-${p.tag}`;
            const deleteBtn = !p.isDefault 
                ? `<button onclick="deleteProject(${p.id})" style="position:absolute; top:10px; right:10px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#ef4444; border-radius:8px; padding:4px 8px; cursor:pointer; font-size:0.75rem;"><i class='bx bx-trash'></i></button>`
                : '';
            grid.innerHTML += `
                <div class="project-card glass-panel" style="position:relative;">
                    ${deleteBtn}
                    <div class="badge ${tagClass}">${p.tagLabel}</div>
                    <h3>${p.title}</h3>
                    <p class="project-author">Por: ${p.student}</p>
                    <p class="project-desc">${p.desc}</p>
                    <a href="${p.link}" target="_blank" rel="noopener" class="cv-button project-link">
                        <i class='bx bxl-facebook-circle'></i> VER EN FACEBOOK
                    </a>
                </div>
            `;
        });
    }
}

function deleteProject(id) {
    ticProjects = ticProjects.filter(p => p.id !== id);
    saveProjects();
    renderProjectsGallery();
    showToast('Proyecto eliminado.', 'info');
}

function openAddProjectModal() {
    const modalHtml = `
        <div class="modal-overlay active" id="project-form-modal" onclick="closeProjectModal()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 550px;">
                <button class="modal-close" onclick="closeProjectModal()"><i class='bx bx-x'></i></button>
                <h2 style="color: white; margin-bottom: 5px;">Postea tu Proyecto TIC</h2>
                <p style="color: rgba(255,255,255,0.6); margin-bottom: 25px; font-size: 0.9rem;">Comparte tu innovación con la comunidad.</p>
                
                <form id="project-form" style="text-align: left;">
                    <div class="form-group">
                        <label>Nombre del Proyecto</label>
                        <input type="text" id="p-title" required placeholder="Ej: Robot Reciclador">
                    </div>
                    <div class="form-group">
                        <label>Estudiantes / Grado</label>
                        <input type="text" id="p-student" placeholder="Ej: Diana & Carlos (11-1)" required>
                    </div>
                    <div class="form-group">
                        <label>Categoría</label>
                        <select id="p-tag">
                            <option value="samsung">Solve for Tomorrow (Samsung)</option>
                            <option value="energia">Feria Energía de Pereira</option>
                            <option value="colegio">Feria de Ciencias Colegio</option>
                            <option value="aula" selected>Proyecto de Aula</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <label style="margin-bottom: 0;">Breve Descripción</label>
                            <button type="button" class="refine-btn" onclick="refineProjectText()" title="Pulir Redacción con IA">
                                <i class='bx bx-magic-wand'></i> Redacción IA
                            </button>
                        </div>
                        <textarea id="p-desc" maxlength="150" required placeholder="Describe brevemente de qué trata tu proyecto..."></textarea>
                        <p id="refine-status" style="font-size: 0.7rem; color: var(--accent-cyan); display: none; margin-top: 5px;">
                            <i class='bx bx-loader-alt bx-spin'></i> Optimizando tu texto...
                        </p>
                    </div>
                    <div class="form-group">
                        <label>Enlace Facebook (Video o Post)</label>
                        <input type="url" id="p-link" placeholder="https://facebook.com/..." required>
                    </div>
                    
                    <button type="submit" class="cv-button" style="width: 100%; justify-content: center; padding: 15px;">
                        PUBLICAR MI PROYECTO <i class='bx bx-send'></i>
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    openModal('project-form-modal'); // Accesibilidad automática
    
    document.getElementById('project-form').onsubmit = (e) => {
        e.preventDefault();
        const newProj = {
            id: Date.now(),
            title: document.getElementById('p-title').value,
            student: document.getElementById('p-student').value,
            tag: document.getElementById('p-tag').value,
            tagLabel: document.getElementById('p-tag').options[document.getElementById('p-tag').selectedIndex].text.split(' (')[0],
            desc: document.getElementById('p-desc').value,
            link: document.getElementById('p-link').value,
            isDefault: false
        };
        
        ticProjects.unshift(newProj);
        saveProjects(); // ← Persistencia real
        closeProjectModal();
        renderProjectsGallery();
        showToast('¡Proyecto publicado y guardado! Aparecerá siempre que visites esta sección.', 'info');
    };
}

function closeProjectModal() {
    closeModal('project-form-modal');
}

// refineProjectText definida abajo (versión con null-checks)

// --- SKILL: ESCÁNER DE NOTICIAS IA ---
async function loadEduTechNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    const CACHE_VERSION = 'v5'; 
    const CACHE_KEY = `edutech_news_cache_${CACHE_VERSION}`;
    const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";
    
    // FALLBACK: Noticias permanentes para modo offline o error de cuota
    const fallbackNews = [
        {
            title: "CONECTATE Offline: Estabilidad del Sistema",
            summary: "El sistema ha activado el modo de contingencia local. Sigue explorando los recursos y notebooks sin interrupciones.",
            url: "https://alvarocardenasorozco.com",
            source: "Núcleo CONECTATE"
        },
        {
            title: "IA en Educación: El Futuro es Crítico",
            summary: "¿Cómo la IA reconfigura nuestro aprendizaje? Mantente al día con los notebooks de Octavo a Undécimo.",
            url: "https://alvarocardenasorozco.com",
            source: "EduTech News"
        }
    ];

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            renderNewsFlashcards(parsed.data);
            // Si el caché tiene menos de 12 horas, no intentamos fetch nuevo para ahorrar créditos
            if (Date.now() - parsed.timestamp < 12 * 60 * 60 * 1000) return;
        } catch(e) {}
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "system_instruction": {
                    "parts": [{ "text": "Eres el News Curator de CONECTATE. Genera JSON array con 5 noticias reales de IA y educación: [{'title','summary','url','source'}]." }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": "Noticias hoy." }] }],
                "generationConfig": { "response_mime_type": "application/json" }
            })
        });

        if (response.status === 429) throw new Error("QUOTA_EXCEEDED");
        if (!response.ok) throw new Error("NETWORK_ERROR");

        const data = await response.json();
        let newsText = data.candidates[0].content.parts[0].text.trim();
        if (newsText.includes('```')) {
            const match = newsText.match(/\[[\s\S]*\]/);
            newsText = match ? match[0] : newsText;
        }

        const news = JSON.parse(newsText);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: news }));
        renderNewsFlashcards(news);

    } catch (error) {
        console.warn("Modo Resiliencia Activo:", error.message);
        if (!newsContainer.innerHTML || newsContainer.innerHTML.includes('loading-wave')) {
            renderNewsFlashcards(fallbackNews);
        }
        if (error.message === "QUOTA_EXCEEDED") {
            showToast("IA en mantenimiento (Créditos agotados). Modo Offline activo.", "info");
        }
    }
}

function renderNewsFlashcards(news) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    
    // Obtener lista de noticias leídas
    const readLinks = JSON.parse(localStorage.getItem('edutech_read_links')) || [];
    
    newsContainer.innerHTML = news.map((item, index) => {
        const isRead = readLinks.includes(item.url);
        const readClass = isRead ? 'is-read' : '';
        
        return `
        <div class="news-card glass-panel fade-in ${readClass}" style="animation-delay: ${index * 0.1}s">
            <div class="news-content" onclick="handleNewsClick('${item.url}')">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h4>${item.title}</h4>
                    <i class='bx bx-link-external' style="color: var(--accent-cyan); font-size: 1.1rem; opacity: 0.6;"></i>
                </div>
                <p>${item.summary}</p>
            </div>
            <div class="news-footer">
                <div style="display: flex; align-items: center; gap: 8px; color: var(--accent-cyan); font-size: 0.75rem; font-weight: 700;">
                    <i class='bx bx-globe'></i> ${item.source || 'Portal TIC'}
                </div>
                <button class="news-action-btn" onclick="copyNewsLink('${item.url}', this)" title="Copiar enlace">
                    <i class='bx bx-share-alt'></i>
                </button>
            </div>
        </div>
    `;
    }).join('');
}

function handleNewsClick(url) {
    // 1. Marcar como leída automáticamente
    const readLinks = JSON.parse(localStorage.getItem('edutech_read_links')) || [];
    if (!readLinks.includes(url)) {
        readLinks.push(url);
        localStorage.setItem('edutech_read_links', JSON.stringify(readLinks));
    }
    
    // 2. Abrir noticia
    window.open(url, '_blank', 'noopener');
    
    // 3. Refrescar UI (si se vuelve atrás)
    const cachedData = localStorage.getItem('edutech_news_cache');
    if (cachedData) renderNewsFlashcards(JSON.parse(cachedData).data);
}

function copyNewsLink(url, btn) {
    navigator.clipboard.writeText(url).then(() => {
        const icon = btn.querySelector('i');
        const oldClass = icon.className;
        
        icon.className = 'bx bx-check';
        btn.classList.add('copied');
        
        setTimeout(() => {
            icon.className = oldClass;
            btn.classList.remove('copied');
        }, 2000);
    });
}


function openNotebook(file, title, id, grade) {
    window.location.href = file;
}

function updateUIForUser() {
    const userDetails = document.getElementById('static-profile-details');
    const userAvatar = document.getElementById('curator-avatar');
    
    if (userDetails) {
        userDetails.innerHTML = `
            <p class="name" style="margin-bottom: 2px;">Álvaro Cárdenas</p>
            <span class="admin-badge">Docente TIC</span>
            <p class="role">
                <a href="https://wa.me/573206324740" target="_blank" style="color: var(--accent-cyan); text-decoration: none; font-size: 0.8rem; font-weight: 700;">
                    <i class='bx bxl-whatsapp'></i> 3206324740
                </a>
            </p>
        `;
    }
    
    if (userAvatar) {
        userAvatar.src = currentUser.picture;
    }
}


// --- ASISTENTE DE REDACCIÓN IA (GE-MINI) ---
async function refineProjectText() {
    const descArea = document.getElementById('p-desc');
    const status = document.getElementById('refine-status');
    const text = descArea.value.trim();
    
    if (text.length < 10) {
        alert('Escribe un poco más antes de usar la Varita Mágica para que el Profe pueda ayudarte.');
        return;
    }

    if (status) status.style.display = 'block';
    
    const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "system_instruction": {
                    "parts": [{ "text": "Eres el Asistente Digital del Profesor Álvaro. Tu tarea es corregir la ortografía y mejorar la redacción de los proyectos TIC de los estudiantes. IMPORTANTE: Mantén el texto corto (máx 150 caracteres), formal pero inspirador, y siempre en SEGUNDA PERSONA o voz activa del proyecto. Solo devuelve el texto corregido, sin explicaciones ni saludos." }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": "Mejora este texto para mi proyecto: " + text }] }]
            })
        });

        if (!response.ok) throw new Error("Connection Error");
        const data = await response.json();
        const refined = data.candidates[0].content.parts[0].text.trim();
        
        descArea.value = refined;
        if (status) {
            status.innerHTML = "<i class='bx bx-check-circle'></i> ¡Redacción optimizada!";
            setTimeout(() => { status.style.display = 'none'; status.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Optimizando tu texto..."; }, 3000);
        }
        
    } catch (error) {
        console.error(error);
        if (status) {
            status.innerHTML = "<i class='bx bx-error-circle' style='color: #ef4444;'></i> Error al conectar con el Profe Álvaro.";
            setTimeout(() => { status.style.display = 'none'; }, 3000);
        }
    }
}

// --- BUSCADOR GLOBAL INTELIGENTE ---
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("global-search-input");
    const dropdown = document.getElementById("global-search-dropdown");

    if(!searchInput || !dropdown) return;

    // Abrir o cerrar dependiendo de si hay texto
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            dropdown.style.display = "none";
            return;
        }

        const results = searchInCurriculum(query);
        renderSearchResults(results, query);
    });

    // Cerrar si hace click afuera
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });
    
    // Abrir de nuevo si hace click en el input y tiene texto
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim().length >= 2) {
            dropdown.style.display = "block";
        }
    });

    function searchInCurriculum(query) {
        let matches = [];
        
        // Iterar en sectionData
        Object.keys(sectionData).forEach(gradeKey => {
            const gradeData = sectionData[gradeKey];
            if (gradeData.isSessions && gradeData.sessions) {
                gradeData.sessions.forEach(session => {
                    const titleMatch = session.title.toLowerCase().includes(query);
                    const descMatch = session.desc.toLowerCase().includes(query);
                    
                    if (titleMatch || descMatch) {
                        matches.push({
                            gradeId: gradeKey,
                            gradeTitle: gradeData.title,
                            icon: gradeData.icon,
                            session: session
                        });
                    }
                });
            }
        });
        
        return matches;
    }

    function renderSearchResults(results, query) {
        dropdown.style.display = "block";
        dropdown.innerHTML = "";
        
        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-empty-state"><i class="bx bx-ghost" style="font-size: 2rem; display:block; margin-bottom: 10px;"></i>No encontré resultados para "<strong>${query}</strong>"</div>`;
            return;
        }

        results.forEach(result => {
            const el = document.createElement("a");
            el.className = "search-result-item";
            
            // Re-escritura dinamica para solucionar rutas (script evalúa a index)
            // session.file ej: "./NOVENO/1-9-TIC.html"
            el.href = result.session.file.replace("./", ""); 
            
            el.innerHTML = `
                <div class="search-result-icon">
                    ${result.icon}
                </div>
                <div class="search-result-content">
                    <span class="search-result-badge">${result.gradeTitle}</span>
                    <h4>${highlightText(result.session.title, query)}</h4>
                    <p>${highlightText(result.session.desc, query)}</p>
                </div>
            `;
            dropdown.appendChild(el);
        });
    }

    function highlightText(text, highlight) {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, "gi");
        return text.replace(regex, "<span style=\"color: #a855f7; font-weight: bold; background: rgba(168,85,247,0.2); border-radius: 4px; padding: 0 2px;\">$1</span>");
    }
});
function showToast(message, type = 'info') {
    let toast = document.getElementById('conectate-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'conectate-toast';
        document.body.appendChild(toast);
    }
    
    toast.style.cssText = `
        position: fixed; bottom: 85px; right: 20px; 
        padding: 12px 24px; border-radius: 12px; 
        background: rgba(13, 14, 21, 0.95); backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1); color: white;
        z-index: 100000; font-family: var(--font-body); font-size: 0.9rem;
        display: flex; align-items: center; gap: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        transform: translateY(20px); opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    const icon = type === 'error' ? 'bx-error-circle' : 'bx-info-circle';
    const color = type === 'error' ? '#ef4444' : 'var(--accent-cyan)';
    
    toast.innerHTML = `<i class='bx ${icon}' style="color: ${color}; font-size: 1.2rem;"></i> ${message}`;
    toast.style.borderColor = color + '44';
    
    // Show
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });
    
    // Hide after 3s
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
    }, 3000);
}

// --- PUNTO DE ENTRADA (Fase 1: Restaurado) ---
window.onload = async () => {
    console.log("CONECTATE: Iniciando ecosistema simplificado...");
    
    // 1. Cargar perfil del docente
    if (typeof updateUIForUser === 'function') updateUIForUser();
    
    // 2. Configurar botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn, .m-btn');
    navButtons.forEach(btn => {
        btn.onclick = () => {
            const section = btn.dataset.content;
            if (section) navigateTo(section);
        };
    });

    // 3. Botones extra de Home
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) homeBtn.onclick = () => navigateTo('home');
    
    const logoHomeBtn = document.getElementById('logo-home-btn');
    if (logoHomeBtn) logoHomeBtn.onclick = () => navigateTo('home');

    // 4. Ir al inicio por defecto
    navigateTo('home');
    
    // 5. Cargar noticias (Fase 2 se encargará de la resiliencia)
    if (typeof loadEduTechNews === 'function') loadEduTechNews();
};
