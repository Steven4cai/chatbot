import ChatbotIcon from './components/ChatbotIcon'

const App = () => {
  return (
    <div className='container'>
      <div className='chatbot-popup'>
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there! <br /> How can I help you today?
            </p>
          </div>
          <div className="message user-message">
            <p className="message-text">
              Lorem ipsum dolor sit amet, consectetur adipui labore magni iure optio. Voluptates excepturi!
            </p>
          </div>
        </div>
        <div className="chat-footer">
          
        </div>
      </div>
      
    </div>
  )
}

export default App
