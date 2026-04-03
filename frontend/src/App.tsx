import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    setChat([
      ...chat,
      { user: message },
      { bot: data.answer, source: data.source }
    ]);

    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>🌾 Ajrasakha Chatbot</h2>

      <div style={styles.chatBox}>
        {chat.map((c, i) => (
          <div key={i}>
            {c.user && (
              <div style={styles.userMsg}>
                {c.user}
              </div>
            )}
            {c.bot && (
              <div style={styles.botMsg}>
                <div>{c.bot}</div>
                <small style={{ color: "gray" }}>({c.source})</small>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask farming question..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9"
  },
  userMsg: {
    backgroundColor: "#DCF8C6",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    textAlign: "right"
  },
  botMsg: {
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    textAlign: "left",
    border: "1px solid #ddd"
  },
  inputBox: {
    display: "flex"
  },
  input: {
    flex: 1,
    padding: "10px"
  },
  button: {
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none"
  }
};

export default App;