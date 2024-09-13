import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore"
import "./chatList.css"
import { db } from "../../../lib/firebase";

export default function ChatList() {

  const [chats,setChats] = useState([]);

  const currentUser = useUserStore();

  useEffect(() =>{
    const unSub = onSnapshot(doc(db,"userchats", currentUser.id), async (res) =>{
      const items = res.data().chats;

      const promises = items.map(async(item)=>{
        const userDocRef = doc(db,"users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
      })


    });

    return () =>{
      unSub();
    }
  },[currentUser.id])

  return (
    <div className="chatList">
        <div className="flex items-center gap-5 p-5">
            <div className="flex-1 bg-[#8c52ff] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex items-center gap-5 rounded-lg p-2">
                <i className="fa-solid fa-magnifying-glass"></i>
                 <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white placeholder-white flex-1"/>
            </div>
         <i className="fa-solid fa-plus cursor-pointer"></i>

        </div>

        {chats.map((chat)=>(
          <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]" key={chat.chatId}>
          <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
          <div className="flex flex-col gap-2">
            <span>Jane Doe</span>
            <p className="font-light text-sm">{chat.lastMessage}</p>
          </div>
        </div>
        ))}
        

      


    </div>
  )
}