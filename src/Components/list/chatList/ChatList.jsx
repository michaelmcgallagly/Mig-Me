import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore"
import "./chatList.css"
import { db } from "../../../lib/firebase";
import {useState,useEffect} from "react"
import UserSearch from ".././userSearch/UserSearch.jsx";
import { doFetchChats } from "../../../lib/fetchChats.js";


export default function ChatList() {

  const [chats,setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const {currentUser} = useUserStore();
  const {chatId, changeChat} = doFetchChats();

  useEffect(() =>{
    const unSub = onSnapshot(doc(db,"userchats", currentUser.id), async (res) =>{
      const items = res.data().chats;

      const promises = items.map(async(item)=>{
        const userDocRef = doc(db,"users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return {...item, user};
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a,b)=> b.updatedAt -a.updatedAt));//allows the sort of chats to display most recent first
    });

    return () =>{
      unSub();
    }
  },[currentUser.id]);

  const handleSelect = async (chat) =>{
    const userChats = chats.map((item)=>{
      const{user,...rest} = item
      return rest
    })

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    )

    userChats[chatIndex].isSeen = true
    
    const userChatsRef = doc(db,"userchats",currentUser.id)

    try{
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user)

    }catch(err){
      console.log(err)
    }


  }

  const filteredChats = chats.filter(ch => ch.user.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="chatList">
        <div className="flex items-center gap-5 p-5">
            <div className="flex-1 bg-[#8c52ff] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex items-center gap-5 rounded-lg p-2">
                <i className="fa-solid fa-magnifying-glass"></i>
                 <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white placeholder-white flex-1" onChange={(e)=>setInput(e.target.value)}/>
            </div>
         <i className={addMode ? "fa-solid fa-minus cursor-pointer" : "fa-solid fa-plus cursor-pointer"} onClick={()=> setAddMode((prev)=> !prev)}></i>

        </div>

        {filteredChats.map((chat)=>(
          <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]" key={chat.chatId} onClick={()=> handleSelect(chat)} style={{backgroundColor: chat?.isSeen ? "transparent" : "#ff5757"}}>
          <img src={chat.user.avatar ||"https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"} alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
          <div className="flex flex-col gap-2">
            <span>{chat.user.username}</span>
            <p className="font-light text-sm">{chat.lastMessage.length > 20 ? `${chat.lastMessage.slice(0, 20)}...` : chat.lastMessage}</p>
          </div>
        </div>
        ))}
        

      

        {addMode &&  <UserSearch/>}
    </div>
  )
}