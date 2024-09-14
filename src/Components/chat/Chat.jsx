import { useEffect, useState } from "react"
import "./chat.css"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { doFetchChats } from "../../lib/fetchChats";



export default function Chat() {
    const [chat,setChat] = useState();

    const {chatId} = doFetchChats();

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",chatId), (res)=>{
            setChat(res.data())
        }
    );

    return()=>{
        unSub();
    }
},[chatId]);


  return (
    <div className="flex-grow flex flex-col h-full border-l border-r border-[#D5A9A9]">
        <div className="p-5 flex items-center justify-between border-b border-[#D5A9A9]" >
            <div className="flex items-center gap-5">
                <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
                <div className="flex flex-col gap-2">
                    <span>Jane Doe</span>                    
                </div>
            </div>
        </div>

        <div className="p-5 flex-1 flex overflow-scroll flex-col gap-5 overflow-x-hidden chat">
            

            <div className="message own">
                <div className="flex-1 flex flex-col gap-2">
                    <p className="p-5 bg-[#8c52ff] rounded-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis et quam nostrum libero qui quas hic accusamus aperiam earum praesentium harum, necessitatibus asperiores expedita illo culpa voluptas repudiandae laudantium ex.
                     </p>
                    <span>1 mins ago</span>
                </div>
            </div>

        </div>
        <div className="p-5 flex items-center justify-between border-t border-[#D5A9A9] gap-5 mt-auto">
            <input type="text" placeholder="Type a message..."    className="flex-1 bg-white border-none outline-none text-[#8c52ff] p-5 rounded-lg text-base"/>
            <button className="py-2.5 px-5 border-none rounded cursor-pointer"><i className="fa-regular fa-paper-plane"></i></button>

        </div>
    
    </div>
    
  )
}