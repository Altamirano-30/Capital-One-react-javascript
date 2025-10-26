// src/api/voice.js
export async function sendVoice(blobOrFile) {
  const fd = new FormData();
  // el backend espera el campo "audio"
  fd.append('audio', blobOrFile, 'input.webm'); // o .wav/.m4a según tu grabación

  const res = await fetch('/voice', {
    method: 'POST',
    body: fd
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || `HTTP ${res.status}`);
  }

  // respuesta es audio/mpeg binario: conviértelo a blob para reproducir
  const mp3Blob = await res.blob();
  const url = URL.createObjectURL(mp3Blob); // úsalo en un <audio src={url}/>
  return { url, blob: mp3Blob };
}
