/*
   CONECTATE - Motor de Traducción (v1.1)
   Archivo compartido para todas las guías interactivas.
*/

function translatePage(langCode) {
    // Intentar vía el widget nativo de Google Translate (más fiable)
    var select = document.querySelector('.goog-te-combo');
    if (select) {
        if (langCode === 'es') {
            // Para volver a español, Google usa cadena vacía o 'es'
            select.value = 'es';
            select.dispatchEvent(new Event('change'));
            // Limpiar cookies por si acaso
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
            // Pequeño delay y recargar para limpiar completamente
            setTimeout(function() { location.reload(); }, 300);
        } else {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
        }
    } else {
        // Fallback si el widget no ha cargado: usar cookies + recarga
        if (langCode === 'es') {
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
        } else {
            document.cookie = 'googtrans=/es/' + langCode + '; path=/';
            document.cookie = 'googtrans=/es/' + langCode + '; path=/; domain=.' + location.hostname;
        }
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
}
