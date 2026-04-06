/* 
   CONECTATE - Notebook Core Logic (v1.0)
   Centralized Interaction System for Grade 9
*/

document.addEventListener('DOMContentLoaded', () => {
    const themes = ['default', 'light-mode', 'theme-cyber', 'theme-aurora', 'theme-eink'];
    const themeIcons = ['bx-moon', 'bx-sun', 'bx-terminal', 'bx-planet', 'bx-book-reader'];

    let currentThemeIndex = parseInt(localStorage.getItem('conectate_themeIndex')) || 0;
    const themeBtn = document.getElementById('notebook-theme-toggle');

    function applyTheme(index) {
        themes.forEach(t => {
            if (t !== 'default') {
                document.body.classList.remove(t);
                document.documentElement.classList.remove(t);
            }
        });
        
        const nextClass = themes[index];
        if (nextClass !== 'default') {
            document.body.classList.add(nextClass);
            document.documentElement.classList.add(nextClass);
        }

        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = `bx ${themeIcons[index]}`;
            }
        }
    }

    applyTheme(currentThemeIndex);

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(currentThemeIndex);
            localStorage.setItem('conectate_themeIndex', currentThemeIndex);
        });
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
