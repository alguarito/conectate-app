// Database of Content by Sections
const sectionData = {
    sexto: {
        theme: 'theme-logico', icon: '<i class="bx bx-book-bookmark"></i>', title: 'Grado Sexto', subtitle: 'Iniciación al Pensamiento Computacional (Tutor: Agente Lógico)',
        features: [ { icon: 'bx bx-code-block', title: 'Fundamentos en Bloques', desc: 'Aprende a programar usando bloques visuales estilo Scratch y MakeCode.' }, { icon: 'bx bx-network-chart', title: 'Algoritmos Básicos', desc: 'Descomposición de problemas y secuencias paso a paso.' }, { icon: 'bx bx-game', title: 'Ciudadanía Digital Básica', desc: 'Primeros pasos seguros en la internet y huella digital.' } ]
    },
    septimo: {
        theme: 'theme-logico', icon: '<i class="bx bx-book"></i>', title: 'Grado Séptimo', subtitle: 'Profundización en Lógica (Tutor: Agente Lógico y Ético)',
        features: [ { icon: 'bx bx-puzzle', title: 'Retos Bebras', desc: 'Ejercicios de lógica y pensamiento computacional interactivos.' }, { icon: 'bx bx-lock-alt', title: 'Ciberseguridad Escolar', desc: 'Protección de datos personales y prevención del ciberacoso.' }, { icon: 'bx bx-bulb', title: 'Proyectos Guiados', desc: 'Desarrollo de animaciones interactivas enfocadas a problemas reales.' } ]
    },
    // Octavo has special Sessions sub-navigation enabled
    octavo: {
        theme: 'theme-maker', icon: '<i class="bx bx-book-open"></i>', title: 'Grado Octavo', subtitle: 'Robótica y Entornos Virtuales (Tutor: Agente Maker)',
        isSessions: true,
        sessions: [
            { id: 1, title: 'Bases de la Electrónica', file: 'OCTAVO/1-8-TIC.html', desc: 'Introducción a la corriente, voltaje y resistencias. Explorando el flujo energético de tus primeros circuitos.' },
            { id: 2, title: 'El Protoboard Mágico', file: 'OCTAVO/2-8-TIC.html', desc: 'Aprende a ensamblar tu primer circuito básico sin soldar, interactuando con LEDs y pulsadores.' },
            { id: 3, title: 'Resistencias (Ley de Ohm)', file: 'OCTAVO/3-8-TIC.html', desc: 'Cálculo interactivo de resistencias para evitar que tus brillantes LEDs se quemen.' },
            { id: 4, title: 'Conoce Arduino UNO', file: 'OCTAVO/4-8-TIC.html', desc: 'Analizamos la placa Arduino UNO, sus pines de entrada y el entorno de desarrollo IDE.' },
            { id: 5, title: 'Programando el Cerebro', file: 'OCTAVO/5-8-TIC.html', desc: 'Tu primer código "Blink" paso a paso. Compilando y cargando programas.' },
            { id: 6, title: 'Entradas Digitales', file: 'OCTAVO/6-8-TIC.html', desc: 'Conectando interruptores y botones al Arduino para controlar hardware externo.' },
            { id: 7, title: 'Entradas Analógicas (Sensores)', file: 'OCTAVO/7-8-TIC.html', desc: 'Uso de potenciómetros y fotoresistencias (LDR) para medir luz del ambiente.' },
            { id: 8, title: 'Salidas Variables (PWM)', file: 'OCTAVO/8-8-TIC.html', desc: 'Controlando el brillo de un LED gradualmente y encendiendo motores de forma rítmica.' },
            { id: 9, title: 'Sensores Ultrasónicos', file: 'OCTAVO/9-8-TIC.html', desc: 'Midiendo distancias como murciélagos con el potente sensor HC-SR04.' },
            { id: 10, title: 'Motores Micro Servo', file: 'OCTAVO/10-8-TIC.html', desc: 'Control programático de posición y movimiento con motores de precisión para brazos robóticos.' },
            { id: 11, title: 'Feria Proyecto Final', file: 'OCTAVO/11-8-TIC.html', desc: 'Integra todos tus sensores y actuadores en un diseño de software/hardware completamente libre.' }
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
    proyectos: {
        theme: 'theme-etico', icon: '<i class="bx bx-trophy"></i>', title: 'Proyectos TIC', subtitle: 'Feria de la Ciencia y Tecnología CONECTATE',
        features: [ { icon: 'bx bx-star', title: 'Proyectos Destacados 2026', desc: 'Galería interactiva mostrando los mejores trabajos del año escolar.' }, { icon: 'bx bx-video', title: 'Presentaciones en Video', desc: 'Estudiantes defendiendo sus propuestas de software e investigación.' }, { icon: 'bx bx-group', title: 'Votación Comunitaria', desc: 'Espacio para elegir y reconocer a los mejores proyectos de innovación.' } ]
    },
    herramientas: {
        theme: 'theme-maker', icon: '<i class="bx bx-wrench"></i>', title: 'Caja de Herramientas', subtitle: 'Accesos Directos a Plataformas Educativas',
        features: [ { icon: 'bx bx-link-external', title: 'Scratch / MakeCode', desc: 'Abre la plataforma oficial para programación visual por bloques.' }, { icon: 'bx bx-link-external', title: 'Tinkercad', desc: 'Accede al simulador 3D y de circuitos electrónicos online.' }, { icon: 'bx bx-link-external', title: 'Canva / Figma', desc: 'Ingresa a las herramientas de diseño gráfico avanzado y colaborativo.' } ]
    }
};

// DOM Elements
const sidebarMenus = document.getElementById('sidebar-menus');
const mainNav = document.getElementById('main-nav');
const navBtns = document.querySelectorAll('#main-nav .nav-btn');
const mainViewer = document.getElementById('agent-content');
const themeToggleBtn = document.getElementById('theme-toggle');

let secNavElement = null;

// Render basic section (features)
function renderSectionInfo(sectionId) {
    const data = sectionData[sectionId];
    if (!data) return;

    mainViewer.style.animation = 'none';
    mainViewer.offsetHeight; // Trigger reflow

    let html = `
        <div class="agent-viewer ${data.theme}">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel">
                    ${data.icon}
                </div>
                <div class="agent-header-text">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
            </div>
            <div class="dashboard-grid">
    `;

    if (data.features) {
        data.features.forEach(feature => {
            html += `
                <div class="feature-card glass-panel">
                    <i class="${feature.icon}"></i>
                    <h3>${feature.title}</h3>
                    <p>${feature.desc}</p>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    mainViewer.innerHTML = html;
    mainViewer.style.animation = 'fadeIn 0.5s ease forwards';
}

// Render dynamic detail view for a specific session
function renderSessionDetail(sessionData, gradeData) {
    mainViewer.style.animation = 'none';
    mainViewer.offsetHeight; // Trigger reflow

    let html = `
        <div class="agent-viewer ${gradeData.theme}">
            <div class="agent-header">
                <div class="agent-icon-large glass-panel" style="color: white; border-color: rgba(255,255,255,0.2);">
                    <i class='bx bx-book-reader'></i>
                </div>
                <div class="agent-header-text">
                    <h2 style="background: none; -webkit-text-fill-color: white;">${gradeData.title} | Sesión ${sessionData.id}</h2>
                    <p>Guía de Aprendizaje Activo</p>
                </div>
            </div>
            
            <div class="feature-card glass-panel" style="max-width: 700px; margin: 40px auto; text-align: center; padding: 50px; background: rgba(0,0,0,0.2);">
                <i class='bx bx-brain' style="font-size: 5rem; color: #ef4444; margin-bottom: 20px;"></i>
                <h3 style="font-size: 2.2rem; margin-bottom: 16px;">${sessionData.title}</h3>
                <p style="font-size: 1.15rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 40px;">
                    ${sessionData.desc}
                </p>
                <a href="${sessionData.file}" target="_blank" style="display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; text-decoration: none; padding: 18px 36px; border-radius: 12px; font-weight: 700; transition: transform 0.3s ease; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4); text-transform: uppercase;">
                    <i class='bx bx-window-open' style="font-size: 1.5rem; color: white; margin: 0;"></i>
                    Abrir Cuaderno Interactivo
                </a>
                <p style="margin-top: 24px; font-size: 0.85rem; color: var(--text-secondary);">El cuaderno se abrirá en una nueva pestaña (target="_blank") para mantener tu menú de grados interactivo.</p>
            </div>
        </div>
    `;

    mainViewer.innerHTML = html;
    mainViewer.style.animation = 'fadeIn 0.5s ease forwards';
}

// Build Sub-Navigation for Sections that have "isSessions" (Grade 8)
function renderSubMenu(sectionId) {
    const gradeData = sectionData[sectionId];
    if (!gradeData || !gradeData.isSessions) return;

    // Create the secondary nav dynamically
    const secNav = document.createElement('nav');
    secNav.className = 'agent-nav';
    secNav.id = 'sec-nav-' + sectionId;
    
    let html = `
        <button class="nav-btn" id="btn-back" style="background: rgba(255,255,255,0.08); border: 1px solid var(--glass-border); justify-content: flex-start; margin-bottom: 10px;">
            <i class='bx bx-chevron-left'></i>
            <span>« Volver a Grados</span>
        </button>
        <p class="nav-title" style="margin-top: 16px;">Ruta de Aprendizaje</p>
        <div style="overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
    `;

    gradeData.sessions.forEach(session => {
        html += `
            <button class="nav-btn session-btn" data-session="${session.id}">
                <i class='bx bx-radio-circle-marked'></i>
                <span>Sesión ${session.id}</span>
            </button>
        `;
    });
    
    html += `</div>`;
    secNav.innerHTML = html;
    
    // Hide main menu and show secondary nav
    mainNav.style.display = 'none';
    sidebarMenus.appendChild(secNav);
    secNavElement = secNav;
    
    // Default select Session 1
    renderSessionDetail(gradeData.sessions[0], gradeData);
    const firstSessionBtn = secNav.querySelector('.session-btn');
    if (firstSessionBtn) firstSessionBtn.classList.add('active');

    // Event Listeners for the sub-menu buttons
    const backBtn = secNav.querySelector('#btn-back');
    backBtn.addEventListener('click', () => {
        secNav.remove();
        secNavElement = null;
        mainNav.style.display = 'flex';
        renderSectionInfo(sectionId); // Regresa a la vista general o mantiene el de octavo, pero preferimos mantener el layout visual 
        // We simulate a click to the main degree to restore normal default dashboard if preferred, or leave it.
        // In this case renderSectionInfo will re-render the normal interface if we removed isSessions. But wait, `isSessions` is true so it won't have normal feature content.
        // Actually, if we go back we should select the default 'sexto' or just render empty. Let's select 'sexto'
        const navSexto = Array.from(navBtns).find(btn => btn.getAttribute('data-content') === 'sexto');
        if(navSexto) navSexto.click();
    });

    const sessionBtns = secNav.querySelectorAll('.session-btn');
    sessionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sid = parseInt(btn.getAttribute('data-session'));
            const sData = gradeData.sessions.find(s => s.id === sid);
            renderSessionDetail(sData, gradeData);
        });
    });
}

// Event Listeners for Main Nav (Grades and Sections)
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const sectionId = btn.getAttribute('data-content');
        const data = sectionData[sectionId];
        
        if (data && data.isSessions) {
            renderSubMenu(sectionId);
        } else {
            renderSectionInfo(sectionId);
        }
    });
});

// Theme Toggle functionality
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggleBtn.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.replace('bx-moon', 'bx-sun');
    } else {
        icon.classList.replace('bx-sun', 'bx-moon');
    }
});

// Mobile Navigation Logic
function setupMobileNav() {
    const mobileBtns = document.querySelectorAll('.m-btn');
    console.log("Configurando navegación móvil. Botones encontrados:", mobileBtns.length);

    mobileBtns.forEach(btn => {
        btn.onclick = (e) => {
            const sectionId = btn.getAttribute('data-content');
            console.log("Click en móvil:", sectionId);
            
            if (sectionId) {
                mobileBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Sincronizar con el sidebar
                navBtns.forEach(b => {
                    b.classList.remove('active');
                    if(b.getAttribute('data-content') === sectionId) b.classList.add('active');
                });

                renderSectionInfo(sectionId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    });
}

// Placeholder for specialized mobile menus
document.getElementById('m-toggle-menu').onclick = () => {
    alert("Pronto: Menú desplegable de grados.");
};

document.getElementById('m-toggle-profile').onclick = () => {
    alert("PhD. Álvaro Cárdenas Orozco\nDocente TIC");
};

// Init Load
renderSectionInfo('sexto');
setupMobileNav();
