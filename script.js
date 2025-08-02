const API_KEY = "AIzaSyBBXBkOmka3nWoa2O_WqX5zHW_RiMEuDqw";

// Translate using Gemini API
async function translateToEnglish(inputText, sourceLang) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Translate this to English: ${inputText}` }]
        }]
      })
    });

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || inputText;
  } catch (error) {
    console.error("Translation error:", error);
    return inputText;
  }
}

async function convertTextToSpeech() {
  const textInput = document.getElementById("text").value;
  const language = document.getElementById("language").value;
  const voiceType = document.getElementById("voiceType").value;
  const voiceAge = document.getElementById("voiceAge").value;

  if (!textInput.trim()) {
    alert("Please enter some text.");
    return;
  }

  let finalText = textInput;

  // Translate if not English
  if (language !== "en") {
    finalText = await translateToEnglish(textInput, language);
  }

  const utterance = new SpeechSynthesisUtterance(finalText);
  utterance.lang = "en-US";

  // Match voice type and age using name keywords (limited to what's available)
  const voices = speechSynthesis.getVoices();
  const voiceKeyword = `${voiceType} ${voiceAge}`.toLowerCase();
  const selectedVoice = voices.find(v =>
    v.name.toLowerCase().includes(voiceType) ||
    v.name.toLowerCase().includes(voiceAge)
  );

  if (selectedVoice) utterance.voice = selectedVoice;

  // Speak the text
  speechSynthesis.speak(utterance);

  // Create downloadable audio (via SpeechSynthesis workaround)
  utterance.onend = () => {
    createAudioDownload(finalText);
  };
}

function createAudioDownload(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const audioBlob = new Blob([text], { type: 'text/plain' }); // Placeholder for actual audio
  const url = URL.createObjectURL(audioBlob);
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = url;
  downloadLink.classList.remove("hidden");
}
