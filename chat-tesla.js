// chat-tesla.js — Con sistema de cola diferida para evitar race conditions
window._teslaPendingContext = null; // Cola diferida
window.triggerTeslaContext = function(context) {
    // Si el chatbot aún no está listo, guardamos el contexto para ejecutarlo después
    window._teslaPendingContext = context;
};

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";

        const systemPrompts = {
            default: "Eres el Profe Alvarito, experto en Tecnología e Informática. Tu función es asesorar a los estudiantes en el desarrollo de sus guías y contenidos de la asignatura. Responde dudas técnicas y pedagógicas basándote en un enfoque crítico y constructivista. Tu tono es profesional, motivador y académico.",
            vocational: "Eres el Profe Alvarito, mentor de orientación vocacional. Tu misión es brindar apoyo y guía empática para el desarrollo vocacional de los estudiantes de Cartago, Valle. Ayúdalos a descubrir sus pasiones y conéctalas con opciones locales reales como la Universidad del Valle (Sede Cartago), el SENA y otras instituciones del Norte del Valle. Tu tono es inspirador, crítico y pedagógico, siempre buscando que el estudiante tome decisiones informadas sobre su futuro.",
            personal: "Eres el Profe Alvarito, mentor de desarrollo personal. Tu objetivo es ayudar al joven a reconocer sus habilidades únicas, talentos y áreas de mejora. Proporciona consejos prácticos, hábitos de éxito y fomenta la auto-reflexión crítica. Tu tono es de apoyo constante, sabiduría cercana y aliento para superar retos personales."
        };

        const welcomeMessages = {
            default: "¡Hola, Inforg! Soy el Profe Alvarito en versión digital. ¿Qué desafío tecnológico vamos a investigar o crear hoy? Recuerda: ¡siempre puedes ser mejor si te lo propones! 🚀",
            vocational: "¡Hola! Soy tu mentor de Orientación Vocacional. Estoy aquí para ayudarte a descubrir tu camino profesional en Cartago y el Valle. ¿Hablamos de tus sueños y opciones para el futuro? 🎓",
            personal: "¡Hola! Soy tu guía de Apoyo Personal. Vamos a trabajar en reconocer tus talentos y fortalecer tus habilidades. ¿En qué área te gustaría mejorar hoy? ✨",
            potential: "¡Hola! Soy tu guía de Apoyo Personal (Potencial). Vamos a trabajar en reconocer tus talentos y fortalecer tus habilidades. ¿En qué área te gustaría mejorar hoy? ✨"
        };
        
        // Alias para compatibilidad
        systemPrompts.potential = systemPrompts.personal;

        const fallbackResponses = {
            default: [
                "Mis sistemas cuánticos están recalibrándose ahora mismo. Mientras tanto, ¿por qué no repasas la última sesión de tu cuaderno interactivo?",
                "Parece que hay interferencia en la red. Recuerda que la curiosidad es el motor del aprendizaje. ¡Intenta conectarte de nuevo en un rato!",
                "Estoy procesando demasiados datos en este momento. Te invito a explorar los proyectos de tus compañeros en la Galería TIC."
            ],
            vocational: [
                "Mi conexión con la base de datos vocacional está pausada. Piensa en esto: ¿qué actividad disfrutas tanto que se te pasa el tiempo sin darte cuenta?",
                "Interferencia temporal. Mientras regreso en línea, investiga sobre los programas académicos del SENA o la Universidad del Valle aquí en Cartago.",
                "Estoy en modo ahorro de energía. Recuerda que tu vocación no es solo un título, es cómo quieres impactar al mundo. ¡Hablamos pronto!"
            ],
            personal: [
                "Estoy recargando mis bobinas emocionales. Aprovecha este momento para hacer una pausa, respirar profundo y reconocer un logro que hayas tenido hoy.",
                "Conexión pausada. Un buen ejercicio para hoy: escribe en una hoja tres talentos que crees que tienes. ¡Te sorprenderás!",
                "La red está lenta, pero tu potencial no. A veces, desconectarse un rato de las pantallas es el mejor desarrollo personal."
            ]
        };
        fallbackResponses.potential = fallbackResponses.personal;

        let currentContext = 'default';
        let conversationHistory = []; // Historial multi-turno
        const MAX_HISTORY = 6; // Máximo de mensajes a recordar (reducido para ahorrar tokens/créditos)

        const getBaseImgPath = () => {
            const path = window.location.pathname;
            const depth = (path.includes('OCTAVO') || path.includes('NOVENO') || path.includes('DECIMO') || path.includes('UNDECIMO') || path.includes('DOCENTE')) ? 1 : 0;
            return '../'.repeat(depth) + 'IMAGENES/LOGO TESLA.png';
        };

        const logoPath = getBaseImgPath();
        const style = document.createElement('style');
        style.innerHTML = `
    #tesla-widget { position: fixed; bottom: 30px; right: 30px; z-index: 99999; font-family: 'Outfit', sans-serif; display: none; }
    #tesla-btn { width: 140px; height: 140px; background: transparent; border: none; cursor: pointer; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; justify-content: center; align-items: center; outline: none; padding: 0; }
    #tesla-btn img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.7)); animation: float-pulse 3s infinite ease-in-out; }
    @keyframes float-pulse { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
    #tesla-chat-box { position: absolute; bottom: 155px; right: 0; width: 350px; height: 500px; max-height: 70vh; background: rgba(13, 14, 21, 0.95); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.4s ease; overflow: hidden; }
    #tesla-chat-box.active { opacity: 1; visibility: visible; transform: translateY(0); }
    #tesla-header { background: linear-gradient(90deg, #1e1b4b, #312e81); padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; }
    #tesla-header h3 { color: white; margin: 0; font-size: 1.1rem; }
    #tesla-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; }
    .msg { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 0.95rem; color: white; }
    .msg.bot { align-self: flex-start; background: rgba(255,255,255,0.05); }
    .msg.user { align-self: flex-end; background: linear-gradient(135deg, #a855f7, #6366f1); }
    #tesla-input-area { padding: 15px; background: rgba(0,0,0,0.3); display: flex; align-items: center; gap: 10px; }
    #tesla-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 10px 15px; color: white; outline: none; }
    #tesla-send-btn { background: #a855f7; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; }
    #tesla-typing { font-size: 0.8rem; color: #a855f7; display: none; padding-left: 20px; margin-top: -10px; }
    `;
        document.head.appendChild(style);

        const widgetHTML = `
    <div id="tesla-widget">
        <div id="tesla-chat-box">
            <div id="tesla-header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${logoPath}" style="width: 35px;">
                    <h3>Profe Alvarito (Digital)</h3>
                </div>
                <button id="tesla-close" style="background:none; border:none; color:white; cursor:pointer; font-size: 1.5rem;">&times;</button>
            </div>
            <div id="tesla-messages">
                <!-- Dinámico -->
            </div>
            <div id="tesla-typing">El Profe Alvarito está pensando...</div>
            <div id="tesla-input-area">
                <input type="text" id="tesla-input" placeholder="Pregúntale algo al Profe Alvarito..." autocomplete="off">
                <button id="tesla-send-btn">></button>
            </div>
        </div>
        <button id="tesla-btn"><img src="${logoPath}"></button>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        const teslaWidget = document.getElementById('tesla-widget');
        // MODIFICACIÓN: Mostrar siempre el widget, incluso sin registro previo
        teslaWidget.style.display = 'block';

        const btnOpen = document.getElementById('tesla-btn');
        const btnClose = document.getElementById('tesla-close');
        const chatBox = document.getElementById('tesla-chat-box');
        const messages = document.getElementById('tesla-messages');
        const input = document.getElementById('tesla-input');
        const btnSend = document.getElementById('tesla-send-btn');
        const typingIndicator = document.getElementById('tesla-typing');

        window.triggerTeslaContext = (context) => {
            if (!systemPrompts[context]) context = 'default';
            currentContext = context;
            
            // Limpiar historial al cambiar de contexto
            conversationHistory = [];
            messages.innerHTML = '';
            
            appendMessage('bot', welcomeMessages[context]);
            chatBox.classList.add('active');
            input.focus();
        };

        // Ejecutar contexto pendiente si el usuario hizo clic antes de que cargara el chat
        if (window._teslaPendingContext) {
            const pendingCtx = window._teslaPendingContext;
            window._teslaPendingContext = null;
            setTimeout(() => window.triggerTeslaContext(pendingCtx), 50);
        }

        btnOpen.onclick = () => { 
            // Si se abre manualmente y está vacío, usar default
            if (messages.children.length === 0) {
                window.triggerTeslaContext('default');
            }
            chatBox.classList.add('active'); 
            input.focus(); 
        };
        btnClose.onclick = () => chatBox.classList.remove('active');

        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            appendMessage('user', text);
            input.value = '';
            typingIndicator.style.display = 'block';

            try {
                // Usar system_instruction correctamente para que el rol sea siempre respetado
                const contextInstruction = systemPrompts[currentContext];

                // Agregar el mensaje del usuario al historial
                conversationHistory.push({
                    role: "user",
                    parts: [{ text: text }]
                });

                // Limitar historial para no sobrepasar el contexto de la API
                if (conversationHistory.length > MAX_HISTORY) {
                    conversationHistory = conversationHistory.slice(-MAX_HISTORY);
                }

                const payload = {
                    system_instruction: {
                        parts: [{ text: contextInstruction }]
                    },
                    contents: conversationHistory
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error en servidor (${response.status}): ${errorText}`);
                }
                const data = await response.json();
                if (!data.candidates || !data.candidates[0].content) {
                    throw new Error("Respuesta de IA incompleta o inválida.");
                }
                const botReply = data.candidates[0].content.parts[0].text;

                // Agregar respuesta del bot al historial
                conversationHistory.push({
                    role: "model",
                    parts: [{ text: botReply }]
                });

                typingIndicator.style.display = 'none';
                appendMessage('bot', botReply);
            } catch (error) {
                console.error("Error Agente Tesla Detallado:", error);
                typingIndicator.style.display = 'none';
                
                // MODO RESILIENCIA (OFFLINE FALLBACK)
                // En lugar de dar error genérico, damos un consejo pre-programado basado en el contexto
                const fallbackArray = fallbackResponses[currentContext] || fallbackResponses.default;
                const randomFallback = fallbackArray[Math.floor(Math.random() * fallbackArray.length)];
                
                // Removemos el último mensaje del usuario del historial para no corromper el contexto futuro si la API se recupera
                conversationHistory.pop();
                
                appendMessage('bot', `⚡ (Modo Offline) ${randomFallback}`);
            }
        }

        function appendMessage(sender, text) {
            const div = document.createElement('div');
            div.className = 'msg ' + sender;
            div.textContent = text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        }

        btnSend.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    })();
});
