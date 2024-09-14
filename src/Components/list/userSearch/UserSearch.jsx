import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";

export default function UserSearch() {

    const [user, setUser] = useState(null)

    const {currentUser} = useUserStore()

    const completeSearch = async e =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try{
            const refUser = collection(db,"users");

            const q = query(refUser, where("username","==", username));

            const querySnapShot = await getDocs(q);

            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            } 

        }catch(err){

        }
    }

    const addUsersFromSearch = async ()=>{
        const chatRef = collection(db,"chats");
        const userChatsRef = collection(db,"userchats");

        try{
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatsRef,user.id),{
                chats:arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage:"",
                    recieverId: currentUser.id,
                    updatedAt: Date.now()
                }),
            })

        }catch(err){
            console.log(err)
        }

    }
  return (
    <div className="w-[max-content] h-[max-content] p-6 bg-[#8c52ff] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto bg-opacity-50 backdrop-blur-sm z-50">
        <form className="flex gap-5" onSubmit={completeSearch}>
            <input className="p-5 rounded-lg border-none outline-none bg-[#8c52ff] placeholder-white" type="text" placeholder="Enter Username" name="username"/>
            <button className="p-5 rounded-lg bg-transparent border-none cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        {user && <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <img className="w-12 h-12 rounded-full object-cover" src={user.avatar || "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"} alt="User profile picture" />
                <p>{user.username}</p>
            </div>
            <button className="p-2 rounded-lg bg-transparent border-none cursor-pointer" onClick={addUsersFromSearch}><i className="fa-solid fa-square-plus"></i></button>
        </div>}
    </div>
  )
}