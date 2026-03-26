// Database of Content by Sections
alert("SISTEMA CONECTATE CARGADO - VERSIÓN REFORZADA");
const sectionData = {
    sexto: {
        theme: 'theme-logico', icon: '<i class="bx bx-book-bookmark"></i>', title: 'Grado Sexto', subtitle: 'Iniciación al Pensamiento Computacional (Tutor: Agente Lógico)',
        features: [ { icon: 'bx bx-code-block', title: 'Fundamentos en Bloques', desc: 'Aprende a programar usando bloques visuales estilo Scratch y MakeCode.' }, { icon: 'bx bx-network-chart', title: 'Algoritmos Básicos', desc: 'Descomposición de problemas y secuencias paso a paso.' }, { icon: 'bx bx-game', title: 'Ciudadanía Digital Básica', desc: 'Primeros pasos seguros en la internet y huella digital.' } ]
    },
    septimo: {
        theme: 'theme-logico', icon: '<i class="bx bx-book"></i>', title: 'Grado Séptimo', subtitle: 'Profundización en Lógica (Tutor: Agente Lógico y Ético)',
        features: [ { icon: 'bx bx-puzzle', title: 'Retos Bebras', desc: 'Ejercicios de lógica y pensamiento computacional interactivos.' }, { icon: 'bx bx-lock-alt', title: 'Ciberseguridad Escolar', desc: 'Protección de datos personales y prevención del ciberacoso.' }, { icon: 'bx bx-bulb', title: 'Proyectos Guiados', desc: 'Desarrollo de animaciones interactivas enfocadas a problemas reales.' } ]
    },
    octavo: {
        theme: 'theme-maker', icon: '<i class="bx bx-book-open"></i>', title: 'Grado Octavo', subtitle: 'Robótica y Entornos Virtuales (Tutor: Agente Maker)',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Bases de la Electrónica', file: './OCTAVO/1-8-TIC.html', desc: 'Introducción a la corriente, voltaje y resistencias. Explorando el flujo energético de tus primeros circuitos.' },
            { id: 2, title: 'El Protoboard Mágico', file: './OCTAVO/2-8-TIC.html', desc: 'Aprende a ensamblar tu primer circuito básico sin soldar, interactuando con LEDs y pulsadores.' },
            { id: 3, title: 'Resistencias (Ley de Ohm)', file: './OCTAVO/3-8-TIC.html', desc: 'Cálculo interactivo de resistencias para evitar que tus brillantes LEDs se quemen.' },
            { id: 4, title: 'Conoce Arduino UNO', file: './OCTAVO/4-8-TIC.html', desc: 'Analizamos la placa Arduino UNO, sus pines de entrada y el entorno de desarrollo IDE.' },
            { id: 5, title: 'Programando el Cerebro', file: './OCTAVO/5-8-TIC.html', desc: 'Tu primer código "Blink" paso a paso. Compilando y cargando programas.' },
            { id: 6, title: 'Entradas Digitales', file: './OCTAVO/6-8-TIC.html', desc: 'Conectando interruptores y botones al Arduino para controlar hardware externo.' },
            { id: 7, title: 'Entradas Analógicas (Sensores)', file: './OCTAVO/7-8-TIC.html', desc: 'Uso de potenciómetros y fotoresistencias (LDR) para medir luz del ambiente.' },
            { id: 8, title: 'Salidas Variables (PWM)', file: './OCTAVO/8-8-TIC.html', desc: 'Controlando el brillo de un LED gradualmente y encendiendo motores de forma rítmica.' },
            { id: 9, title: 'Sensores Ultrasónicos', file: './OCTAVO/9-8-TIC.html', desc: 'Midiendo distancias como murciélagos con el potente sensor HC-SR04.' },
            { id: 10, title: 'Motores Micro Servo', file: './OCTAVO/10-8-TIC.html', desc: 'Control programático de posición y movimiento con motores de precisión para brazos robóticos.' },
            { id: 11, title: 'Feria Proyecto Final', file: './OCTAVO/11-8-TIC.html', desc: 'Integra todos tus sensores y actuadores en un diseño de software/hardware completamente libre.' }
        ]
    },
    noveno: {
        theme: 'theme-uiux', icon: '<i class="bx bx-laptop"></i>', title: 'Grado Noveno', subtitle: 'Introducción al Diseño Web (Tutor: Agente UI/UX)',
        features: [ { icon: 'bx bxl-html5', title: 'Estructura Modern Web', desc: 'Aprende HTML5 semántico y CSS3 con arquitecturas modernas.' }, { icon: 'bx bx-palette', title: 'Diseño de Interfaces', desc: 'Iniciación en UX/UI y diseño de interacciones (Estilos y Color).' }, { icon: 'bx bx-edit', title: 'Documentación de Proyectos', desc: 'Uso de ofimática avanzada e investigación guiada para reportes.' } ]
    },
    decimo: {
        theme: 'theme-coder', icon: '<i class="bx bx-code-block"></i>', title: 'Grado Décimo', subtitle: 'Programación Textual y Frontend (Tutores: Coder y UI/UX)',
        features: [ { icon: 'bx bxl-javascript', title: 'JavaScript & Lógica', desc: 'Transición a código texto: variables, ciclos, funciones y manipulación DOM.' }, { icon: 'bx bx-mobile', title: 'Responsive Design', desc: 'Técnicas con Flexbox, CSS Grid y adaptabilidad para móviles.' }, { icon: 'bx bxl-c-plus-plus', title: 'Arduino Intermedio', desc: 'Código estructurado para microcontroladores interactuando con hardware.' } ]
    },
    undecimo: {
        theme: 'theme-coder', icon: '<i class="bx bx-code-alt"></i>', title: 'Grado Undécimo', subtitle: 'Desarrollo de Software y Base de Datos (Tutor: Agente Coder)',
        features: [ { icon: 'bx bxl-python', title: 'Python & Datos', desc: 'Fundamentos de Python y estructuración para resolver problemas complejos.' }, { icon: 'bx bx-data', title: 'Bases de Datos', desc: 'Introducción a modelos relacionales, SQL y persistencia estructurada.' }, { icon: 'bx bx-brain', title: 'Investigación Asistida', desc: 'Uso de IA y NotebookLM para revisión de literatura y redacción en LATEX.' } ]
    },
    interes: {
        theme: 'theme-academico', icon: '<i class="bx bx-bulb"></i>', title: 'Centro de Interés', subtitle: 'Semilleros y Actividades Extracurriculares',
        features: [ { icon: 'bx bx-bot', title: 'Club de Robótica Avanzada', desc: 'Construcción y programación de robots físicos y preparativos.' }, { icon: 'bx bx-file', title: 'Semillero LATEX', desc: 'Redacción de documentos académicos profesionales y divulgación.' }, { icon: 'bx bx-code-curly', title: 'Hackatones Escolares', desc: 'Retos de programación competitiva trimestrales.' } ]
    },
    herramientas: {
        theme: 'theme-maker', icon: '<i class="bx bx-wrench"></i>', title: 'Caja de Herramientas', subtitle: 'Accesos Directos a Plataformas Educativas',
        features: [ { icon: 'bx bx-link-external', title: 'Scratch / MakeCode', desc: 'Abre la plataforma oficial para programación visual por bloques.' }, { icon: 'bx bx-link-external', title: 'Tinkercad', desc: 'Accede al simulador 3D y de circuitos electrónicos online.' }, { icon: 'bx bx-link-external', title: 'Canva / Figma', desc: 'Ingresa a las herramientas de diseño gráfico avanzado y colaborativo.' } ]
    }
};

// DOM Elements
const sidebarMenus = document.getElementById('sidebar-menus');
const mainNav = document.getElementById('main-nav');
const navBtns = document.querySelectorAll('.nav-btn, .m-btn'); // Captura ambos menús
const mainViewer = document.getElementById('agent-content');
const themeToggleBtn = document.getElementById('theme-toggle');

let secNavElement = null;

// Core navigation function
function navigateTo(sectionId) {
    const data = sectionData[sectionId];
    if (!data) return;

    // Actualizar estados de botones
    document.querySelectorAll('.nav-btn, .m-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-content') === sectionId) btn.classList.add('active');
    });

    if (data.isSessions) {
        renderSubMenu(sectionId);
    } else {
        // Si hay un submenú activo de otra sección, quitarlo
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
            html += `
                <div class="feature-card glass-panel">
                    <i class="${f.icon}"></i>
                    <h3>${f.title}</h3>
                    <p>${f.desc}</p>
                </div>`;
        });
    }

    html += `</div></div>`;
    mainViewer.innerHTML = html;
    mainViewer.style.animation = 'fadeIn 0.5s ease forwards';
}

function renderSessionDetail(sessionData, gradeData) {
    mainViewer.innerHTML = `
        <div class="agent-viewer ${gradeData.theme}">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel"><i class='bx bx-book-reader'></i></div>
                <div class="agent-header-text">
                    <h2>${gradeData.title} | Sesión ${sessionData.id}</h2>
                    <p>Guía de Aprendizaje Activo</p>
                </div>
            </div>
            <div class="feature-card glass-panel" style="max-width: 700px; margin: 40px auto; text-align: center; padding: 40px;">
                <i class='bx bx-brain' style="font-size: 4rem; color: #ef4444; margin-bottom: 20px;"></i>
                <h3>${sessionData.title}</h3>
                <p style="margin-bottom: 30px;">${sessionData.desc}</p>
                <a href="${sessionData.file}" target="_blank" class="glass-panel" style="display: inline-block; padding: 15px 30px; background: #ef4444; color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">
                    ABRIR CUADERNO INTERACTIVO
                </a>
            </div>
        </div>`;
}

function renderSubMenu(sectionId) {
    const gradeData = sectionData[sectionId];
    if (secNavElement) secNavElement.remove();

    const secNav = document.createElement('nav');
    secNav.className = 'agent-nav';
    secNav.innerHTML = `
        <button class="nav-btn" onclick="navigateTo('sexto')" style="margin-bottom: 10px; background: rgba(255,255,255,0.1);">
            <i class='bx bx-chevron-left'></i><span>« Volver</span>
        </button>
        <p class="nav-title">SESIONES</p>
    `;

    gradeData.sessions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerHTML = `<i class='bx bx-circle'></i><span>Sesión ${s.id}</span>`;
        btn.onclick = () => renderSessionDetail(s, gradeData);
        secNav.appendChild(btn);
    });

    if(mainNav) mainNav.style.display = 'none';
    sidebarMenus.appendChild(secNav);
    secNavElement = secNav;
    renderSessionDetail(gradeData.sessions[0], gradeData);
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

navigateTo('sexto');
