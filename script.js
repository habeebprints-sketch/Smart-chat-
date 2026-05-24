import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwQaTiMDd2HVtOvrIdfcPe5pI-22BcMHw",
  authDomain: "smartchat-80fce.firebaseapp.com",
  projectId: "smartchat-80fce",
  storageBucket: "smartchat-80fce.firebasestorage.app",
  messagingSenderId: "881322131014",
  appId: "1:881322131014:web:3180eff9e181519cc45447",
  measurementId: "G-WYZ9KPVM5Q"
};

initializeApp(firebaseConfig);

// PUT YOUR REAL GEMINI API KEY HERE
const API_KEY = "AIzaSyCzoUMTvrQG4Ib93gGGKA_qh3GDP8M0V0Y";

async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value.trim();

  if (!userText) return;

  // Show user message
  chatBox.innerHTML += `
    <div class="message user">${userText}</div>
  `;

  input.value = "";

  // Loading message
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot";
  loadingDiv.innerText = "Typing...";
  chatBox.appendChild(loadingDiv);

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userText
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    loadingDiv.remove();

    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    chatBox.innerHTML += `
      <div class="message bot">${botReply}</div>
    `;

  } catch (error) {

    loadingDiv.innerText = "Error connecting to AI.";

    console.error(error);
  }
}

window.sendMessage = sendMessage;
