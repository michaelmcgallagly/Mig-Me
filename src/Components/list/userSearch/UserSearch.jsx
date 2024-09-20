import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useState,useEffect } from "react";
import { useUserStore } from "../../../lib/userStore";


export default function UserSearch() {

    const [user, setUser] = useState(null) //stores the searched user info
    const [isAddingSelf, setIsAddingSelf] = useState(false) //boolean to check if user is adding themself
 
    const {currentUser} = useUserStore() //Zustand store to get the current logged-in user

    
    //check if user is adding themself
    useEffect(() =>{
        if(currentUser && user){
            setIsAddingSelf(currentUser.id === user.id)
        }
    },[currentUser,user])

    //function to handle the user search form submission
    const completeSearch = async e =>{
        e.preventDefault(); //prevent default form submission
        const formData = new FormData(e.target); //fetch data from form
        const username = formData.get("username"); //get the username from the form data

        try{
            //reference the users collection in firestore
            const refUser = collection(db,"users");

            //query the firestore for a user who matches the same username which was entered
            const q = query(refUser, where("username","==", username));

            //complete the query
            const querySnapShot = await getDocs(q);

            //if a user is found, update the user state with their data
            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            } 

        }catch(err){
            console.log(err) //handle errors
        }
    }

    //function to add the searched user to the current users chat list
    const addUsersFromSearch = async ()=>{
       
        //prevent user from adding themself
        if(isAddingSelf) return;

        const chatRef = collection(db,"chats"); //reference chats collection
        const userChatsRef = collection(db,"userchats"); //reference userchats collection

        try{
            //create a new chat in the chats collection
            const newChatRef = doc(chatRef)

            //set the initial data for the new chat session
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(), // set timestamp of chat creation
                messages: [], //initailise messages in the cat
            });

            //update the searched users chat list with the new chat
            await updateDoc(doc(userChatsRef,user.id),{
                chats:arrayUnion({
                    chatId: newChatRef.id, //id of new chat
                    lastMessage:"", //no initial message
                    receiverId: currentUser.id, //current user is the receiver
                    updatedAt: Date.now() //set timestamp of the update
                }),
            })

            //updated the current users chat list with the new chat
            await updateDoc(doc(userChatsRef,currentUser.id),{
                chats:arrayUnion({
                    chatId: newChatRef.id, //id of new chat
                    lastMessage:"", //no initial message
                    receiverId: user.id, //the searched user is the receiver
                    updatedAt: Date.now() //set timestamp of the update
                }),
            })


        }catch(err){
            console.log(err) //error handling
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
            <button className="p-2 rounded-lg bg-transparent border-none cursor-pointer" onClick={addUsersFromSearch} disabled={ isAddingSelf}><i className="fa-solid fa-square-plus"></i></button>
        </div>}
    </div>
  )
}