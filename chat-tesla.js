// chat-tesla.js

window.addEventListener('load', function() {
(function () {
    // ⚡ URL de tu Cloudflare Worker
    const API_URL = "https://gemini-proxy.alvaro-cardenas-orozco.workers.dev";

    // Detect base path for images (works for root and subdirectories)
    const getBaseImgPath = () => {
        const pathSegments = window.location.pathname.split('/').filter(s => s !== '');
        // Si estamos en GitHub Pages (ej: /conectate/), el primer segmento es el repo
        // Si estamos en local (ej: /), no hay segmentos o el primero es el archivo/carpeta
        
        const isGitHubPages = window.location.hostname.includes('github.io');
        const repoName = isGitHubPages ? pathSegments[0] : null;
        
        let depth = 0;
        if (isGitHubPages) {
            // En GitHub Pages: /repo/folder/file.html -> depth 1 (folder)
            depth = Math.max(0, pathSegments.length - 2);
        } else {
            // En local: /folder/file.html -> depth 1
            depth = Math.max(0, pathSegments.length - 1);
        }
        
        const prefix = '../'.repeat(depth);
        return prefix + 'IMAGENES/LOGO TESLA.png';
    };

    const logoPath = getBaseImgPath();

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
    #tesla-widget { position: fixed; bottom: 30px; right: 30px; z-index: 99999; font-family: 'Outfit', sans-serif; }
    #tesla-btn { width: 140px; height: 140px; background: transparent; border: none; cursor: pointer; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; justify-content: center; align-items: center; outline: none; padding: 0; }
    #tesla-btn:hover { transform: scale(1.08) rotate(2deg); }
    #tesla-btn img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.7)); animation: float-pulse 3s infinite ease-in-out; }
    @keyframes float-pulse { 0% { filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.5)); transform: translateY(0px); } 50% { filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.9)); transform: translateY(-10px); } 100% { filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.5)); transform: translateY(0px); } }
    
    #tesla-chat-box { position: absolute; bottom: 155px; right: 0; width: 350px; height: 500px; max-height: 70vh; background: rgba(13, 14, 21, 0.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); overflow: hidden; }
    #tesla-chat-box.active { opacity: 1; visibility: visible; transform: translateY(0); }
    
    #tesla-header { background: linear-gradient(90deg, #1e1b4b, #312e81); padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); }
    #tesla-header-info { display: flex; align-items: center; gap: 12px; }
    #tesla-header-info img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #a855f7; object-fit: cover; }
    #tesla-header-info h3 { color: white; margin: 0; font-size: 1.1rem; font-weight: 600; }
    #tesla-header-info p { color: #a855f7; margin: 0; font-size: 0.8rem; }
    #tesla-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; transition: color 0.2s; }
    #tesla-close:hover { color: #f43f5e; }
    
    #tesla-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; scroll-behavior: smooth; }
    .msg { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 0.95rem; line-height: 1.5; color: white; word-wrap: break-word; font-family: 'Inter', sans-serif;}
    .msg.bot { align-self: flex-start; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-bottom-left-radius: 4px; }
    .msg.user { align-self: flex-end; background: linear-gradient(135deg, #a855f7, #6366f1); border-bottom-right-radius: 4px; }
    .msg img { max-width: 100%; border-radius: 8px; margin-top: 8px; border: 1px solid rgba(255,255,255,0.2); }
    
    #tesla-input-area { padding: 15px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 10px; position: relative; }
    #tesla-img-preview { position: absolute; bottom: 100%; left: 0; width: 100%; background: rgba(0,0,0,0.8); padding: 10px; display: none; align-items: center; gap: 10px; border-top-left-radius: 20px; border-top-right-radius: 20px;}
    #tesla-img-preview img { height: 50px; border-radius: 6px; }
    #tesla-img-preview button { background: #f43f5e; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; display: flex; justify-content: center; align-items: center;}
    
    #tesla-file-btn { background: none; border: none; color: #a855f7; font-size: 1.4rem; cursor: pointer; transition: color 0.2s; padding: 5px; }
    #tesla-file-btn:hover { color: #d8b4fe; }
    #tesla-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 10px 15px; color: white; outline: none; transition: border-color 0.3s; font-family: 'Inter', sans-serif; }
    #tesla-input:focus { border-color: #a855f7; }
    #tesla-send-btn { background: #a855f7; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: background 0.3s; }
    #tesla-send-btn:hover { background: #9333ea; }
    #tesla-typing { font-size: 0.85rem; color: #a855f7; display: none; align-self: flex-start; padding-left: 20px; margin-top: -5px; font-style: italic; }
    
    html.light-mode #tesla-chat-box { background: rgba(255, 255, 255, 0.95); box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.1); }
    html.light-mode #tesla-header { background: linear-gradient(90deg, #f8fafc, #e2e8f0); border-bottom: 1px solid rgba(0,0,0,0.05); }
    html.light-mode #tesla-header-info h3 { color: #1e293b; }
    html.light-mode #tesla-close { color: #475569; }
    html.light-mode .msg.bot { background: #f1f5f9; border: 1px solid #e2e8f0; color: #1e293b; }
    html.light-mode #tesla-input-area { background: #f8fafc; border-top: 1px solid rgba(0,0,0,0.05); }
    html.light-mode #tesla-input { background: white; border: 1px solid #cbd5e1; color: #1e293b; }
    html.light-mode #tesla-input::placeholder { color: #94a3b8; }
    html.light-mode #tesla-img-preview { background: rgba(255,255,255,0.95); border-top: 1px solid rgba(0,0,0,0.1);}
    
    .msg pre { background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; overflow-x: auto; margin-top: 10px; }
    html.light-mode .msg.bot pre { background: #e2e8f0; }
    
    @media (max-width: 480px) {
        #tesla-chat-box { width: calc(100vw - 40px); bottom: 100px; right: 20px; height: 60vh; }
        #tesla-widget { bottom: 20px; right: 20px; }
    }
    `;
    document.head.appendChild(style);

    // Inject HTML body
    const widgetHTML = `
    <div id="tesla-widget">
        <div id="tesla-chat-box">
            <div id="tesla-header">
                <div id="tesla-header-info">
                    <img src="${logoPath}" alt="Tutor IA">
                    <div>
                        <h3>Profesor Álvaro</h3>
                        <p>Tu Asesor IA de Tecnología</p>
                    </div>
                </div>
                <button id="tesla-close"><i class='bx bx-x'></i></button>
            </div>
            
            <div id="tesla-messages">
                <div class="msg bot">¡Hola, clase! 👨🏻‍🏫✨ Soy la mente virtual del Profesor Álvaro. Estoy aquí para acompañarte en nuestra aventura por la Infoesfera. ¿Qué concepto quieres explorar hoy o qué foto de tu tablero quieres que analicemos juntos?</div>
            </div>
            <div id="tesla-typing">El Profesor está analizando datos...</div>
            
            <div id="tesla-img-preview">
                <img id="tesla-preview-img" src="" alt="Preview">
                <button id="tesla-remove-img"><i class='bx bx-trash'></i></button>
            </div>
            
            <div id="tesla-input-area">
                <input type="file" id="tesla-file-input" accept="image/*" style="display:none;">
                <button id="tesla-file-btn"><i class='bx bx-camera'></i></button>
                <input type="text" id="tesla-input" placeholder="Pregúntale al Profe Álvaro..." autocomplete="off">
                <button id="tesla-send-btn"><i class='bx bx-send'></i></button>
            </div>
        </div>
        <button id="tesla-btn">
            <img src="${logoPath}" alt="Chat con Profesor Álvaro">
        </button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Initialise elements
    const btnOpen = document.getElementById('tesla-btn');
    const btnClose = document.getElementById('tesla-close');
    const chatBox = document.getElementById('tesla-chat-box');
    const messages = document.getElementById('tesla-messages');
    const input = document.getElementById('tesla-input');
    const btnSend = document.getElementById('tesla-send-btn');
    const btnFile = document.getElementById('tesla-file-btn');
    const fileInput = document.getElementById('tesla-file-input');
    const imgPreviewBox = document.getElementById('tesla-img-preview');
    const previewImg = document.getElementById('tesla-preview-img');
    const btnRemoveImg = document.getElementById('tesla-remove-img');
    const typingIndicator = document.getElementById('tesla-typing');

    let currentImageBase64 = null;
    let currentImageMimeType = null;

    // Check session memory
    let chatHistory = JSON.parse(sessionStorage.getItem('teslaChatHistory')) || [];

    if (chatHistory.length > 0) {
        messages.innerHTML = '';
        chatHistory.forEach(msg => {
            appendMessage(msg.role === 'user' ? 'user' : 'bot', formatText(msg.parts[0].text));
        });
        scrollToBottom();
    }

    // Handlers
    btnOpen.addEventListener('click', () => {
        chatBox.classList.add('active');
        input.focus();
    });
    btnClose.addEventListener('click', () => chatBox.classList.remove('active'));

    btnFile.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            currentImageBase64 = reader.result.split(',')[1];
            currentImageMimeType = file.type;
            previewImg.src = reader.result;
            imgPreviewBox.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    });

    btnRemoveImg.addEventListener('click', () => {
        currentImageBase64 = null;
        currentImageMimeType = null;
        fileInput.value = '';
        imgPreviewBox.style.display = 'none';
        input.focus();
    });

    function formatText(text) {
        return text
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code blocks
            .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text && !currentImageBase64) return;

        let userHtml = formatText(text);
        if (currentImageBase64) {
            userHtml += `<br><img src="data:${currentImageMimeType};base64,${currentImageBase64}">`;
        }

        appendMessage('user', userHtml);
        input.value = '';

        const partsText = text || "Revisa esta imagen por favor, Profe.";
        const payloadParts = [{ "text": partsText }];

        if (currentImageBase64) {
            payloadParts.push({
                "inline_data": {
                    "mime_type": currentImageMimeType,
                    "data": currentImageBase64
                }
            });
            currentImageBase64 = null;
            currentImageMimeType = null;
            fileInput.value = '';
            imgPreviewBox.style.display = 'none';
        }

        // Push user message to history
        chatHistory.push({ "role": "user", "parts": [{ "text": partsText }] });
        sessionStorage.setItem('teslaChatHistory', JSON.stringify(chatHistory));

        typingIndicator.style.display = 'block';
        scrollToBottom();

        try {
            const requestBody = {
                "system_instruction": {
                    "parts": [{ "text": "Eres el clon de Inteligencia Artificial del Profesor Álvaro Cárdenas Orozco, el tutor de Tecnología e Informática de los estudiantes de secundaria de la Institución Educativa Sor María Juliana. Tienes un tono muy cercano, pedagógico, carismático y altamente inspirador. REGLA DE ORO: Nunca des las respuestas directas a los ejercicios, guías matemáticas o prácticas lógicas; en lugar de eso, respóndeles con preguntas reflexivas o pistas que enganchen su curiosidad escolar. CRÍTICO: Si suben una foto de su cuaderno, diagrama o ejercicio, NO te limites a darles la teoría de lo que ves; primero, felicítalos con gran entusiasmo por su excelente dibujo o esfuerzo visual, y luego usa esa foto como pretexto para iniciar un diálogo socrático que los rete y motive a deducir el siguiente paso lógico por sí mismos." }]
                },
                "contents": []
            };

            // Build Context Payload (Last 6 turns)
            const recentHistory = chatHistory.slice(-6);
            const geminiHistory = recentHistory.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: m.parts
            }));

            // Override the last turn to include the image if there is one
            geminiHistory.pop();
            geminiHistory.push({
                "role": "user",
                "parts": payloadParts
            });

            requestBody.contents = geminiHistory;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error("API Connection Error");

            const data = await response.json();
            const botReply = data.candidates[0].content.parts[0].text;

            chatHistory.push({ "role": "model", "parts": [{ "text": botReply }] });
            sessionStorage.setItem('teslaChatHistory', JSON.stringify(chatHistory));

            typingIndicator.style.display = 'none';
            appendMessage('bot', formatText(botReply));

        } catch (error) {
            console.error(error);
            chatHistory.pop(); // Elimina el mensaje fallido para no corromper la alternancia en sessionStorage
            sessionStorage.setItem('teslaChatHistory', JSON.stringify(chatHistory));
            typingIndicator.style.display = 'none';
            appendMessage('bot', "Mis bobinas sufrieron interferencia temporal y no pude procesar la señal en la nube. ¡Por favor, intenta enviar tu mensaje de nuevo!");
        }
    }

    function appendMessage(sender, htmlContent) {
        const div = document.createElement('div');
        div.className = 'msg ' + sender;
        div.innerHTML = htmlContent;
        messages.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, 50);
    }

    btnSend.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

})();
});
