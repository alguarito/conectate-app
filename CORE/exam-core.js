/**
 * exam-core.js v2.0 - Motor Unificado de Evaluaciones CONECTATE
 * Features:
 * - Auto-detección de usuario logueado (auto-fill nombre/grado)
 * - Prevención de duplicados por periodo
 * - Guardado en registro académico (localStorage)
 * - Respaldo a Google Sheets (webhook)
 */

// --- ACADEMIC CONFIG (duplicada desde script.js para páginas independientes) ---
const ACADEMIC_CONFIG = {
    currentPeriod: 'P1',
    year: 2026,
    periods: {
        P1: { label: 'Primer Periodo', status: 'active' },
        P2: { label: 'Segundo Periodo', status: 'locked' },
        P3: { label: 'Tercer Periodo', status: 'locked' }
    }
};

// --- UTILIDADES DE REGISTRO ACADÉMICO ---
function getAcademicRecord(email) {
    return JSON.parse(localStorage.getItem(`academic_${email}`)) || null;
}

function saveAcademicRecord(email, periodId, type, data) {
    let record = getAcademicRecord(email) || {
        email: email,
        periodos: { P1: null, P2: null, P3: null }
    };

    if (!record.periodos[periodId]) {
        record.periodos[periodId] = {};
    }

    record.periodos[periodId][type] = {
        ...data,
        fecha: new Date().toISOString()
    };

    localStorage.setItem(`academic_${email}`, JSON.stringify(record));
    return record;
}

// --- MOTOR PRINCIPAL DE EXÁMENES ---
function initExam(questionsDB, googleScriptUrl, examConfig) {
    // examConfig = { gradeLevel: '9', periodId: 'P1' } (opcional - fallback a ACADEMIC_CONFIG)
    const config = examConfig || {};
    const periodId = config.periodId || ACADEMIC_CONFIG.currentPeriod;

    // 1. Auto-detectar usuario logueado
    const user = JSON.parse(localStorage.getItem('conectate_user')) || null;
    const nameInput = document.getElementById('student-name');
    const gradeSelect = document.getElementById('student-grade');

    if (user && user.registered) {
        // Obtener datos de caracterización
        const charData = JSON.parse(localStorage.getItem(`data_${user.email}`)) || {};

        if (nameInput) {
            nameInput.value = user.name;
            nameInput.disabled = true;
            nameInput.style.opacity = '0.8';
        }

        if (gradeSelect && charData.grade) {
            // Buscar la opción que corresponde al grado
            const options = gradeSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === charData.grade) {
                    gradeSelect.selectedIndex = i;
                    gradeSelect.disabled = true;
                    gradeSelect.style.opacity = '0.8';
                    break;
                }
            }
        }

        // 2. Verificar si ya presentó este examen en este periodo
        const record = getAcademicRecord(user.email);
        if (record && record.periodos[periodId] && record.periodos[periodId].examen) {
            showAlreadySubmitted(record.periodos[periodId].examen);
            return; // Bloquea el resto
        }
    }

    // 3. Render preguntas
    const container = document.getElementById('questions-container');
    if (!container) return;

    questionsDB.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'question-card glass-panel';
        let optionsHTML = '';
        q.opts.forEach((optText, optIdx) => {
            optionsHTML += `
                <label class="option-label">
                    <input type="radio" name="q${idx}" value="${optIdx}" required>
                    <span class="option-text">${optText}</span>
                </label>`;
        });
        card.innerHTML = `
            <div class="question-title">
                <div class="question-number">${idx + 1}</div>
                <div>${q.title}</div>
            </div>
            <div class="options-grid">${optionsHTML}</div>`;
        container.appendChild(card);
    });

    // 4. Form logic
    const form = document.getElementById('exam-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            btn.disabled = true;
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Calculando Nota...";

            const overlay = document.getElementById('sending-overlay');
            if (overlay) {
                overlay.style.visibility = 'visible';
                overlay.style.opacity = '1';
            }

            let scoreCount = 0;
            questionsDB.forEach((q, idx) => {
                const selected = document.querySelector(`input[name="q${idx}"]:checked`);
                if (selected && parseInt(selected.value) === q.ans) scoreCount++;
            });

            const puntosPorPregunta = 5.0 / questionsDB.length;
            let notaDecimal = parseFloat((scoreCount * puntosPorPregunta).toFixed(1));

            const studentName = nameInput ? nameInput.value.trim() : 'Anónimo';
            const studentGrade = gradeSelect ? gradeSelect.value : 'N/A';

            // Guardar en registro académico local
            if (user && user.email) {
                saveAcademicRecord(user.email, periodId, 'examen', {
                    nota: notaDecimal,
                    correctas: scoreCount,
                    total: questionsDB.length
                });
            }

            // Enviar a Google Sheets como respaldo
            const payload = {
                nombre: studentName,
                grado: studentGrade,
                puntaje: notaDecimal,
                periodo: periodId,
                timestamp: new Date().toISOString()
            };

            fetch(googleScriptUrl, {
                method: 'POST', 
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(() => {
                setTimeout(() => {
                    const loadingUI = document.getElementById('loading-ui');
                    const successUI = document.getElementById('success-ui');
                    if (loadingUI) loadingUI.style.display = 'none';
                    if (successUI) successUI.style.display = 'block';

                    const dScore = document.getElementById('final-score-display');
                    if (dScore) {
                        dScore.textContent = notaDecimal.toFixed(1);
                        if(notaDecimal < 3.0) dScore.style.color = '#ec4899';
                        else if (notaDecimal < 4.0) dScore.style.color = '#fbbf24';
                        else dScore.style.color = '#10b981';
                    }
                }, 1000);
            }).catch(error => {
                console.error("Error al enviar el examen:", error);
                // La nota ya se guardó localmente, mostrar de todas formas
                setTimeout(() => {
                    const loadingUI = document.getElementById('loading-ui');
                    const successUI = document.getElementById('success-ui');
                    if (loadingUI) loadingUI.style.display = 'none';
                    if (successUI) successUI.style.display = 'block';
                    const dScore = document.getElementById('final-score-display');
                    if (dScore) {
                        dScore.textContent = notaDecimal.toFixed(1);
                        if(notaDecimal < 3.0) dScore.style.color = '#ec4899';
                        else if (notaDecimal < 4.0) dScore.style.color = '#fbbf24';
                        else dScore.style.color = '#10b981';
                    }
                }, 1000);
            });
        });
    }

    // 5. Theme and Preloader common logic
    initCommonUI();
}

// --- MOSTRAR NOTA PREVIA (BLOQUEO) ---
function showAlreadySubmitted(examData) {
    const form = document.getElementById('exam-form');
    if (!form) return;

    const nota = examData.nota;
    let colorClass = '#10b981';
    let statusText = 'Aprobado';
    if (nota < 3.0) { colorClass = '#ec4899'; statusText = 'Debe Mejorar'; }
    else if (nota < 4.0) { colorClass = '#fbbf24'; statusText = 'Básico'; }

    const fecha = new Date(examData.fecha).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    form.innerHTML = `
        <div class="already-submitted-panel">
            <i class='bx bxs-lock-alt lock-icon'></i>
            <h2 style="color: white; font-family: var(--font-heading); margin-bottom: 5px;">Examen Ya Presentado</h2>
            <p>Tu evaluación fue registrada el <strong style="color: #22d3ee;">${fecha}</strong></p>
            <div class="prev-score" style="color: ${colorClass};">${nota.toFixed(1)}</div>
            <p style="font-size: 1.1rem; color: ${colorClass}; font-weight: 600;">${statusText} — ${examData.correctas}/${examData.total} correctas</p>
            <p style="margin-top: 20px; font-size: 0.85rem; opacity: 0.7;">Este examen solo puede ser presentado una vez por periodo académico.</p>
            <a href="../index.html" style="display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; padding: 12px 25px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; transition: all 0.3s;">
                <i class='bx bx-home'></i> Volver a CONECTATE
            </a>
        </div>
    `;

    // Inicializar UI común
    initCommonUI();
}

// --- UI COMÚN (Theme toggle + Preloader) ---
function initCommonUI() {
    const themeBtn = document.getElementById('notebook-theme-toggle');
    if(themeBtn) {
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
