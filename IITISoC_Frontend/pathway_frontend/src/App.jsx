import { useState } from 'react';
import Navbar from "./components/Navbar"
import ChatInput from "./components/ChatInput"
import ChatWindow from "./components/chatWindow"
import WelcomeScreen from './components/welcomeScreen';
 

function App() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      msgId: 'bot',
      text: 'Hello! I am your IIT Indore assistant. How can I help you today?',
      snippet: false
    }
  ]);
  

  const [showChat, setShowChat] = useState(false);
  function handleStartChat(){
    setShowChat(true);
  };

  const [thinking, showThinking] = useState(false);
  function handleThinking(){
    showThinking((prev) => (!prev));
  }

  const [listening, setListening] = useState(false);
function handleListening(val) {
  setListening(val);
}

  
  

  return (
    <div className="app" style={{ position: 'relative' }}>
      <Navbar />
      
      {!showChat ? (
        <WelcomeScreen onStartChat={handleStartChat} />
      ) : (
        <>
          {/* <div className="pt-20 h-screen flex flex-col"> */}
            <ChatWindow messages={messages} thinking={thinking} listening={listening}/>
            <ChatInput updateChat={setMessages} handleThinking={handleThinking} thinking={thinking} handleListening={handleListening}/>
          {/* </div> */}
        </>
      )}
    </div>
  )
}

export default App
