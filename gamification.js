/**
 * Motor de Gamificación y Experiencia
 * Administra el estado global de XP, Niveles de Usuario y UI (Toasts y Barras)
 */

class GamificationManager {
    constructor() {
        this.STORAGE_KEY = 'conectate_user';
        this.user = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || null;
        
        // Configuración de los 5 Niveles Míticos
        // Base teórica: 3 Periodos académicos x 4 guías = 12 guías/año
        // Cada guía: +20 XP abrir + 150 XP completar = 170 XP por guía.
        // Total guías: 170 * 12 = 2040 XP. 
        // Sumando ingresos diarios y búsquedas, proyectamos ~2500 XP anuales.
        this.LEVELS = [
            { id: 1, name: "Explorador Digital", threshold: 0, icon: "🎒" },
            { id: 2, name: "Inforg", threshold: 500, icon: "🦾" },
            { id: 3, name: "Ciborg Académico", threshold: 1200, icon: "🧠" },
            { id: 4, name: "Hacker Ético", threshold: 1900, icon: "⚡" },
            { id: 5, name: "Centauro de IA", threshold: 2500, icon: "🤖" }
        ];

        this.init();
    }

    init() {
        // Inicializar estructura si es nuevo y NO es administrador
        if (this.user) {
            // El docente NO participa en gamificación, pero administramos su sesión para ver el dashboard
            if (this.user.isAdmin === true || this.user.isAdmin === "true") {
                console.log("Gamification: Admin session detected, UI hidden.");
                return;
            }

            if (typeof this.user.xp === 'undefined') this.user.xp = 0;
            if (typeof this.user.level === 'undefined') this.user.level = 1;
            if (!this.user.completed_sessions) this.user.completed_sessions = [];
            this.saveUser();
        }

        // Crear contenedor global para notificaciones (Solo Estudiantes)
        if (!document.getElementById("gamification-toast-container") && !this.user?.isAdmin) {
            const container = document.createElement("div");
            container.id = "gamification-toast-container";
            document.body.appendChild(container);
        }

        // Evaluar en qué contexto estamos (Home vs Cuaderno)
        document.addEventListener("DOMContentLoaded", () => {
            if (!this.user?.isAdmin) {
                this.renderProfileBar();
                this.injectNotebookFeatures();
                // Buscar si hay datos previos de flashcards en el HTML
                this.detectFlashcardsInDOM();
            }
        });
        
        // Si el DOM ya cargó (por scripts asíncronos), forzar render
        if(document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(() => {
                if (!this.user?.isAdmin) {
                    this.renderProfileBar();
                    this.injectNotebookFeatures();
                    this.detectFlashcardsInDOM();
                }
            }, 100);
        }
    }

    detectFlashcardsInDOM() {
        const container = document.getElementById("flashcards-container");
        if (container && window.FLASH_DATA) {
            this.renderFlashcards(window.FLASH_DATA);
        }
    }

    saveUser() {
        if(this.user) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
            // Persistencia universal por email para que el docente pueda leer los datos
            if (this.user.email) {
                const gamiData = {
                    xp: this.user.xp,
                    level: this.user.level,
                    completed_sessions: this.user.completed_sessions
                };
                localStorage.setItem(`gami_${this.user.email}`, JSON.stringify(gamiData));
            }
        }
    }

    getCurrentLevelInfo() {
        if(!this.user) return this.LEVELS[0];
        let currentLvl = this.LEVELS[0];
        for (let lvl of this.LEVELS) {
            if (this.user.xp >= lvl.threshold) {
                currentLvl = lvl;
            }
        }
        return currentLvl;
    }

    getNextLevelInfo() {
        const currentLvl = this.getCurrentLevelInfo();
        const nextLvl = this.LEVELS.find(l => l.id === currentLvl.id + 1);
        return nextLvl || currentLvl; // Si está a tope, devuelve el máximo
    }

    addXP(amount, actionMessage = "XP Ganada", manualRenderProfile = true) {
        if (!this.user) return;
        
        const previousLevelInfo = this.getCurrentLevelInfo();
        this.user.xp += amount;
        this.saveUser();
        
        const currentLevelInfo = this.getCurrentLevelInfo();
        
        // Lanzar Toast de XP ganada
        this.showToast(`+${amount} XP | ${actionMessage}`, "xp");
        
        // Reflejar visualmente si está en el home
        if(manualRenderProfile) {
            this.renderProfileBar();
        }

        // Determinar si subió de nivel
        if (currentLevelInfo.id > previousLevelInfo.id) {
            this.user.level = currentLevelInfo.id;
            this.saveUser();
            setTimeout(() => {
                this.showToast(`¡Subiste de Nivel! Ahora eres: ${currentLevelInfo.name}`, "level-up");
                this.launchConfetti(); // Optional polish
            }, 1000);
        }
    }

    markSessionComplete(sessionId) {
        if (!this.user || this.user.completed_sessions.includes(sessionId)) return;
        
        this.user.completed_sessions.push(sessionId);
        this.saveUser();
        this.addXP(150, "Sesión Completada", false);
        
        const btn = document.getElementById("btn-complete-session");
        if(btn) {
            btn.innerHTML = "<i class='bx bx-check-double'></i> ¡Misión Cumplida!";
            btn.classList.add("btn-completed");
            btn.disabled = true;
        }
    }

    showToast(message, type = "xp") {
        const container = document.getElementById("gamification-toast-container");
        if(!container) return;

        const toast = document.createElement("div");
        toast.className = `gami-toast gami-toast-${type}`;
        
        let icon = type === "xp" ? "<i class='bx bxs-zap' style='color:#fbbf24'></i>" : "<i class='bx bxs-trophy' style='color:#a855f7'></i>";
        toast.innerHTML = `<div class="toast-icon">${icon}</div><div class="toast-msg">${message}</div>`;
        
        container.appendChild(toast);
        
        // Animar entrada y salida
        requestAnimationFrame(() => toast.classList.add("show"));
        
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 4000);
    }

    launchConfetti() {
        // Animación sencilla de subida de nivel, o podríamos instalar CanvasConfetti en un futuro.
        // Simularemos con CSS si no existe librería externa.
        const c = document.createElement("div");
        c.className = "level-up-overlay";
        c.innerHTML = `<h1>🎉 ¡NIVEL ALCANZADO! 🎉</h1><p>${this.getCurrentLevelInfo().name}</p>`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2500);
    }

    // --- HOME WIDGET INJECTION ---
    renderProfileBar() {
        if (this.user?.isAdmin) return; // Doble verificación de seguridad
        const slot = document.getElementById("xp-profile-slot");
        if(!slot || !this.user) return;

        const currentLvl = this.getCurrentLevelInfo();
        const nextLvl = this.getNextLevelInfo();
        
        let progressPercent = 100;
        let progressLabel = `${this.user.xp} / MAX XP`;

        if (currentLvl.id !== nextLvl.id) {
            const xpIntoLevel = this.user.xp - currentLvl.threshold;
            const levelSize = nextLvl.threshold - currentLvl.threshold;
            progressPercent = Math.min((xpIntoLevel / levelSize) * 100, 100);
            progressLabel = `${this.user.xp} / ${nextLvl.threshold} XP`;
        }
        
        slot.innerHTML = `
            <div class="xp-widget glass-panel">
                <div class="xp-header">
                    <span class="xp-level-badge">${currentLvl.icon} Lvl ${currentLvl.id}</span>
                    <span class="xp-title">${currentLvl.name}</span>
                </div>
                <div class="xp-bar-bg">
                    <div class="xp-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="xp-footer">
                    <span>Progreso al siguiente nivel:</span>
                    <span class="xp-count">${progressLabel}</span>
                </div>
            </div>
        `;
    }

    // --- NOTEBOOK FEATURES INJECTION ---
    injectNotebookFeatures() {
        if (this.user?.isAdmin) return; // Doble verificación de seguridad
        // Identificar si estamos en un HTML de sesión
        const container = document.querySelector(".notebook-container") || document.querySelector(".content-area");
        if(!container) return; // Probablemente en el main index
        
        // Sacar el ID de la sesión desde la URL. Ej: "/octavo/1-8-TIC.html" -> "1-8-TIC"
        let sessionId = window.location.pathname.split("/").pop().replace(".html", "");
        if(!sessionId || sessionId === "index") return; 

        // Otorga +20 XP silente si el estudiante tiene menos de 10 sesiones totales (mecanismo anti-abuso) o no.
        // Implementación sencilla: Guardar variables temporales para "abierto hoy".
        const today = new Date().toISOString().split('T')[0];
        const openKey = `opened_${sessionId}_${today}`;
        if (!localStorage.getItem(openKey) && this.user) {
            localStorage.setItem(openKey, "true");
            setTimeout(() => this.addXP(20, "Exploración Diaria", false), 2000);
        }

        // Crear botón de finalización al fondo
        if(!document.getElementById("gami-finish-container")) {
            const btnContainer = document.createElement("div");
            btnContainer.id = "gami-finish-container";
            btnContainer.className = "gami-finish-wrapper";
            
            let alreadyCompleted = this.user?.completed_sessions?.includes(sessionId);
            
            btnContainer.innerHTML = `
                <button id="btn-complete-session" 
                    class="${alreadyCompleted ? 'btn-completed' : 'btn-active'}" 
                    style="${!alreadyCompleted && document.getElementById('flashcards-container') ? 'display: none;' : ''}">
                     ${alreadyCompleted ? "<i class='bx bx-check-double'></i> ¡Misión Cumplida!" : "<i class='bx bx-party'></i> Marcar como Completada (+150 XP)"}
                </button>
            `;
            
            // Insert before google translate or inside the main content area gracefully
            // Usually right at the very end of .notebook-container
            container.appendChild(btnContainer);

            // Listener
            if(!alreadyCompleted) {
                const btn = document.getElementById("btn-complete-session");
                btn.addEventListener("click", () => {
                    this.markSessionComplete(sessionId);
                });
            }
        }
    }

    renderFlashcards(data) {
        const container = document.getElementById("flashcards-container");
        if (!container) return;

        container.innerHTML = `
            <div class="flashcards-section interactive-section glass-panel" style="border-color: rgba(168, 85, 247, 0.3);">
                <h2 style="justify-content: center; margin-bottom: 5px;"><i class="bx bxs-brain"></i> Reto de Saberes: Flashcards</h2>
                <p style="color: var(--text-secondary); margin-bottom: 25px;">Toca las tarjetas para descubrir la respuesta y desbloquear tus créditos.</p>
                <div class="flashcards-grid"></div>
            </div>
        `;

        const grid = container.querySelector(".flashcards-grid");
        let flippedCount = 0;
        const total = data.length;

        data.forEach((card, index) => {
            const cardEl = document.createElement("div");
            cardEl.className = "flashcard";
            cardEl.innerHTML = `
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <span class="flashcard-badge">Pregunta ${index + 1}</span>
                        <div class="flashcard-icon"><i class="bx ${card.icon || 'bx-help-circle'}"></i></div>
                        <h3>${card.question}</h3>
                        <p style="margin-top: 15px; font-size: 0.8rem; opacity: 0.5;">(Clic para revelar)</p>
                    </div>
                    <div class="flashcard-back">
                        <span class="flashcard-badge">Respuesta</span>
                        <p>${card.answer}</p>
                    </div>
                </div>
            `;

            cardEl.addEventListener("click", () => {
                if (!cardEl.classList.contains("flipped")) {
                    cardEl.classList.add("flipped");
                    flippedCount++;
                    if (flippedCount === total) {
                        this.unlockCompletionButton();
                    }
                }
            });

            grid.appendChild(cardEl);
        });
    }

    unlockCompletionButton() {
        const btn = document.getElementById("btn-complete-session");
        if (btn) {
            btn.style.display = "inline-flex";
            btn.classList.add("unlock-anim");
            this.showToast("¡Reto completado! Ya puedes reclamar tus puntos.", "xp");
        }
    }

    // --- UTILS PARA EL DASHBOARD DOCENTE ---
    static getLevelInfo(xp) {
        // Redefinimos los niveles estáticos aquí para acceso sin instancia
        const LEVELS = [
            { id: 1, name: "Explorador Digital", threshold: 0, icon: "🎒" },
            { id: 2, name: "Inforg", threshold: 500, icon: "🦾" },
            { id: 3, name: "Ciborg Académico", threshold: 1200, icon: "🧠" },
            { id: 4, name: "Hacker Ético", threshold: 1900, icon: "⚡" },
            { id: 5, name: "Centauro de IA", threshold: 2500, icon: "🤖" }
        ];
        let currentLvl = LEVELS[0];
        for (let lvl of LEVELS) {
            if (xp >= lvl.threshold) {
                currentLvl = lvl;
            }
        }
        return currentLvl;
    }
}

// Iniciar Global Manager y Exponer Clase
window.GamificationManager = GamificationManager;
window.GAMI = new GamificationManager();
