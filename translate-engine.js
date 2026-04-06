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
}
