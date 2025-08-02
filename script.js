function convertTextToSpeech() {
  const text = document.getElementById("text").value;
  const language = document.getElementById("language").value;
  const downloadLink = document.getElementById("downloadLink");

  // Only allow English for now
  if (language !== "en") {
    alert("Currently only English text can be converted.");
    return;
  }

  if (!text.trim()) {
    alert("Please enter some text.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";

  // Set voice based on user selection
  const voiceType = document.getElementById("voiceType").value;
  const voiceAge = document.getElementById("voiceAge").value;

  const voices = speechSynthesis.getVoices();

  const filteredVoices = voices.filter(voice =>
    voice.lang === "en-US" &&
    voice.name.toLowerCase().includes(voiceType) &&
    voice.name.toLowerCase().includes(voiceAge)
  );

  if (filteredVoices.length > 0) {
    utterance.voice = filteredVoices[0];
  }

  // Speak
  speechSynthesis.speak(utterance);

  // Download as audio file
  const audio = new Audio();
  const synth = window.speechSynthesis;
  const mediaRecorderStream = new MediaStream();

  // For browser security, we can't record directly from speech synthesis.
  // Use external services for full download (or use a backend later).
  downloadLink.classList.remove("hidden");
}
