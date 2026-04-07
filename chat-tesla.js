// chat-tesla.js actualizado con reporte de errores
window.addEventListener('load', function () {
    (function () {
        const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";

        const getBaseImgPath = () => {
            const path = window.location.pathname;
            const depth = (path.includes('OCTAVO') || path.includes('NOVENO') || path.includes('DECIMO') || path.includes('UNDECIMO')) ? 1 : 0;
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
                    <h3>Agente Tesla</h3>
                </div>
                <button id="tesla-close" style="background:none; border:none; color:white; cursor:pointer; font-size: 1.5rem;">&times;</button>
            </div>
            <div id="tesla-messages">
                <div class="msg bot">¡Hola! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?</div>
            </div>
            <div id="tesla-typing">Tesla está pensando...</div>
            <div id="tesla-input-area">
                <input type="text" id="tesla-input" placeholder="Pregunta algo..." autocomplete="off">
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

        btnOpen.onclick = () => { chatBox.classList.add('active'); input.focus(); };
        btnClose.onclick = () => chatBox.classList.remove('active');

        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            appendMessage('user', text);
            input.value = '';
            typingIndicator.style.display = 'block';

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
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
                typingIndicator.style.display = 'none';
                appendMessage('bot', botReply);
            } catch (error) {
                console.error("Error Agente Tesla Detallado:", error);
                typingIndicator.style.display = 'none';
                appendMessage('bot', "Lo siento, mis bobinas tienen interferencia. Intenta de nuevo o verifica tu conexión.");
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
