const GEMINI_API_KEY = "AIzaSyBBXBkOmka3nWoa2O_WqX5zHW_RiMEuDqw"; // Replace this

async function improveText(text) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Make this text more clear and human-like: ${text}` }] }]
    })
  });

  const data = await res.json();
  const improved = data.candidates?.[0]?.content?.parts?.[0]?.text || text;
  return improved;
}

async function convertToAudio() {
  let text = document.getElementById("textInput").value;
  if (!text) return alert("Please enter text!");

  const improvedText = await improveText(text);
  const utterance = new SpeechSynthesisUtterance(improvedText);
  speechSynthesis.speak(utterance);
}
