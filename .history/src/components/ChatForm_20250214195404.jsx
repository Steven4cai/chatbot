import React from 'react'

const ChatForm = () => {
    const handleFormSubmit = () => {
        
    }
  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input type="text" placeholder='Message...' className='message-input' required/>
            <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  )
}

export default ChatForm
