let allVoices = [];

function populateVoicesForLanguage(lang) {
  const voiceSelect = document.getElementById('voiceSelect');
  voiceSelect.innerHTML = '';
  const filteredVoices = allVoices.filter(v => v.lang === lang);

  if (filteredVoices.length === 0) {
    const option = document.createElement('option');
    option.text = "No voice found";
    option.disabled = true;
    voiceSelect.appendChild(option);
    return;
  }

  filteredVoices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

function speakText() {
  const text = document.getElementById("textInput").value;
  const lang = document.getElementById("languageSelect").value;
  const voiceSelect = document.getElementById("voiceSelect");
  const selectedVoiceIndex = voiceSelect.value;
  const voicesForLang = allVoices.filter(v => v.lang === lang);
  const selectedVoice = voicesForLang[selectedVoiceIndex];

  if (!text.trim()) {
    alert("Please enter text.");
    return;
  }

  if (!selectedVoice) {
    alert("No voice available for selected language.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.voice = selectedVoice;

  window.speechSynthesis.speak(utterance);

  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("downloadBtn").onclick = () => {
    alert("Audio download not supported directly.\nUse recorder or advanced version.");
  };
}

window.speechSynthesis.onvoiceschanged = () => {
  allVoices = window.speechSynthesis.getVoices();
  const defaultLang = document.getElementById("languageSelect").value;
  populateVoicesForLanguage(defaultLang);
};

document.getElementById("languageSelect").addEventListener("change", (e) => {
  populateVoicesForLanguage(e.target.value);
});

