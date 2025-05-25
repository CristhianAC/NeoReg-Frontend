import React, { useState, useRef, useEffect } from "react";

function Chatbot() {
  // Historial de chats: cada chat es { id, title, messages }
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: Date.now(),
            title: "Nuevo chat",
            messages: [
              { text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot" },
            ],
          },
        ];
  });
  const [selectedChatId, setSelectedChatId] = useState(
    () => (chats[0] && chats[0].id) || null
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null); // Para el aviso
  const messagesEndRef = useRef(null);

  // Guardar chats en localStorage
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatId, chats]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat) return;

    const userMessage = { text: input, sender: "user" };
    updateChatMessages([...selectedChat.messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost/api/rag/api/v1/rag/sql-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();
      updateChatMessages([
        ...selectedChat.messages,
        userMessage,
        { text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      updateChatMessages([
        ...selectedChat.messages,
        userMessage,
        { text: "Hubo un error al conectar con el bot.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Actualiza los mensajes del chat seleccionado
  function updateChatMessages(newMessages) {
    setChats((chats) =>
      chats.map((chat) =>
        chat.id === selectedChatId ? { ...chat, messages: newMessages } : chat
      )
    );
  }

  // Crear un nuevo chat
  function handleNewChat() {
    const newChat = {
      id: Date.now(),
      title: "Nuevo chat",
      messages: [
        { text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot" },
      ],
    };
    setChats([newChat, ...chats]);
    setSelectedChatId(newChat.id);
  }

  // Cambiar el nombre del chat (opcional)
  function handleRenameChat(id, title) {
    setChats((chats) =>
      chats.map((chat) => (chat.id === id ? { ...chat, title } : chat))
    );
  }

  // Mostrar aviso antes de eliminar
  function handleAskDeleteChat(id) {
    setChatToDelete(id);
  }

  // Confirmar eliminación
  function handleConfirmDeleteChat() {
    setChats((prevChats) => {
      const updated = prevChats.filter((chat) => chat.id !== chatToDelete);
      if (selectedChatId === chatToDelete) {
        setSelectedChatId(updated[0] ? updated[0].id : null);
      }
      return updated;
    });
    setChatToDelete(null);
  }

  // Cancelar eliminación
  function handleCancelDeleteChat() {
    setChatToDelete(null);
  }

  // Si no hay chats, mostrar solo el sidebar y el área principal vacía con el botón de nuevo chat y el título
  return (
    <div style={{ display: "flex", height: "89vh", background: "#f7f7f8" }}>
      {/* Modal de confirmación */}
      {chatToDelete !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              minWidth: 300,
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
              ¿Seguro que quieres eliminar este chat?
            </div>
            <button
              onClick={handleConfirmDeleteChat}
              style={{
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                borderRadius: "0.7rem",
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              Sí, eliminar
            </button>
            <button
              onClick={handleCancelDeleteChat}
              style={{
                background: "#ececec",
                color: "#222",
                border: "none",
                borderRadius: "0.7rem",
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Sidebar de chats */}
      <aside
        style={{
          width: 260,
          background: "#fff",
          borderRight: "1px solid #ececec",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={handleNewChat}
          style={{
            margin: "1rem",
            padding: "0.75rem",
            borderRadius: "1rem",
            border: "none",
            background: "#0078fe",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Nuevo chat
        </button>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {chats.length === 0 ? (
            <div
              style={{
                color: "#888",
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "1rem",
              }}
            >
              No hay chats
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                style={{
                  padding: "1rem",
                  cursor: "pointer",
                  background:
                    chat.id === selectedChatId ? "#f0f4ff" : "transparent",
                  borderBottom: "1px solid #ececec",
                  fontWeight: chat.id === selectedChatId ? "bold" : "normal",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  style={{
                    border: "none",
                    background: "transparent",
                    fontWeight: "inherit",
                    width: "40%",
                  }}
                  value={chat.title}
                  onChange={(e) => handleRenameChat(chat.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAskDeleteChat(chat.id);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    marginLeft: "auto",
                  }}
                  title="Eliminar chat"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Área principal del chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: "90vh" }}>
        <header
          style={{
            padding: "1rem",
            background: "#fff",
            borderBottom: "1px solid #ececec",
            fontWeight: "bold",
            fontSize: "1.2rem",
            letterSpacing: "1px",
          }}
        >
          Chatbot
        </header>
        {chats.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              fontSize: "1.1rem",
              flexDirection: "column",
              maxHeight: "70vh",
            }}
          >
            <div>No hay chats. Crea uno nuevo para comenzar.</div>
          </div>
        ) : (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxHeight: "70vh",
              }}
            >
              {selectedChat &&
                selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                      background: msg.sender === "user" ? "#0078fe" : "#e5e5ea",
                      color: msg.sender === "user" ? "#fff" : "#222",
                      padding: "0.75rem 1rem",
                      borderRadius: "1.2rem",
                      maxWidth: "70%",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      fontSize: "1rem",
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
              {loading && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: "#e5e5ea",
                    color: "#222",
                    padding: "0.75rem 1rem",
                    borderRadius: "1.2rem",
                    maxWidth: "70%",
                    fontSize: "1rem",
                    opacity: 0.7,
                    fontStyle: "italic",
                  }}
                >
                  Escribiendo...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={handleSend}
              style={{
                display: "flex",
                padding: "1rem",
                background: "#fff",
                borderTop: "1px solid #ececec",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  borderRadius: "1.2rem",
                  border: "1px solid #ececec",
                  outline: "none",
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  background: "#f7f7f8",
                }}
                disabled={loading || !selectedChat}
              />
              <button
                type="submit"
                style={{
                  background: "#0078fe",
                  color: "#fff",
                  border: "none",
                  borderRadius: "1.2rem",
                  padding: "0.75rem 1.5rem",
                  fontWeight: "bold",
                  cursor: loading || !selectedChat ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  transition: "background 0.2s",
                  opacity: loading || !selectedChat ? 0.7 : 1,
                }}
                disabled={loading || !selectedChat}
              >
                Enviar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
