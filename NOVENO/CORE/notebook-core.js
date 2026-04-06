/* 
   CONECTATE - Notebook Core Logic (v1.1)
   Centralized Interaction System - Legacy Support
*/

document.addEventListener('DOMContentLoaded', () => {
    // Nota: El sistema de temas ahora es gestionado por gamification.js de forma global para todos los grados.
    
    // Re-chequeo sutil de tema si el botón existe (por si gamification cargó antes o después)
    const themeBtn = document.getElementById('notebook-theme-toggle');
    if (themeBtn && window.GAMI) {
        window.GAMI.applyTheme(window.GAMI.user ? window.GAMI.user.themeIndex : 0);
    }

    // 2. Preloader Removal
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }
    });
});

// 3. Concept Card Toggle (Global scope for onclick attributes)
function toggleDesc(element) {
    const desc = element.querySelector('.concept-desc');
    const icon = element.querySelector('i');
    if (desc) {
        if (desc.style.display === 'block') {
            desc.style.display = 'none';
            if(icon) icon.className = 'bx bx-plus';
        } else {
            desc.style.display = 'block';
            if(icon) icon.className = 'bx bx-minus';
        }
    }
}

// 4. Sistema de Traducción Global
function translatePage(langCode) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change'));
    } else {
        // Fallback: intentar cargar Google Translate si no existe
        const gtDiv = document.getElementById('google_translate_element');
        if (gtDiv) {
            console.warn("Google Translate aún no ha cargado. Reintentando...");
            setTimeout(() => translatePage(langCode), 1000);
        }
    }
}

// 5. Inicialización de Google Translate (callback global)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,pt,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}
