// Configuración inicial
const chatForm = document.getElementById('chat-form');
const chatHistory = document.getElementById('chat-history');
const messageInput = document.getElementById('message');

// Token de la API
const API_TOKEN = "AIzaSyD3T9ARTtbCfP6eTQY37mILm2RlYIFWdrE";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_TOKEN;

// Función para agregar mensajes al chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = content;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Hace scroll al final del chat
}

// Función para enviar el mensaje a la API
async function sendMessageToAPI(message) {
    try {
        // Realiza la solicitud HTTP POST a la API
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: message }]
                    }
                ]
            })
        });

        // Manejo de respuesta
        if (!response.ok) {
            throw new Error(`Error en la conexión: ${response.statusText}`);
        }

        const data = await response.json();
        // Extraer la respuesta de la IA
        const reply = data.candidates[0]?.content?.parts[0]?.text || "Respuesta no disponible";
        addMessage(reply, "ia"); // Muestra la respuesta de la IA en el chat
    } catch (error) {
        console.error("Error:", error);
        addMessage("Hubo un error al conectar con la IA.", "ia");
    }
}

// Manejar el envío del formulario
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userMessage = messageInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, "user"); // Mostrar mensaje del usuario
        messageInput.value = ""; // Limpiar campo de texto

        sendMessageToAPI(userMessage); // Enviar mensaje a la API
    } else if (!userMessage && localStorage.getItem('user')) { // Si no hay mensaje y hay un usuario logeado
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const initialMessage = `Hola @${storedUser.name}, ¿cómo te puedo ayudar hoy?`;
        addMessage(initialMessage, "ia"); // Mostrar mensaje inicial de la IA
        sendMessageToAPI(initialMessage); // Enviar mensaje inicial a la API
    }
});
