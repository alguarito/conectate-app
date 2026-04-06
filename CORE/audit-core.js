/**
 * audit-core.js v1.0 - Motor de Auditoría IA Reutilizable CONECTATE
 * Usado por: Grado 8° (Proyecto de Feria) y Grado 11° (Libro PDF)
 * 
 * Features:
 * - Auto-detección de usuario logueado
 * - Evaluación IA con prompt configurable por grado
 * - Guardado en registro académico (localStorage)
 * - Envío de reporte por WhatsApp
 * - Prevención de duplicados por periodo
 */

// PDF.js worker setup
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// Academic Config (duplicada para páginas independientes)
const AUDIT_ACADEMIC_CONFIG = {
    currentPeriod: 'P1',
    periods: {
        P1: { label: 'Primer Periodo', status: 'active' },
        P2: { label: 'Segundo Periodo', status: 'locked' },
        P3: { label: 'Tercer Periodo', status: 'locked' }
    }
};

function getAuditAcademicRecord(email) {
    return JSON.parse(localStorage.getItem(`academic_${email}`)) || null;
}

function saveAuditAcademicRecord(email, periodId, data) {
    let record = getAuditAcademicRecord(email) || {
        email: email,
        periodos: { P1: null, P2: null, P3: null }
    };
    if (!record.periodos[periodId]) {
        record.periodos[periodId] = {};
    }
    record.periodos[periodId].auditoria = {
        ...data,
        fecha: new Date().toISOString()
    };
    localStorage.setItem(`academic_${email}`, JSON.stringify(record));
    return record;
}

/**
 * Inicializa el motor de auditoría IA
 * @param {Object} auditConfig
 * @param {string} auditConfig.gradeLevel - '8' | '11'
 * @param {string} auditConfig.periodId - 'P1' | 'P2' | 'P3'
 * @param {string} auditConfig.systemPrompt - Prompt del sistema para la IA
 * @param {number} auditConfig.maxPages - Máximo de páginas a analizar
 * @param {string} auditConfig.professorWA - Número de WhatsApp del profesor
 * @param {string} auditConfig.apiUrl - URL del proxy de Gemini
 * @param {string} auditConfig.projectType - 'Libro PDF' | 'Proyecto de Feria'
 */
function initAudit(auditConfig) {
    const config = {
        periodId: auditConfig.periodId || AUDIT_ACADEMIC_CONFIG.currentPeriod,
        maxPages: auditConfig.maxPages || 10,
        professorWA: auditConfig.professorWA || '573206324740',
        apiUrl: auditConfig.apiUrl || 'https://gemini-proxy.alvaro-cardenas-orozco.workers.dev',
        projectType: auditConfig.projectType || 'Proyecto',
        gradeLevel: auditConfig.gradeLevel || '11',
        systemPrompt: auditConfig.systemPrompt || '',
        gradeLabel: auditConfig.gradeLevel === '8' ? 'Octavo' : 'Undécimo'
    };

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const statusText = document.getElementById('status-text');
    const analysisOverlay = document.getElementById('analysis-overlay');
    const resultCard = document.getElementById('result-card');
    const studentNameInput = document.getElementById('student-name');

    // 1. Auto-detectar usuario logueado
    const user = JSON.parse(localStorage.getItem('conectate_user')) || null;
    
    if (user && user.registered) {
        if (studentNameInput) {
            studentNameInput.value = user.name;
            studentNameInput.disabled = true;
            studentNameInput.style.opacity = '0.8';
        }

        // 2. Verificar si ya subió auditoría en este periodo
        const record = getAuditAcademicRecord(user.email);
        if (record && record.periodos[config.periodId] && record.periodos[config.periodId].auditoria) {
            showAuditAlreadySubmitted(record.periodos[config.periodId].auditoria, config);
            return;
        }
    }

    // 3. Dropzone events
    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            handleAuditFile(e.dataTransfer.files[0], config, user);
        });
        fileInput.addEventListener('change', (e) => handleAuditFile(e.target.files[0], config, user));
    }

    // 4. Common UI
    initAuditCommonUI();
}

async function handleAuditFile(file, config, user) {
    if (!file || file.type !== 'application/pdf') {
        alert('Por favor sube un archivo PDF válido.');
        return;
    }

    const studentNameInput = document.getElementById('student-name');
    const studentName = studentNameInput ? studentNameInput.value.trim() : '';
    if (!studentName) {
        alert('Por favor ingresa tu nombre completo primero.');
        if (studentNameInput) studentNameInput.focus();
        return;
    }

    const dropzone = document.getElementById('dropzone');
    const analysisOverlay = document.getElementById('analysis-overlay');

    if (dropzone) dropzone.style.display = 'none';
    if (analysisOverlay) analysisOverlay.style.display = 'block';

    try {
        const text = await extractAuditTextFromPdf(file, config);
        await auditWithAI(text, studentName, config, user);
    } catch (err) {
        console.error(err);
        alert('Error al procesar el documento. Inténtalo de nuevo.');
        if (dropzone) dropzone.style.display = 'block';
        if (analysisOverlay) analysisOverlay.style.display = 'none';
    }
}

async function extractAuditTextFromPdf(file, config) {
    const statusText = document.getElementById('status-text');
    if (statusText) statusText.innerText = 'Extrayendo contenido del documento...';
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';
    
    const pagesToRead = Math.min(pdf.numPages, config.maxPages);
    for (let i = 1; i <= pagesToRead; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
}

async function auditWithAI(bookText, studentName, config, user) {
    const statusText = document.getElementById('status-text');
    if (statusText) statusText.innerText = `El Auditor IA está evaluando tu ${config.projectType}...`;

    const payload = {
        system_instruction: { parts: [{ text: config.systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: `Nombre del Estudiante: ${studentName}\nGrado: ${config.gradeLevel}°\nContenido del Documento:\n${bookText.substring(0, 5000)}` }] }]
    };

    const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('AI Error');
    const data = await response.json();
    const result = JSON.parse(data.candidates[0].content.parts[0].text.replace(/```json|```/g, ''));

    // Guardar en registro académico
    if (user && user.email) {
        saveAuditAcademicRecord(user.email, config.periodId, {
            nota: result.nota,
            feedback: result.feedback,
            justificacion: result.justificacion,
            mejoras: result.mejoras
        });
    }

    displayAuditResults(result, studentName, config);
}

function displayAuditResults(res, name, config) {
    const analysisOverlay = document.getElementById('analysis-overlay');
    const resultCard = document.getElementById('result-card');

    if (analysisOverlay) analysisOverlay.style.display = 'none';
    if (resultCard) resultCard.style.display = 'block';

    const scoreEl = document.getElementById('display-score');
    if (scoreEl) {
        scoreEl.innerText = res.nota.toFixed(1);
        if (res.nota < 3.0) scoreEl.style.color = '#ec4899';
        else if (res.nota < 4.0) scoreEl.style.color = '#fbbf24';
        else scoreEl.style.color = '#10b981';
    }

    const feedbackEl = document.getElementById('display-feedback');
    if (feedbackEl) feedbackEl.innerText = res.feedback;

    const justEl = document.getElementById('display-justification');
    if (justEl) justEl.innerText = res.justificacion;

    const impEl = document.getElementById('display-improvements');
    if (impEl) impEl.innerText = res.mejoras;

    const waBtn = document.getElementById('send-wa-btn');
    if (waBtn) {
        waBtn.onclick = () => {
            const msg = encodeURIComponent(`*REPORTE DE AUDITORÍA TIC - ${config.gradeLevel}°*\n*Estudiante:* ${name}\n*Tipo:* ${config.projectType}\n*Nota:* ${res.nota.toFixed(1)}/5.0\n\n*Feedback:* ${res.feedback}\n\n*Justificación:* ${res.justificacion}\n\n*Mejoras:* ${res.mejoras}`);
            window.open(`https://wa.me/${config.professorWA}?text=${msg}`, '_blank');
        };
    }
}

function showAuditAlreadySubmitted(auditData, config) {
    const mainContainer = document.querySelector('.notebook-container');
    if (!mainContainer) return;

    const nota = auditData.nota;
    let colorClass = '#10b981';
    if (nota < 3.0) colorClass = '#ec4899';
    else if (nota < 4.0) colorClass = '#fbbf24';

    const fecha = new Date(auditData.fecha).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    // Reemplazar las secciones de carga y resultado con el estado de ya enviado
    const sections = mainContainer.querySelectorAll('.interactive-section, .result-card');
    sections.forEach(s => s.remove());

    const stickyPanel = document.createElement('div');
    stickyPanel.className = 'already-submitted-panel';
    stickyPanel.innerHTML = `
        <i class='bx bxs-check-shield lock-icon' style="color: ${colorClass};"></i>
        <h2 style="color: white; font-family: var(--font-heading); margin-bottom: 5px;">Auditoría Ya Completada</h2>
        <p>Tu ${config.projectType} fue evaluado el <strong style="color: #22d3ee;">${fecha}</strong></p>
        <div class="prev-score" style="color: ${colorClass};">${nota.toFixed(1)}</div>
        
        <div style="text-align: left; max-width: 600px; margin: 20px auto;">
            <div class="info-box" style="border-left-color: #a855f7;">
                <div class="info-box-title"><i class='bx bx-comment-detail'></i> Feedback</div>
                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">${auditData.feedback}</p>
            </div>
            <div class="info-box" style="border-left-color: #22d3ee;">
                <div class="info-box-title"><i class='bx bx-check-shield'></i> Justificación</div>
                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">${auditData.justificacion}</p>
            </div>
            <div class="info-box" style="border-left-color: #f59e0b;">
                <div class="info-box-title"><i class='bx bx-bulb'></i> Mejoras</div>
                <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">${auditData.mejoras}</p>
            </div>
        </div>
        
        <p style="margin-top: 15px; font-size: 0.85rem; opacity: 0.7;">Esta auditoría solo puede realizarse una vez por periodo académico.</p>
        <a href="../index.html" style="display: inline-flex; align-items: center; gap: 8px; margin-top: 15px; padding: 12px 25px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; transition: all 0.3s;">
            <i class='bx bx-home'></i> Volver a CONECTATE
        </a>
    `;

    mainContainer.querySelector('footer').insertAdjacentElement('beforebegin', stickyPanel);
    initAuditCommonUI();
}

function initAuditCommonUI() {
    const themeBtn = document.getElementById('notebook-theme-toggle');
    if (themeBtn && !themeBtn._initialized) {
        themeBtn._initialized = true;
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');
            icon.className = document.body.classList.contains('light-mode') ? 'bx bx-sun' : 'bx bx-moon';
        });
    }

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }
    });
}
