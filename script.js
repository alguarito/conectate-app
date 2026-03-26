// Database of Content by Sections
const APP_VERSION = '1.6';
console.log('CONECTATE App Version:', APP_VERSION);

const sectionData = {
    home: {
        theme: 'theme-etico', icon: '<i class="bx bxs-home-heart"></i>', title: 'Bienvenido a CONECTATE', subtitle: 'IE Sor María Juliana - Tu Portal de Tecnología e Informática',
        features: [ 
            { icon: 'bx bx-user-circle', title: '¿Quién es tu Profesor?', desc: 'PhD. Álvaro Cárdenas Orozco, apasionado por las TIC y la educación crítica.' }, 
            { icon: 'bx bx-rocket', title: 'Tu Ruta de Hoy', desc: 'Prepara tus guías, abre el simulador y mejora tu pensamiento computacional.' },
            { icon: 'bx bx-message-square-dots', title: 'Agente Tesla', desc: '¡Recuerda que tienes un asistente de IA siempre listo para ayudarte abajo a la derecha!' } 
        ]
    },
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
            { id: 11, title: 'Feria Proyecto Final', file: './OCTAVO/11-8-TIC.html?v=new-layout', desc: 'Integra todos tus sensores y actuadores en un diseño de software/hardware completamente libre.' }
        ]
    },
    noveno: {
        theme: 'theme-uiux', icon: '<i class="bx bx-laptop"></i>', title: 'Grado Noveno', subtitle: 'Introducción al Diseño Web (Tutor: Agente UI/UX)',
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
        renderSubMenu(sectionId);
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
            html += `
                <div class="feature-card glass-panel" style="margin-bottom: 12px;">
                    <i class="${f.icon}"></i>
                    <h3>${f.title}</h3>
                    <p style="font-size: 0.85rem;">${f.desc}</p>
                </div>`;
        });
    }

    html += `</div></div>`;
    mainViewer.innerHTML = html;
    mainViewer.style.animation = 'fadeIn 0.5s ease forwards';
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
                <a href="${sessionData.file}" target="_blank" class="glass-panel" style="display: inline-flex; width: 100%; align-items: center; justify-content: center; gap: 10px; padding: 18px 30px; background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">
                    <i class='bx bx-window-open'></i> ABRIR CUADERNO
                </a>
            </div>
        </div>`;
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
                    <button onclick="navigateTo('grados-picker')" style="align-self: flex-start; background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px 15px; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 5px;">
                        <i class='bx bx-chevron-left'></i> Volver
                    </button>
                    <div class="agent-icon-large glass-panel" style="margin: 0 auto 15px;">${gradeData.icon}</div>
                    <h2>Ruta de Sesiones: ${gradeData.title}</h2>
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
    secNav.innerHTML = `<button class="nav-btn" onclick="navigateTo('home')" style="margin-bottom: 10px; background: rgba(255,255,255,0.1);"><i class='bx bx-chevron-left'></i><span>« Volver</span></button><p class="nav-title">SESIONES</p>`;
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

// Init Load en HOME
navigateTo('home');
