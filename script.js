let voices = [];

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  const voiceSelect = document.getElementById('voiceSelect');
  voiceSelect.innerHTML = '';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = `${voice.name} (${voice.lang}) ${voice.gender || ''}`;
    voiceSelect.appendChild(option);
  });
}

window.speechSynthesis.onvoiceschanged = populateVoices;

function speakText() {
  const text = document.getElementById("textInput").value;
  const lang = document.getElementById("languageSelect").value;
  const selectedVoice = voices[document.getElementById("voiceSelect").value];

  if (!text.trim()) {
    alert("Please enter text first.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.voice = selectedVoice;

  window.speechSynthesis.speak(utterance);

  // Download Button is for appearance only (browser API doesn’t support download directly)
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("downloadBtn").onclick = () => {
    alert("Download not supported directly from Web Speech API.\nUse screen recorder or 3rd-party tool.");
  };
}
