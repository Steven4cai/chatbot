
const ChatMessage = ({chat}) => {
  return (
    <div>
      <div className={`message ${chat}user-message`}>
            <p className="message-text">
              {chat}
            </p>
          </div>
    </div>
  )
}

export default ChatMessage
