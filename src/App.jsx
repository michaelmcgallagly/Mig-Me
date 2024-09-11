import { useState } from 'react'
import Chat from './Components/chat/Chat'
import List from './Components/list/List'


function App() {

  return (
<div className="w-[90vw] h-[90vh] bg-[#FFFFFF] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex">
<List/>
    <Chat/>
</div>
    
  )
}

export default App
