import { useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'

const App = () => {
  const [chatHistory, setChatHistory] = useState([])
  const generateBotResponse = async (history) => {
    history = history.map(({role,text}) =>({role,parts:[{text}]}))
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:history})
    }
    try {
      const response = await fetch(import.meta.env.VITE_API_URL,requestOptions)
    } catch (error) {
      
    }
  }
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

          {chatHistory.map((chat,index) => (
            <ChatMessage chat={chat} key={index}/>
          ))}

          
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
      
    </div>
  )
}

export default App
