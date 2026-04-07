/*
   CONECTATE - Motor de Traducción (v1.1)
   Archivo compartido para todas las guías interactivas.
*/

function translatePage(langCode) {
    var select = document.querySelector('.goog-te-combo');
    
    if (langCode === 'es') {
        // Forzar retorno a español vía cookies (método más robusto)
        document.cookie = "googtrans=/es/es; path=/";
        document.cookie = "googtrans=/es/es; path=/; domain=" + location.hostname;
        document.cookie = "googtrans=/es/es; path=/; domain=." + location.hostname;
        
        if (select) {
            select.value = 'es';
            select.dispatchEvent(new Event('change'));
        }
        
        setTimeout(function() {
            location.reload();
        }, 150);
        return;
    }

    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    } else {
        document.cookie = "googtrans=/es/" + langCode + "; path=/";
        document.cookie = "googtrans=/es/" + langCode + "; path=/; domain=" + location.hostname;
        document.cookie = "googtrans=/es/" + langCode + "; path=/; domain=." + location.hostname;
        location.reload();
    }
}

// Callback para Google Translate API
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,pt,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');

    // SILENCIADOR DE NOTIFICACIONES MOLESTAS
    silenceGoogleTranslate();
}

/**
 * Elimina elementos intrusivos de Google Translate (barra, tooltips, etc.)
 */
function silenceGoogleTranslate() {
    // 1. Inyectar CSS adicional dinámicamente por si acaso
    var style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame { display: none !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        body { top: 0 !important; }
        #goog-gt-tt { display: none !important; visibility: hidden !important; }
    `;
    document.head.appendChild(style);

    // 2. Observer para limpiar el DOM de elementos inyectados
    const observer = new MutationObserver(() => {
        const toolbar = document.querySelector('.goog-te-banner-frame');
        if (toolbar) toolbar.remove();
        
        const tooltip = document.querySelector('#goog-gt-tt');
        if (tooltip) tooltip.remove();
        
        // Corregir desplazamiento forzado de body
        if (document.body.style.top !== '0px') {
            document.body.style.top = '0px';
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
