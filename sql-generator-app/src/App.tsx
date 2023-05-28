// import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

import { useState } from 'react'

import CodeDisplay from "./components/CodeDisplay"
import MessagesDisplay from "./components/MessagesDisplay"

interface chatData {
  role: string,
  content: string,
}


const App = () =>{

  const [value, setValue] = useState<string>("")
  const [chat, setChat] = useState<chatData[]>([])    //useState will only take array which is of chatData[] type

  const getQuery = async ()=>{
    try {

      const options : RequestInit= {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      }

      const response = await fetch("http://localhost:8000/sql", options)         //options are passed through API via POST request
      //await -> gonna wait for the response     
      const data : chatData = await response.json()
      console.log(data)


      const userMessage = {
        role:"user",
        content: value
      }

      setChat(oldChat => [...oldChat, data, userMessage])
    }

    catch (error) {
      // console.error(error)
    }
  }

  console.log(chat)

  const clearChat = () => {
    setValue("")
    setChat([])
  }

  const filteredUserMessages = chat.filter(message => message.role === "user")
  const latestCode = chat.filter(message => message.role === "assistant").pop()
  
  return (
    <div className="app">

      <MessagesDisplay userMessages = {filteredUserMessages}/>
      <input value={value} onChange={e => setValue(e.target.value)}/>
      <CodeDisplay text={latestCode?.content || ""}/>

      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query!</button>
        <button id="clear-chat" onClick ={clearChat}>Clear Chat</button>
      </div>
      
    </div>
  )
}

export default App
