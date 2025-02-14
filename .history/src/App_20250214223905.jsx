import { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'

const App = () => {
  const [chatHistory, setChatHistory] = useState([])
  const [showChatbot, setShowChatbot] = useState(false)

  const chatBodyRef = useRef()
  {/*硅ji流动 */}
  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };
  
    const messages = history.map(({ role, text }) => ({
      role: role === "model" ? "assistant" : role,
      content: text,
    }));
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SILICONFLOW_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V2.5",  
        messages: messages,
        stream: false,  
      }),
    };
  
    try {
      const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", requestOptions);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");
  
      console.log(data);
  
      const apiResponseText = data.choices[0].message.content.trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log("SiliconFlow API Error:", error);
    }
  };
  
  {/*gemini */}
  // const generateBotResponse = async (history) => {
  //   const updateHistory = (text) => {
  //     setChatHistory(prev => [...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text}])
  //   }

  //   history = history.map(({role,text}) =>({role,parts:[{text}]}))
  //   const requestOptions = {
  //     method: "POST",
  //     headers:{"Content-Type":"application/json"},
  //     body:JSON.stringify({contents:history})
  //   }
  //   try {
  //     const response = await fetch(import.meta.env.VITE_API_URL,requestOptions)
  //     const data = await response.json()
  //     if(!response.ok) throw new Error(data.error.message || "Something went wrong!")
  //       console.log(data)
  //     const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*\((.*?)\)\*\*/g, "$1").trim();
  //     updateHistory(apiResponseText)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight,behavior:"smooth"})
  },[chatHistory])
  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
      <button onClick={()=>setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className='chatbot-popup'>
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>
        <div ref={chatBodyRef}  className="chat-body">
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
