import { Sparkles } from 'lucide-react'; // Ensure lucide-react is installed

function WelcomeScreen ({ onStartChat }){ 
    return (
  <div className="welcome-screen">
    <div className="welcome-wrapper">
      <div className="welcome-card">
        <div className="welcome-icon-wrapper">
          <div className="welcome-icon">
            <Sparkles className="icon" />
          </div>
        </div>

        <h2 className="welcome-title">Welcome to IITI - GPT</h2>
        <p className="welcome-description">
  Welcome! I'm your AI-powered college assistant. Get instant answers about admissions, hostel allotment, academic procedures, campus facilities, and more.
</p>


        <div className="welcome-features">
          <div className="feature">
            <div className="dot blue"></div>
            <span>Instant responses</span>
          </div>
          <div className="feature">
            <div className="dot purple"></div>
            <span>Helpful and friendly</span>
          </div>
          <div className="feature">
            <div className="dot green"></div>
            <span>Always available</span>
          </div>
        </div>

        <button className="start-button" onClick={onStartChat}>
          Start Chatting
        </button>

        <p className="start-hint">
          Click the button above to begin your conversation
        </p>
      </div>
    </div>
  </div>
)};

export default WelcomeScreen;
