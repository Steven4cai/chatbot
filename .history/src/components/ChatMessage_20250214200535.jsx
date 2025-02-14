
const ChatMessage = ({chat}) => {
  return (
    <div>
      <div className={`message ${chat.role === "model" ? 'bot' : 'user'}user-message`}>
            <p className="message-text">
              {chat.text}
            </p>
          </div>
    </div>
  )
}

export default ChatMessage
