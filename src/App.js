import "./App.css";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
// import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  const createDirectChat = (creds) => {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  };

  const renderChatForm = (creds) => {
    return (
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "5px 8px",
            backgroundColor: "#1890FF",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
            borderWidth: "0px",
          }}
          onClick={() => createDirectChat(creds)}
        >
          Create
        </button>
      </div>
    );
  };

  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <div className="App">
      <ChatEngine
        height="100vh"
        projectID="0156a81f-ca18-435e-93ec-9ab1309e8774"
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderNewChatForm={(creds) => renderChatForm(creds)}
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
      />
    </div>
  );
}

export default App;
