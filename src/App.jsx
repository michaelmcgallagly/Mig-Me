import {useEffect } from 'react'
import Chat from './Components/chat/Chat'
import List from './Components/list/List'
import Login from './Components/login/Login'
import Notification from './Components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './lib/userStore'
import { auth } from './lib/firebase'
import { doFetchChats } from './lib/fetchChats'
import Placeholder from './Components/placeholder/Placeholder'


function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = doFetchChats();


  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);
    });

    return ()=>{
      unSub();
    }
  },[fetchUserInfo]);

  console.log(currentUser);

  if(isLoading) return <div className='p-7 bg-[#FFFFFF] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg text-lg'>Loading...</div>

  return (
<div className=" bg-[#FFFFFF] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex"
 style={{
    width: 'clamp(300px, 90vw, 1200px)',
    height: 'clamp(400px, 90vh, 900px)',
 }}>
  {currentUser ? (
<<<<<<< Updated upstream
    <div className='flex flex-col md:flex-row h-full w-full'>
      <List/>
      {chatId && <Chat/>}
      {!chatId && <Placeholder/>}
    </div>
=======
    <div className='flex flex-col md:flex-row'>
      <List/>
      {chatId && <Chat/>}
      {!chatId && <Placeholder/>}
    </div> 
>>>>>>> Stashed changes
    ):(
      <Login/>
    )}
  <Notification/>

</div>
    
  )
}

export default App
