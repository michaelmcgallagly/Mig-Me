import { useState } from 'react'
import Chat from './Components/chat/Chat'
import List from './Components/list/List'
import Login from './Components/login/Login'


function App() {

  const currentUser = false;

  return (
<div className="w-[90vw] h-[90vh] bg-[#FFFFFF] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex">
  {currentUser ? (
    <>
      <List/>
      <Chat/>
    </> 
    ):(
      <Login/>
    )}

</div>
    
  )
}

export default App
