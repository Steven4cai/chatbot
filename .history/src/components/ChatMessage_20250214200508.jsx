
const ChatMessage = ({chat}) => {
  return (
    <div>
      <div className={`message ${chat.role === "mode" ? 'bot' : 'user'}user-message`}>
            <p className="message-text">
              {chat}
            </p>
          </div>
    </div>
  )
}

export default ChatMessage
