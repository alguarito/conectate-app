// Database of Content by Sections
const APP_VERSION = '2.0';
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
            const account = accounts[email] || {};
            if (!account.isAdmin) {
                records.push({
                    email,
                    name: account.name || 'Sin nombre',
                    grade: charData.grade || 'N/A',
                    ...charData,
                    academic
                });
            }
        }
    });
    return records;
}

const sectionData = {
    home: {
        theme: 'theme-etico', icon: '<i class="bx bxs-home-heart"></i>', title: 'Bienvenido a CONECTATE', subtitle: 'IE Sor María Juliana - Tu Portal de Tecnología e Informática',
        features: [ 
            { icon: 'bx bx-user-circle', title: '¿Quién es tu Profesor?', desc: 'PhD. Álvaro Cárdenas Orozco, apasionado por las TIC y la educación crítica.', action: 'openProfile' }, 
            { icon: 'bx bx-rocket', title: 'Tu Ruta de Hoy', desc: 'Prepara tus guías, abre el simulador y mejora tu pensamiento computacional.' },
            { icon: 'bx bx-message-square-dots', title: 'Agente Tesla', desc: '¡Recuerda que tienes un asistente de IA siempre listo para ayudarte abajo a la derecha!' } 
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
            { id: 10, title: 'Sesión 10: Humanismo Digital', file: './NOVENO/10-9-TIC.html?v=1.0', desc: 'Hacia una tecnología al servicio de la vida: El manifiesto por un futuro digital ético y soberano.' },
            { id: 11, title: 'Sesión 11: Prueba de Desempeño', file: './NOVENO/11-9-TIC.html?v=1.0', desc: 'Examen Global de Periodo: Demuestra tu transformación de consumidor a Inforg Crítico.' }
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
            { icon: 'bx bxl-facebook-circle', title: 'Comunidad ConectaTE', desc: '¡Únete a nuestro Fan Page oficial! Proyectos, noticias y participación activa.', action: 'openSocialModal()' },
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

// --- BASE DE DATOS PROVISIONAL DE PROYECTOS ---
let ticProjects = [
    { 
        id: 1, 
        title: 'Eco-Solar Connect', 
        student: 'Maicol & Valentina (9-2)', 
        tag: 'samsung', 
        tagLabel: 'Solve for Tomorrow', 
        desc: 'Sistema de riego inteligente alimentado por energía solar.', 
        link: 'https://facebook.com/post/1' 
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
        link: 'https://facebook.com/post/3' 
    }
];

// DOM Elements
const sidebarMenus = document.getElementById('sidebar-menus');
const mainNav = document.getElementById('main-nav');
const mainViewer = document.getElementById('agent-content');
const themeToggleBtn = document.getElementById('theme-toggle');

let secNavElement = null;

// Core navigation function
function navigateTo(sectionId) {
    const isMobile = window.innerWidth <= 480;
    const picker = document.getElementById('mobile-grade-picker');

    // Deseleccionar todo
    document.querySelectorAll('.nav-btn, .m-btn').forEach(btn => btn.classList.remove('active'));

    // CASO ESPECIAL: Selector de Grados para Móvil
    if (sectionId === 'grados-picker' && isMobile) {
        if (picker) {
            mainViewer.style.display = 'none';
            picker.style.display = 'block';
            document.querySelectorAll('[data-content="grados-picker"]').forEach(b => b.classList.add('active'));
            return;
        }
    }

    // Ocultar picker si existe y estamos cargando contenido real
    if (picker) {
        picker.style.display = 'none';
        mainViewer.style.display = 'block';
    }

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
                actionAttr = `onclick="${f.action}()"`;
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
    const isMobile = window.innerWidth <= 480;
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
    const isMobile = window.innerWidth <= 480;
    
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
    const isMobile = window.innerWidth <= 480;
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

if(themeToggleBtn) {
    themeToggleBtn.onclick = () => {
        document.body.classList.toggle('light-mode');
        themeToggleBtn.querySelector('i').classList.toggle('bx-moon');
        themeToggleBtn.querySelector('i').classList.toggle('bx-sun');
    };
}

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

// Modal de Perfil Interactivo
function openProfile() {
    const modalHtml = `
        <div class="modal-overlay" id="profile-modal">
            <div class="modal-content glass-panel">
                <button class="modal-close" onclick="closeProfile()"><i class='bx bx-x'></i></button>
                <img src="IMAGENES/ID_CONECTATE.png" class="profile-img-large" alt="Profesor Álvaro">
                <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 5px; color: #fff;">PhD. Álvaro Cárdenas Orozco</h2>
                <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Docente TIC | Investigador Crítico</p>
                
                <div style="text-align: left; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
                    <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                        Doctor en Educación con énfasis en Tecnologías del Aprendizaje. Miembro del colectivo <strong>ConciencIA</strong>, dedicado a la democratización del saber tecnológico y la pedagogía crítica de la información.
                    </p>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px;">
                    <div style="text-align: center;">
                        <i class='bx bx-brain' style="font-size: 1.5rem; color: var(--accent-purple);"></i>
                        <p style="font-size: 0.7rem; opacity: 0.8;">Filosofía TIC</p>
                    </div>
                    <div style="text-align: center;">
                        <i class='bx bx-code-alt' style="font-size: 1.5rem; color: var(--accent-blue);"></i>
                        <p style="font-size: 0.7rem; opacity: 0.8;">Desarrollo</p>
                    </div>
                    <div style="text-align: center;">
                        <i class='bx bx-globe' style="font-size: 1.5rem; color: var(--accent-cyan);"></i>
                        <p style="font-size: 0.7rem; opacity: 0.8;">Soberanía</p>
                    </div>
                </div>

                <a href="https://canva.link/r3b2k31f9f7ham2"  class="cv-button">
                    <i class='bx bx-file'></i> VER HOJA DE VIDA COMPLETA
                </a>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(() => {
        document.getElementById('profile-modal').classList.add('active');
    }, 10);
}

function closeProfile() {
    const modal = document.getElementById('profile-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Cierre al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
    const modal = document.getElementById('profile-modal');
    if (e.target === modal) closeProfile();
});

// Init Load en HOME
navigateTo('home');
function openSocialModal() {
    const modalHtml = `
        <div class="modal-overlay" id="social-modal" onclick="closeSocialModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeSocialModal()"><i class='bx bx-x'></i></button>
                <img src="IMAGENES/LOGO CONECTATE.png" alt="Logo ConectaTE" class="profile-img-large" style="border-color: #1877f2; border-radius: 20px; padding: 10px;">
                <h2 style="color: white; margin-bottom: 10px;">Semillero ConectaTE</h2>
                <p style="color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 25px;">
                    ¡Bienvenido a nuestra comunidad digital! En nuestro Fan Page de Facebook compartimos los avances de investigación, 
                    proyectos de robótica y todas las actividades del semillero ConectaTE del Sor María Juliana.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://www.facebook.com/conectate.2024" class="cv-button" style="background: linear-gradient(135deg, #1877f2, #0a52b5);">
                        <i class='bx bxl-facebook-circle'></i> SEGUIR EN FACEBOOK
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setTimeout(() => {
        document.getElementById('social-modal').classList.add('active');
    }, 10);
}

function closeSocialModal() {
    const modal = document.getElementById('social-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
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
            grid.innerHTML += `
                <div class="project-card glass-panel">
                    <div class="badge ${tagClass}">${p.tagLabel}</div>
                    <h3>${p.title}</h3>
                    <p class="project-author">Por: ${p.student}</p>
                    <p class="project-desc">${p.desc}</p>
                    <a href="${p.link}" class="cv-button project-link">
                        <i class='bx bxl-facebook-circle'></i> VER EN FACEBOOK
                    </a>
                </div>
            `;
        });
    }
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
    
    document.getElementById('project-form').onsubmit = (e) => {
        e.preventDefault();
        const newProj = {
            id: Date.now(),
            title: document.getElementById('p-title').value,
            student: document.getElementById('p-student').value,
            tag: document.getElementById('p-tag').value,
            tagLabel: document.getElementById('p-tag').options[document.getElementById('p-tag').selectedIndex].text.split(' (')[0],
            desc: document.getElementById('p-desc').value,
            link: document.getElementById('p-link').value
        };
        
        ticProjects.unshift(newProj);
        closeProjectModal();
        renderProjectsGallery();
        alert('¡Proyecto publicado con éxito! (Nota: Por ahora se guarda localmente)');
    };
}

function closeProjectModal() {
    const modal = document.getElementById('project-form-modal');
    if (modal) modal.remove();
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

    status.style.display = 'block';
    
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
        status.innerHTML = "<i class='bx bx-check-circle'></i> ¡Redacción optimizada!";
        setTimeout(() => { status.style.display = 'none'; status.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Optimizando tu texto..."; }, 3000);
        
    } catch (error) {
        console.error(error);
        status.innerHTML = "<i class='bx bx-error-circle' style='color: #ef4444;'></i> Error al conectar con el Profe Álvaro.";
        setTimeout(() => { status.style.display = 'none'; }, 3000);
    }
}

// --- SKILL: ESCÁNER DE NOTICIAS IA ---
async function loadEduTechNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    const CACHE_KEY = 'edutech_news_cache';
    const CACHE_EXPIRATION = 12 * 60 * 60 * 1000; // 12 horas
    const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";
    
    // 1. Intentar cargar desde caché inmediatamente
    const cachedData = localStorage.getItem(CACHE_KEY);
    let cacheValid = false;

    if (cachedData) {
        try {
            const cache = JSON.parse(cachedData);
            const timePassed = Date.now() - cache.timestamp;
            
            renderNewsCards(cache.data); // Renderizamos lo que tengamos
            
            if (timePassed < CACHE_EXPIRATION) {
                cacheValid = true;
                console.log("Noticias cargadas desde caché (válidas)");
            } else {
                console.log("Caché expirado, actualizando en segundo plano...");
            }
        } catch (e) {
            console.error("Error leyendo caché:", e);
        }
    }

    // 2. Si no hay caché o ha expirado, consultamos a la IA
    if (!cacheValid) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "system_instruction": {
                        "parts": [{ "text": "Eres un analista de tendencias tecnológicas. Tu misión es generar una lista de las 5 noticias más IMPACTANTES y REALES de los últimos días sobre Inteligencia Artificial aplicada a la educación o innovaciones EdTech. Devuelve ÚNICAMENTE un array JSON válido con objetos que tengan: 'title' (resumen corto), 'summary' (una frase) y 'url' (enlace real a la noticia). No saludes, no uses markdown, solo el JSON puro." }]
                    },
                    "contents": [{ "role": "user", "parts": [{ "text": "Dame el pulso de noticias EduTech de hoy." }] }]
                })
            });

            if (!response.ok) throw new Error("News API Error");
            const data = await response.json();
            let newsJson = data.candidates[0].content.parts[0].text;
            
            newsJson = newsJson.replace(/```json/g, '').replace(/```/g, '').trim();
            const news = JSON.parse(newsJson);

            // Guardar en caché
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: news
            }));

            // Actualizar UI con nuevas noticias
            renderNewsCards(news);
            console.log("Noticias actualizadas desde IA");

        } catch (error) {
            console.error("Error cargando noticias:", error);
            if (!cachedData) {
                newsContainer.innerHTML = `
                    <div class="news-error">
                        <p>Las bobinas de noticias tienen interferencia. <button onclick="loadEduTechNews()" style="background: var(--accent-cyan); color: white; border/none; padding: 5px 10px; border-radius: 5px; cursor/pointer; margin-top: 10px;">Reintentar</button></p>
                    </div>
                `;
            }
        }
    }
}

function renderNewsCards(news) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    
    newsContainer.innerHTML = news.map((item, index) => `
        <a href="${item.url}" target="_blank" class="news-card glass-panel fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="news-content">
                <h4>${item.title}</h4>
                <p>${item.summary}</p>
                <div class="news-footer">Leer más <i class='bx bx-right-arrow-alt'></i></div>
            </div>
        </a>
    `).join('');
}
// --- SISTEMA DE AUTENTICACIÓN Y CARACTERIZACIÓN (CONECTATE CORE) ---
// --- SISTEMA DE AUTENTICACIÓN LOCAL (CONECTATE CORE) ---
let currentUser = JSON.parse(localStorage.getItem('conectate_user')) || null;
const ADMIN_EMAIL = 'alvaro.cardenas.orozco@gmail.com';
const ADMIN_PASS = 'mariana0';

function seedAdmin() {
    let accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};
    if (!accounts[ADMIN_EMAIL]) {
        accounts[ADMIN_EMAIL] = {
            name: "Álvaro Cárdenas (Docente)",
            email: ADMIN_EMAIL,
            pass: ADMIN_PASS,
            isAdmin: true,
            registered: true
        };
        localStorage.setItem('conectate_accounts', JSON.stringify(accounts));
    }
}

function toggleAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (mode === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;
    const accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};

    const user = accounts[email];
    if (user && user.pass === pass) {
        currentUser = { ...user };
        delete currentUser.pass; // Seguridad básica local
        localStorage.setItem('conectate_user', JSON.stringify(currentUser));
        checkUserStatus();
    } else {
        alert("Correo o contraseña incorrectos. Verifica tus datos.");
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;
    let accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};

    if (accounts[email]) return alert("Este correo ya está registrado. Intenta iniciar sesión.");

    accounts[email] = {
        name: name,
        email: email,
        pass: pass,
        isAdmin: false,
        registered: false
    };

    localStorage.setItem('conectate_accounts', JSON.stringify(accounts));
    alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
    toggleAuthMode('login');
}

function logout() {
    localStorage.removeItem('conectate_user');
    currentUser = null;
    window.location.reload();
}

function checkUserStatus() {
    const authWall = document.getElementById('auth-wall');
    const appContainer = document.querySelector('.app-container');

    if (!currentUser) {
        authWall.classList.add('active');
        appContainer.classList.remove('authenticated');
    } else {
        authWall.classList.remove('active');
        if (!currentUser.registered) {
            renderCharacterizationFlow();
        } else {
            appContainer.classList.add('authenticated');
            updateUIForUser();
            navigateTo('home');
        }
    }
}

function updateUIForUser() {
    const userDetails = document.querySelector('.user-details');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (userDetails) {
        if (currentUser.isAdmin) {
            userDetails.innerHTML = `
                <p class="name">${currentUser.name} <span class="admin-badge">Docente</span></p>
                <p class="role">
                    <a href="#" onclick="renderAdminDashboard(); return false;" style="color: var(--accent-purple); text-decoration: none; font-weight: 700;"><i class='bx bxs-dashboard'></i> Dashboard</a> | 
                    <a href="#" onclick="logout(); return false;" style="color: var(--text-secondary); text-decoration: none;">Salir</a>
                </p>
            `;
        } else {
            userDetails.innerHTML = `
                <p class="name">${currentUser.name}</p>
                <p class="role">Estudiante Inforg | <a href="#" onclick="logout(); return false;" style="color: var(--text-secondary); text-decoration: none;">Salir</a></p>
            `;
        }
    }
    
    if (userAvatar && currentUser.picture && currentUser.picture !== "IMAGENES/ID_CONECTATE.png") {
        userAvatar.src = currentUser.picture;
    }
}

function renderCharacterizationFlow() {
    const mainViewer = document.getElementById('agent-content');
    document.querySelector('.app-container').classList.add('authenticated'); // Mostrar app pero bloqueada en el form
    
    let currentStep = 1;

    mainViewer.innerHTML = `
        <div class="agent-viewer theme-academico" style="max-width: 600px; margin: 0 auto;">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel"><i class='bx bx-user-pin'></i></div>
                <div class="agent-header-text">
                    <h2>Caracterización Inforg</h2>
                    <p>Hola ${currentUser.name}, activa tu perfil de investigador.</p>
                </div>
            </div>

            <div class="step-progress">
                <div class="step-dot active" data-step="1">1</div>
                <div class="step-dot" data-step="2">2</div>
                <div class="step-dot" data-step="3">3</div>
                <div class="step-dot" data-step="4">4</div>
            </div>

            <div class="glass-panel" style="padding: 30px; border-radius: 24px;">
                <form id="char-form">
                    <!-- Paso 1: Básicos -->
                    <div class="form-step active" data-step="1">
                        <h3>Perfil Institucional</h3>
                        <div class="form-group">
                            <label>Grado y Grupo</label>
                            <select id="f-grade" required>
                                <option value="">Selecciona tu grupo...</option>
                                <optgroup label="Octavo">
                                    <option>8-1</option><option>8-2</option><option>8-3</option>
                                </optgroup>
                                <optgroup label="Noveno">
                                    <option>9-1</option><option>9-2</option><option>9-3</option>
                                </optgroup>
                                <optgroup label="Décimo">
                                    <option>10-1</option>
                                </optgroup>
                                <optgroup label="Once">
                                    <option>11-1</option><option>11-2</option><option>11-3</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Edad</label>
                            <input type="number" id="f-age" min="10" max="20" required>
                        </div>
                        <div class="form-group">
                            <label>WhatsApp del Acudiente</label>
                            <input type="tel" id="f-parent" placeholder="Ej: 310..." required>
                        </div>
                    </div>

                    <!-- Paso 2: Sociodemográfico -->
                    <div class="form-step" data-step="2">
                        <h3>Estudio Sociodemográfico</h3>
                        <div class="form-group">
                            <label>Estrato Socioeconómico</label>
                            <select id="f-stratum" required>
                                <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>¿En qué sector vives?</label>
                            <div class="choice-grid">
                                <div class="choice-card" onclick="selectChoice(this, 'f-zone', 'Urbana')"><i class='bx bx-buildings'></i>Urbana</div>
                                <div class="choice-card" onclick="selectChoice(this, 'f-zone', 'Rural')"><i class='bx bx-landscape'></i>Rural</div>
                            </div>
                            <input type="hidden" id="f-zone" required>
                        </div>
                    </div>

                    <!-- Paso 3: Acceso a Medios -->
                    <div class="form-step" data-step="3">
                        <h3>Acceso a Medios TIC</h3>
                        <div class="form-group">
                            <label>¿Cómo te conectas a internet?</label>
                            <select id="f-internet" required>
                                <option>Fibra / WiFi Hogar</option>
                                <option>Datos Móviles</option>
                                <option>Solo en el Colegio</option>
                                <option>No tengo acceso</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Dispositivo principal para tareas</label>
                            <select id="f-device" required>
                                <option>Celular</option>
                                <option>Laptop / PC</option>
                                <option>Tablet</option>
                                <option>Ninguno</option>
                            </select>
                        </div>
                    </div>

                    <!-- Paso 4: Caracterización Semillero -->
                    <div class="form-step" data-step="4">
                        <h3>Intereses en el Semillero</h3>
                        <div class="form-group">
                            <label>¿Qué área te apasiona más?</label>
                            <select id="f-interest" required>
                                <option>Robótica y Electrónica</option>
                                <option>Inteligencia Artificial</option>
                                <option>Diseño Web / UX</option>
                                <option>Programación de Videojuegos</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Nivel previo en tecnología</label>
                            <select id="f-skill" required>
                                <option>Explorador (Nada)</option>
                                <option>Iniciado (Poco)</option>
                                <option>Maker (Intermedio)</option>
                                <option>Coder (Avanzado)</option>
                            </select>
                        </div>
                    </div>

                    <div class="btn-group">
                        <button type="button" class="btn-secondary" id="btn-back" style="display: none;">Atrás</button>
                        <button type="button" class="btn-primary" id="btn-next">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const form = document.getElementById('char-form');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');

    btnNext.onclick = () => {
        if (currentStep < 4) {
            // Validar campos del paso actual
            const currentFields = document.querySelector(`.form-step[data-step="${currentStep}"]`).querySelectorAll('input[required], select[required]');
            let valid = true;
            currentFields.forEach(f => { if(!f.value) valid = false; });
            if(!valid) return alert("Por favor completa todos los campos del paso.");

            currentStep++;
            updateStepUI();
        } else {
            finishRegistration();
        }
    };

    btnBack.onclick = () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    };

    function updateStepUI() {
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        
        document.querySelectorAll('.step-dot').forEach(d => {
            const step = parseInt(d.dataset.step);
            d.classList.remove('active', 'completed');
            if (step === currentStep) d.classList.add('active');
            if (step < currentStep) d.classList.add('completed');
        });

        btnBack.style.display = currentStep > 1 ? 'block' : 'none';
        btnNext.textContent = currentStep === 4 ? 'Finalizar Registro' : 'Siguiente';
    }
}

function selectChoice(el, hiddenId, value) {
    const parent = el.parentElement;
    parent.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById(hiddenId).value = value;
}

function finishRegistration() {
    const formData = {
        grade: document.getElementById('f-grade').value,
        age: document.getElementById('f-age').value,
        parentContact: document.getElementById('f-parent').value,
        stratum: document.getElementById('f-stratum').value,
        zone: document.getElementById('f-zone').value,
        internet: document.getElementById('f-internet').value,
        device: document.getElementById('f-device').value,
        interest: document.getElementById('f-interest').value,
        skill: document.getElementById('f-skill').value,
        timestamp: new Date().toISOString()
    };

    console.log("Registrando datos del estudiante:", formData);
    
    // Guardar persistencia
    localStorage.setItem(`data_${currentUser.email}`, JSON.stringify(formData));
    localStorage.setItem(`reg_${currentUser.email}`, 'true');
    currentUser.registered = true;
    localStorage.setItem('conectate_user', JSON.stringify(currentUser));

    alert("¡Registro completado! Bienvenido oficialmente al ecosistema CONECTATE.");
    checkUserStatus();
}

// --- FUNCIONES DEL DASHBOARD ADMINISTRATIVO EVOLUCIONADO ---
let dashboardPeriod = ACADEMIC_CONFIG.currentPeriod;
let dashboardTab = 'examenes';

function renderAdminDashboard(periodOverride, tabOverride) {
    if (periodOverride) dashboardPeriod = periodOverride;
    if (tabOverride) dashboardTab = tabOverride;

    const mainViewer = document.getElementById('agent-content');
    const accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};
    
    // Recolectar TODOS los datos (caracterización + académico)
    const allStudents = [];
    Object.keys(accounts).forEach(email => {
        if (accounts[email].isAdmin) return;
        const charData = JSON.parse(localStorage.getItem(`data_${email}`)) || {};
        const academicData = JSON.parse(localStorage.getItem(`academic_${email}`)) || { periodos: {} };
        if (charData.grade) {
            allStudents.push({
                email,
                name: accounts[email].name || 'Sin nombre',
                grade: charData.grade || 'N/A',
                stratum: charData.stratum,
                internet: charData.internet,
                interest: charData.interest,
                device: charData.device,
                zone: charData.zone,
                parentContact: charData.parentContact,
                timestamp: charData.timestamp,
                academic: academicData
            });
        }
    });

    // Estadísticas para el periodo seleccionado
    const periodData = allStudents.map(s => {
        const p = s.academic.periodos?.[dashboardPeriod] || {};
        return { ...s, examen: p.examen || null, auditoria: p.auditoria || null };
    });

    const withExam = periodData.filter(s => s.examen);
    const withAudit = periodData.filter(s => s.auditoria);
    const avgExam = withExam.length ? (withExam.reduce((a, b) => a + b.examen.nota, 0) / withExam.length).toFixed(1) : '—';
    const approved = withExam.filter(s => s.examen.nota >= 3.0).length;
    const approvalRate = withExam.length ? Math.round((approved / withExam.length) * 100) : 0;
    const pending = allStudents.length - withExam.length;

    // Stats de caracterización
    const stats = { grades: {}, stratum: {}, internet: {}, interests: {} };
    allStudents.forEach(d => {
        stats.grades[d.grade] = (stats.grades[d.grade] || 0) + 1;
        if (d.stratum) stats.stratum[d.stratum] = (stats.stratum[d.stratum] || 0) + 1;
        if (d.internet) stats.internet[d.internet] = (stats.internet[d.internet] || 0) + 1;
        if (d.interest) stats.interests[d.interest] = (stats.interests[d.interest] || 0) + 1;
    });

    // Distribución de notas para gráfico
    const gradeScores = {};
    withExam.forEach(s => {
        if (!gradeScores[s.grade]) gradeScores[s.grade] = [];
        gradeScores[s.grade].push(s.examen.nota);
    });
    const gradeAverages = {};
    Object.entries(gradeScores).forEach(([g, scores]) => {
        gradeAverages[g] = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });

    // Period tabs HTML
    const periodTabsHTML = Object.entries(ACADEMIC_CONFIG.periods).map(([pId, pCfg]) => {
        const isActive = pId === dashboardPeriod;
        return `<button onclick="renderAdminDashboard('${pId}')" 
                    style="padding: 10px 20px; border: none; border-radius: 10px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.3s;
                    ${isActive ? 'background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; box-shadow: 0 4px 15px rgba(168,85,247,0.3);' : 'background: rgba(255,255,255,0.05); color: var(--text-secondary);'}">
                    ${pCfg.label}
                </button>`;
    }).join('');

    // Content tabs HTML
    const contentTabs = [
        { id: 'examenes', label: 'Exámenes', icon: 'bx-task' },
        { id: 'auditorias', label: 'Auditorías', icon: 'bx-check-shield' },
        { id: 'caracterizacion', label: 'Caracterización', icon: 'bx-user-pin' }
    ];
    const contentTabsHTML = contentTabs.map(t => {
        const isActive = t.id === dashboardTab;
        return `<button onclick="renderAdminDashboard(null, '${t.id}')" 
                    style="padding: 8px 16px; border: none; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 6px;
                    ${isActive ? 'background: rgba(168,85,247,0.2); color: #a855f7; border: 1px solid rgba(168,85,247,0.3);' : 'background: rgba(255,255,255,0.03); color: var(--text-secondary); border: 1px solid rgba(255,255,255,0.05);'}">
                    <i class='bx ${t.icon}'></i> ${t.label}
                </button>`;
    }).join('');

    // Tab content
    let tabContent = '';
    if (dashboardTab === 'examenes') {
        tabContent = renderExamenesTab(periodData, stats);
    } else if (dashboardTab === 'auditorias') {
        tabContent = renderAuditoriasTab(withAudit);
    } else {
        tabContent = renderCaracterizacionTab(allStudents, stats);
    }

    mainViewer.innerHTML = `
        <div class="agent-viewer theme-academico">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel"><i class='bx bxs-dashboard'></i></div>
                <div class="agent-header-text">
                    <h2>Panel de Analítica Académica</h2>
                    <p>Registro integrado de evaluaciones y caracterización — ${ACADEMIC_CONFIG.year}</p>
                </div>
            </div>

            <!-- Selector de Periodo -->
            <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
                ${periodTabsHTML}
            </div>

            <!-- KPIs -->
            <div class="stats-container">
                <div class="stat-card glass-panel">
                    <h4>Total Registrados</h4>
                    <div class="stat-value">${allStudents.length}</div>
                </div>
                <div class="stat-card glass-panel">
                    <h4>Promedio Periodo</h4>
                    <div class="stat-value" style="color: ${avgExam !== '—' && parseFloat(avgExam) >= 3.0 ? '#10b981' : '#fbbf24'};">${avgExam}</div>
                </div>
                <div class="stat-card glass-panel">
                    <h4>Tasa Aprobación</h4>
                    <div class="stat-value" style="color: ${approvalRate >= 60 ? '#10b981' : '#ec4899'};">${approvalRate}%</div>
                </div>
                <div class="stat-card glass-panel">
                    <h4>Pendientes</h4>
                    <div class="stat-value" style="color: #f59e0b;">${pending}</div>
                </div>
            </div>

            <!-- Gráficos -->
            <div class="charts-grid">
                <div class="chart-card glass-panel"><canvas id="chart-grades"></canvas></div>
                <div class="chart-card glass-panel"><canvas id="chart-scores"></canvas></div>
            </div>

            <!-- Content Tabs -->
            <div style="display: flex; gap: 8px; margin: 30px 0 20px; flex-wrap: wrap;">
                ${contentTabsHTML}
                <button onclick="exportDashboardCSV()" style="margin-left: auto; padding: 8px 16px; border: none; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); display: flex; align-items: center; gap: 6px;">
                    <i class='bx bx-download'></i> Exportar CSV
                </button>
            </div>

            ${tabContent}
        </div>
    `;

    // Gráficas
    initDashboardCharts(stats, gradeAverages);
}

function renderExamenesTab(periodData, stats) {
    const allGrades = Object.keys(stats.grades).sort();
    return `
        <div class="search-filter-bar">
            <input type="text" id="student-search" placeholder="Buscar por nombre..." oninput="filterStudentTable()">
            <select id="grade-filter" onchange="filterStudentTable()">
                <option value="">Todos los grados</option>
                ${allGrades.map(g => `<option value="${g}">${g}</option>`).join('')}
            </select>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr><th>Nombre</th><th>Grado</th><th>Nota</th><th>Aciertos</th><th>Estado</th><th>Acción</th></tr>
                </thead>
                <tbody id="student-table-body">
                    ${periodData.map(d => {
                        const nota = d.examen ? d.examen.nota.toFixed(1) : '—';
                        const aciertos = d.examen ? `${d.examen.correctas}/${d.examen.total}` : '—';
                        let statusHTML = '<span style="color: #f59e0b;">⏳ Pendiente</span>';
                        if (d.examen) {
                            statusHTML = d.examen.nota >= 3.0 
                                ? '<span style="color: #10b981;">✅ Aprobado</span>' 
                                : '<span style="color: #ec4899;">❌ Reprobado</span>';
                        }
                        const notaColor = !d.examen ? 'var(--text-secondary)' : d.examen.nota >= 4.0 ? '#10b981' : d.examen.nota >= 3.0 ? '#fbbf24' : '#ec4899';
                        return `
                            <tr class="student-row" data-grade="${d.grade}" data-search="${d.name.toLowerCase()}">
                                <td style="color: white; font-weight: 600;">${d.name}</td>
                                <td><span class="admin-badge">${d.grade}</span></td>
                                <td style="color: ${notaColor}; font-weight: 700; font-size: 1.1rem;">${nota}</td>
                                <td>${aciertos}</td>
                                <td>${statusHTML}</td>
                                <td><button onclick="showStudentProfile('${d.email}')" style="background: rgba(168,85,247,0.15); color: #a855f7; border: 1px solid rgba(168,85,247,0.3); padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class='bx bx-user'></i> Ver</button></td>
                            </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAuditoriasTab(withAudit) {
    if (withAudit.length === 0) {
        return `<div style="text-align: center; padding: 60px 20px; opacity: 0.6;">
            <i class='bx bx-search-alt' style="font-size: 3rem; display: block; margin-bottom: 15px;"></i>
            <p>No hay auditorías registradas en este periodo aún.</p>
        </div>`;
    }
    return `
        <div class="data-table-container">
            ${withAudit.map(d => {
                const a = d.auditoria;
                const notaColor = a.nota >= 4.0 ? '#10b981' : a.nota >= 3.0 ? '#fbbf24' : '#ec4899';
                return `
                <div class="glass-panel" style="padding: 25px; border-radius: 16px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.06);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                        <div>
                            <h4 style="margin: 0; color: white;">${d.name}</h4>
                            <span class="admin-badge">${d.grade}</span>
                        </div>
                        <div style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: ${notaColor};">${a.nota.toFixed(1)}</div>
                    </div>
                    <div style="background: rgba(168,85,247,0.05); padding: 15px; border-radius: 10px; border-left: 3px solid #a855f7; margin-bottom: 10px;">
                        <strong style="color: #a855f7; font-size: 0.8rem;">FEEDBACK</strong>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 5px 0 0;">${a.feedback}</p>
                    </div>
                    <div style="background: rgba(34,211,238,0.05); padding: 15px; border-radius: 10px; border-left: 3px solid #22d3ee; margin-bottom: 10px;">
                        <strong style="color: #22d3ee; font-size: 0.8rem;">JUSTIFICACIÓN</strong>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 5px 0 0;">${a.justificacion}</p>
                    </div>
                    <div style="background: rgba(245,158,11,0.05); padding: 15px; border-radius: 10px; border-left: 3px solid #f59e0b;">
                        <strong style="color: #f59e0b; font-size: 0.8rem;">MEJORAS</strong>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin: 5px 0 0;">${a.mejoras}</p>
                    </div>
                </div>`;
            }).join('')}
        </div>
    `;
}

function renderCaracterizacionTab(allStudents, stats) {
    const allGrades = Object.keys(stats.grades).sort();
    return `
        <div class="charts-grid" style="margin-bottom: 30px;">
            <div class="chart-card glass-panel"><canvas id="chart-stratum"></canvas></div>
            <div class="chart-card glass-panel"><canvas id="chart-internet"></canvas></div>
        </div>
        <div class="search-filter-bar">
            <input type="text" id="student-search" placeholder="Buscar por nombre o correo..." oninput="filterStudentTable()">
            <select id="grade-filter" onchange="filterStudentTable()">
                <option value="">Todos los grados</option>
                ${allGrades.map(g => `<option value="${g}">${g}</option>`).join('')}
            </select>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr><th>Nombre</th><th>Grado</th><th>Correo</th><th>Interés</th><th>Estrato</th><th>Acción</th></tr>
                </thead>
                <tbody id="student-table-body">
                    ${allStudents.map(d => `
                        <tr class="student-row" data-grade="${d.grade}" data-search="${d.name.toLowerCase()} ${d.email.toLowerCase()}">
                            <td style="color: white; font-weight: 600;">${d.name}</td>
                            <td><span class="admin-badge">${d.grade}</span></td>
                            <td>${d.email}</td>
                            <td>${d.interest || '—'}</td>
                            <td>${d.stratum || '—'}</td>
                            <td><button onclick="showStudentProfile('${d.email}')" style="background: rgba(168,85,247,0.15); color: #a855f7; border: 1px solid rgba(168,85,247,0.3); padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class='bx bx-user'></i> Ver</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    // Nota: los charts de caracterización se inicializan por separado
    setTimeout(() => initCharacterizationCharts(stats), 100);
}

function showStudentProfile(email) {
    const accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};
    const account = accounts[email] || {};
    const charData = JSON.parse(localStorage.getItem(`data_${email}`)) || {};
    const academicData = JSON.parse(localStorage.getItem(`academic_${email}`)) || { periodos: {} };

    let periodsHTML = '';
    Object.entries(ACADEMIC_CONFIG.periods).forEach(([pId, pCfg]) => {
        const pData = academicData.periodos?.[pId] || {};
        const exam = pData.examen;
        const audit = pData.auditoria;

        let examInfo = '<span style="color: var(--text-secondary); opacity: 0.5;">Sin presentar</span>';
        if (exam) {
            const color = exam.nota >= 4.0 ? '#10b981' : exam.nota >= 3.0 ? '#fbbf24' : '#ec4899';
            examInfo = `<span style="color: ${color}; font-weight: 700; font-size: 1.2rem;">${exam.nota.toFixed(1)}</span> <span style="color: var(--text-secondary); font-size: 0.8rem;">(${exam.correctas}/${exam.total})</span>`;
        }

        let auditInfo = '';
        if (audit) {
            const color = audit.nota >= 4.0 ? '#10b981' : audit.nota >= 3.0 ? '#fbbf24' : '#ec4899';
            auditInfo = `<div style="margin-top: 8px;">Auditoría: <span style="color: ${color}; font-weight: 700;">${audit.nota.toFixed(1)}</span></div>`;
        }

        periodsHTML += `
            <div style="padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
                <h4 style="margin: 0 0 8px; color: ${pId === dashboardPeriod ? '#a855f7' : 'var(--text-secondary)'};">${pCfg.label}</h4>
                <div>Examen: ${examInfo}</div>
                ${auditInfo}
            </div>`;
    });

    const modalHtml = `
        <div class="modal-overlay active" id="student-profile-modal" onclick="closeStudentProfile()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 550px;">
                <button class="modal-close" onclick="closeStudentProfile()"><i class='bx bx-x'></i></button>
                <h2 style="color: white; margin-bottom: 5px;">${account.name || 'Estudiante'}</h2>
                <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem; margin-bottom: 5px;">${charData.grade || 'Sin grado'} | ${email}</p>
                ${charData.parentContact ? `<p style="color: var(--text-secondary); font-size: 0.8rem;"><i class='bx bxl-whatsapp' style="color: #25d366;"></i> Acudiente: ${charData.parentContact}</p>` : ''}

                <div style="margin: 20px 0;">
                    <h3 style="color: var(--accent-purple); font-size: 1rem; margin-bottom: 12px;"><i class='bx bx-bar-chart-alt-2'></i> Historial Académico</h3>
                    <div style="display: grid; gap: 10px;">
                        ${periodsHTML}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                    <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Estrato</div>
                        <div style="font-weight: 700; color: white;">${charData.stratum || '—'}</div>
                    </div>
                    <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Internet</div>
                        <div style="font-weight: 700; color: white;">${charData.internet || '—'}</div>
                    </div>
                    <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Dispositivo</div>
                        <div style="font-weight: 700; color: white;">${charData.device || '—'}</div>
                    </div>
                    <div style="padding: 12px; background: rgba(255,255,255,0.02); border-radius: 10px; text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Interés</div>
                        <div style="font-weight: 700; color: white;">${charData.interest || '—'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeStudentProfile() {
    const modal = document.getElementById('student-profile-modal');
    if (modal) { modal.classList.remove('active'); setTimeout(() => modal.remove(), 300); }
}

function exportDashboardCSV() {
    const accounts = JSON.parse(localStorage.getItem('conectate_accounts')) || {};
    let csv = 'Nombre,Correo,Grado,Nota Examen,Aciertos,Nota Auditoria,Estrato,Internet,Dispositivo,Interes\n';

    Object.keys(accounts).forEach(email => {
        if (accounts[email].isAdmin) return;
        const charData = JSON.parse(localStorage.getItem(`data_${email}`)) || {};
        const academicData = JSON.parse(localStorage.getItem(`academic_${email}`)) || { periodos: {} };
        const pData = academicData.periodos?.[dashboardPeriod] || {};
        const exam = pData.examen;
        const audit = pData.auditoria;

        csv += `"${accounts[email].name}","${email}","${charData.grade || ''}",${exam ? exam.nota : ''},${exam ? exam.correctas + '/' + exam.total : ''},${audit ? audit.nota : ''},"${charData.stratum || ''}","${charData.internet || ''}","${charData.device || ''}","${charData.interest || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CONECTATE_${dashboardPeriod}_${ACADEMIC_CONFIG.year}.csv`;
    link.click();
}

function initDashboardCharts(stats, gradeAverages) {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0', font: { family: 'Outfit' } } } },
        scales: {
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
        }
    };

    // 1. Estudiantes por Grado
    const chartGrades = document.getElementById('chart-grades');
    if (chartGrades) {
        new Chart(chartGrades, {
            type: 'bar',
            data: {
                labels: Object.keys(stats.grades),
                datasets: [{
                    label: 'Estudiantes por Grado',
                    data: Object.values(stats.grades),
                    backgroundColor: 'rgba(139, 92, 246, 0.6)',
                    borderColor: '#8b5cf6',
                    borderWidth: 1
                }]
            },
            options: commonOptions
        });
    }

    // 2. Promedio de notas por grado
    const chartScores = document.getElementById('chart-scores');
    if (chartScores && gradeAverages && Object.keys(gradeAverages).length > 0) {
        new Chart(chartScores, {
            type: 'bar',
            data: {
                labels: Object.keys(gradeAverages),
                datasets: [{
                    label: `Promedio Examen ${ACADEMIC_CONFIG.periods[dashboardPeriod].label}`,
                    data: Object.values(gradeAverages).map(Number),
                    backgroundColor: Object.values(gradeAverages).map(v => parseFloat(v) >= 3.0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(236, 72, 153, 0.6)'),
                    borderColor: Object.values(gradeAverages).map(v => parseFloat(v) >= 3.0 ? '#10b981' : '#ec4899'),
                    borderWidth: 1
                }]
            },
            options: { ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, max: 5, min: 0 } } }
        });
    } else if (chartScores) {
        chartScores.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; opacity: 0.4;"><p>Sin datos de exámenes aún</p></div>';
    }

    // Characterization charts (if on that tab)
    initCharacterizationCharts(stats);
}

function initCharacterizationCharts(stats) {
    const commonPie = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0', font: { family: 'Outfit' } } } }
    };

    const chartStratum = document.getElementById('chart-stratum');
    if (chartStratum) {
        new Chart(chartStratum, {
            type: 'pie',
            data: {
                labels: Object.keys(stats.stratum).map(s => `Estrato ${s}`),
                datasets: [{ data: Object.values(stats.stratum), backgroundColor: ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'] }]
            },
            options: commonPie
        });
    }

    const chartInternet = document.getElementById('chart-internet');
    if (chartInternet) {
        new Chart(chartInternet, {
            type: 'doughnut',
            data: {
                labels: Object.keys(stats.internet),
                datasets: [{ data: Object.values(stats.internet), backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'] }]
            },
            options: commonPie
        });
    }
}

function filterStudentTable() {
    const query = document.getElementById('student-search').value.toLowerCase();
    const grade = document.getElementById('grade-filter').value;
    const rows = document.querySelectorAll('.student-row');

    rows.forEach(row => {
        const matchesSearch = row.dataset.search.includes(query);
        const matchesGrade = grade === "" || row.dataset.grade === grade;
        row.style.display = (matchesSearch && matchesGrade) ? 'table-row' : 'none';
    });
}

// Inicializar Auth al cargar
window.onload = () => {
    seedAdmin();
    // Listeners para formularios...
    
    // Listeners para formularios
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) loginForm.onsubmit = handleLogin;
    if (signupForm) signupForm.onsubmit = handleSignup;

    // Exponer globalmente el toggle
    window.toggleAuthMode = toggleAuthMode;
    window.logout = logout;

    checkUserStatus();
};
