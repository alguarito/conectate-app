/**
 * exam-core.js - Lógica de Evaluación para CONECTATE
 * Maneja el renderizado de preguntas, cálculo de notas y envío a Webhook.
 */

function initExam(questionsDB, googleScriptUrl) {
    // Render preguntas
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

    // Form logic
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

            // Nota sobre 5.0 (asumiendo 10 preguntas, cada una vale 0.5)
            const puntosPorPregunta = 5.0 / questionsDB.length;
            let notaDecimal = (scoreCount * puntosPorPregunta).toFixed(1);

            const payload = {
                nombre: document.getElementById('student-name').value.trim(),
                grado: document.getElementById('student-grade').value,
                puntaje: notaDecimal
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
                        dScore.textContent = notaDecimal;
                        if(notaDecimal < 3.0) dScore.style.color = '#ec4899';
                        else if (notaDecimal < 4.0) dScore.style.color = '#fbbf24';
                        else dScore.style.color = '#10b981';
                    }
                }, 1000);
            }).catch(error => {
                console.error("Error al enviar el examen:", error);
                alert("Error de conexión con el servidor. Tu nota fue: " + notaDecimal + ". Por favor toma una captura de pantalla.");
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.style.visibility = 'hidden', 300);
                }
                btn.disabled = false;
                btn.innerHTML = "<i class='bx bxs-cloud-upload'></i> Reintentar Envío";
            });
        });
    }

    // Theme and Preloader common logic
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
