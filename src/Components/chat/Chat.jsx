import { useEffect, useState } from "react"
import "./chat.css"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { doFetchChats } from "../../lib/fetchChats";
import { useUserStore } from "../../lib/userStore";



export default function Chat() {
    const [chat,setChat] = useState();
    const [text,setText] = useState("");

    const {chatId, user} = doFetchChats();
    const {currentUser} = useUserStore();

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",chatId), (res)=>{
            setChat(res.data())
        }
    );

    return()=>{
        unSub();
    }
},[chatId]);

const sendMessage = async ()=>{
    console.log("hi");

    
    if(!text === "")return;

    console.log("hi");


    try{
        await updateDoc(doc(db,"chats",chatId),{
            messages:arrayUnion({
                senderId: currentUser.id,
                text,
                createdAt: new Date()
            }),
        });

        const userIDs = [currentUser.id,user.id];

        userIDs.forEach(async(id)=>{
            const userChatsRef = doc(db,"userchats",id);
            const userChatsSnapshot = await getDoc(userChatsRef);

             if(userChatsSnapshot.exists()){
                 const userChatsData = userChatsSnapshot.data();

                 const chatIndex = userChatsData.chats.findIndex(
                        (c) => c.chatId === chatId
                );

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef,{
                chats: userChatsData.chats,
            })

        }
     })

        
    }
    catch(err){
        console.log(err);
    }

   
}


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
            
            {chat?.messages?.map((message)=>(
                <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
                <div className="flex-1 flex flex-col gap-2">
                    <p className={message.senderId === currentUser?.id ?"p-5 bg-[#8c52ff] rounded-lg message-text": "p-5 bg-[#ff5757] rounded-lg message-text"}>
                    {message.text}
                     </p>
                    
                </div>
            </div>
            ))}
            

        </div>
        <div className="p-5 flex items-center justify-between border-t border-[#D5A9A9] gap-5 mt-auto">
            <input onChange={e=> setText(e.target.value)} type="text" placeholder="Type a message..."    className="flex-1 bg-white border-none outline-none text-[#8c52ff] p-5 rounded-lg text-base"/>
            <button className="py-2.5 px-5 border-none rounded cursor-pointer" onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>

        </div>
    
    </div>
    
  )
}