import { useState } from 'react'
import Chat from './Components/chat/Chat'
import List from './Components/list/List'
import Login from './Components/login/Login'
import Notification from './Components/notification/Notification'


function App() {

  const currentUser = false;

  return (
<div className=" bg-[#FFFFFF] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex"
 style={{
    width: 'clamp(300px, 90vw, 1200px)',
    height: 'clamp(400px, 90vh, 800px)',
 }}>
  {currentUser ? (
    <>
      <List/>
      <Chat/>
    </> 
    ):(
      <Login/>
    )}
  <Notification/>

</div>
    
  )
}

export default App
