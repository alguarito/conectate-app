// Database of Content by Sections
const APP_VERSION = '1.6';
console.log('CONECTATE App Version:', APP_VERSION);

const sectionData = {
    home: {
        theme: 'theme-etico', icon: '<i class="bx bxs-home-heart"></i>', title: 'Bienvenido a CONECTATE', subtitle: 'IE Sor María Juliana - Tu Portal de Tecnología e Informática',
        features: [ 
            { icon: 'bx bx-user-circle', title: '¿Quién es tu Profesor?', desc: 'PhD. Álvaro Cárdenas Orozco, apasionado por las TIC y la educación crítica.', action: 'openProfile' }, 
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
        renderSubMenu(sectionId);
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
let currentUser = JSON.parse(localStorage.getItem('conectate_user')) || null;
const ADMIN_EMAIL = 'alvaro.cardenas.orozco@gmail.com';

function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT", e);
        return null;
    }
}

function handleCredentialResponse(response) {
    const payload = decodeJwt(response.credential);
    if (!payload) return alert("Error al autenticar con Google.");

    currentUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        isAdmin: payload.email === ADMIN_EMAIL,
        registered: localStorage.getItem(`reg_${payload.email}`) === 'true'
    };

    localStorage.setItem('conectate_user', JSON.stringify(currentUser));
    
    // Si es admin, no necesita caracterización
    if (currentUser.isAdmin) {
        currentUser.registered = true;
        localStorage.setItem(`reg_${payload.email}`, 'true');
    }

    checkUserStatus();
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
    // Actualizar sidebar con info del usuario real si no es el profe (por defecto)
    if (!currentUser.isAdmin) {
        const userDetails = document.querySelector('.user-details');
        const userAvatar = document.querySelector('.user-avatar');
        if (userDetails) {
            userDetails.innerHTML = `
                <p class="name">${currentUser.name}</p>
                <p class="role">Estudiante Inforg</p>
            `;
        }
        if (userAvatar) userAvatar.src = currentUser.picture;
    } else {
        // Es el admin, mostrar panel de control si se desea
        console.log("Admin Mode Active");
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
                                <optgroup label="Sexto">
                                    <option>6-1</option><option>6-2</option><option>6-3</option><option>6-4</option>
                                </optgroup>
                                <optgroup label="Noveno">
                                    <option>9-1</option><option>9-2</option><option>9-3</option><option>9-4</option>
                                </optgroup>
                                <optgroup label="Once">
                                    <option>11-1</option><option>11-2</option>
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

// Inicializar Auth al cargar
window.onload = () => {
    // Exponer globalmente el callback para Google
    window.handleCredentialResponse = handleCredentialResponse;
    checkUserStatus();
};
