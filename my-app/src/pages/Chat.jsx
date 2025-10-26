// src/pages/Chat.jsx
import { useEffect, useRef, useState } from 'react';
import { sendMessage } from '../api/chat';

function Bubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        background: isUser ? '#2563eb' : '#0f172a',
        color: 'white',
        padding: '10px 14px',
        borderRadius: 12,
        maxWidth: '75%',
        lineHeight: 1.4
      }}
    >
      {text}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! 👋 ¿En qué puedo ayudarte hoy?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function onSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      // Enviar historial real al backend
      const history = next.map(m => ({
        role: m.role,
        content: m.text
      }));

      const firstTurn = history.length <= 2; // true solo en el primer turno

      const { reply } = await sendMessage(text, { history, firstTurn });

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: `⚠️ Error al enviar el mensaje: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: '80vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        padding: 16,
        gap: 12
      }}
    >
      <div
        ref={listRef}
        style={{
          overflowY: 'auto',
          padding: 16,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          minHeight: 0
        }}
      >
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <form onSubmit={onSend} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje…"
          style={{
            flex: 1,
            padding: '12px 14px',
            border: '1px solid #e2e8f0',
            borderRadius: 10
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: 'none',
            background: loading ? '#94a3b8' : '#2563eb',
            color: 'white'
          }}
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
