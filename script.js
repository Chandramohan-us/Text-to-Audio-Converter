function speakText() {
  const text = document.getElementById("textInput").value;
  if (text.trim() === "") {
    alert("Please enter some text first.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}
