// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCwQaTiMDd2HVtOvrIdfcPe5pI-22BcMHw",
  authDomain: "smartchat-80fce.firebaseapp.com",
  projectId: "smartchat-80fce",
  storageBucket: "smartchat-80fce.firebasestorage.app",
  messagingSenderId: "881322131014",
  appId: "1:881322131014:web:3180eff9e181519cc45447",
  measurementId: "G-WYZ9KPVM5Q"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Gemini API Key
const API_KEY = "PASTE_GEMINI_API_KEY";

// Send Message
async function sendMessage(){

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;

  if(userText === "") return;

  chatBox.innerHTML += `
    <div class="message user">${userText}</div>
  `;

  input.value = "";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        contents:[
          {
            parts:[
              { text:userText }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const botReply =
    data.candidates[0].content.parts[0].text;

  chatBox.innerHTML += `
    <div class="message bot">${botReply}</div>
  `;
}

window.sendMessage = sendMessage;
