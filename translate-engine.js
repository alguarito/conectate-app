/*
   CONECTATE - Motor de Traducción (v1.0)
   Archivo compartido para todas las guías interactivas.
*/

// Función principal: controla el selector custom de idiomas
function translatePage(langCode) {
    if (langCode === 'es') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
        location.reload();
        return;
    }
    var select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    } else {
        document.cookie = 'googtrans=/es/' + langCode + '; path=/;';
        document.cookie = 'googtrans=/es/' + langCode + '; path=/; domain=.' + location.hostname;
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
