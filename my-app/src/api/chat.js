// src/api/chat.js
export async function sendMessage(message, options = {}) {
  const { history = [], firstTurn = false, forceAnalyze = false } = options;

  const res = await fetch('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: message,
      history,
      firstTurn,
      forceAnalyze
    })
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  // El backend devuelve { answer }
  return { reply: data.answer };
}
