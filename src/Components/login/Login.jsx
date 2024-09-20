import { useState } from "react";
import {toast} from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore"
import "./login.css"

export default function Login() {

    //array of profile pictures for users to choose from when they register
    const presetProfilePictures =[
        "https://firebasestorage.googleapis.com/v0/b/migme-be891.appspot.com/o/pfp1.png?alt=media&token=28d79abe-84d5-4a8e-8135-7083b7f2b14a",
        "https://firebasestorage.googleapis.com/v0/b/migme-be891.appspot.com/o/pfp2.png?alt=media&token=855c98a3-3490-4623-96ec-3035d1a1f28a",
        "https://firebasestorage.googleapis.com/v0/b/migme-be891.appspot.com/o/pfp3.png?alt=media&token=5e2198ab-b68e-4638-8a94-84251213bec8"
    ]

    const [loading,setLoading] = useState(false); //state to manage loading

    const [selectedImage, setSelectedImage] = useState(presetProfilePictures[0]); //state to store the selected profile pictures

    //function to check is username already exists in the database
    const checkUsernameExistsInDb = async (username) => {
        const usersRef = collection(db,"users"); //reference the users collection
        const q = query(usersRef,where("username", "==",username));//query to find if the username already exists
        const querySnapShot = await getDocs(q); //get the snapshot
        return !querySnapShot.empty; //return true if the username exists
    }

    //function to check the username length
    const checkUsernameLength = (username) => {
        const maxLength = 15; //set max length

        if(username.length > maxLength) {
            //if username is exceeds max length then send a notificaiton to the user
            toast.error(`Username must be no more than ${maxLength} characters long.`); 
            return false
        }
        else{
            return true
        }
        
    }

    //handle registration when sign up form is submitted
    const handleRegister = async e =>{
        e.preventDefault(); //prevents the default form submission
        setLoading(true); //sets loading to true whilst registration is ongoing
        const formData = new FormData(e.target); //get form data

        const {username,email,password} = Object.fromEntries(formData); //extract data from form

        //check is username length is valid
        if(!checkUsernameLength(username)){
            setLoading(false);
            return;
        }

        try{
            
           const usernameExists = await checkUsernameExistsInDb(username); //check if username already exists in the db
           if(usernameExists) {
            toast.error("Username already exists"); //send error to user
            setLoading(false);
            return;
           }

           //create user with email and password
           const res = await createUserWithEmailAndPassword(auth,email,password);

           //save user data in firestore
           const imgUrl = selectedImage;
           await setDoc(doc(db,"users", res.user.uid),{
               username,
               email,
               avatar:imgUrl,
               id: res.user.uid
           });
   
           //initialise the userchats for the new user
           await setDoc(doc(db,"userchats", res.user.uid),{
               chats:[]
           });
   
           //send success message
           toast.success("Successfully created user");
           window.location.reload()

        }

        catch(err){
            toast.error(err.message); //display error message to user
        } finally{
            
            //set loading to false
            setLoading(false);
           
        }

    };

    //function to handle login 
    const handleLogin = async (e) => {
        e.preventDefault(); //prevent default form submission
        setLoading(true); //set loading to true

        const formData = new FormData(e.target); //fetch data from form

        const {email,password} = Object.fromEntries(formData); //extract info from form

        try{

            //sign in with email and password
            await signInWithEmailAndPassword(auth,email, password)
            window.location.reload() //reload after successful login


        }catch(err){
            toast.error(err.message); //send error message to user
        }
        finally{
            setLoading(false); //set loading to false
            

        }
    }

  return (
    <>
    <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 overflow-scroll overflow-x-hidden login px-4 py-8 md:px-8">
        <div className="flex-1 flex flex-col items-center gap-5 w-full md:w-auto">
            <img src="/logo1.png" alt="logo" />
            <h2>Sign In</h2>
            <form className="flex flex-col items-center justify-center gap-5 w-full" onSubmit={handleLogin}>
                <input type="text" placeholder="E-Mail" name="email" className="w-full p-5 border-none outline-none bg-white rounded-md text-[#8c52ff] max-w-[300px]"/>
                <input type="password" placeholder="Password" name="password" className="w-full p-5 border-none outline-none bg-white rounded-md text-[#8c52ff] max-w-[300px]"/>
                <button className="w-full p-5 border-none bg-[#8c52ff] color-white rounded-md font-bold max-w-[300px]" disabled={loading}>Sign In</button>
            </form>
        </div>
        
        <div className="h-[1px] md:h-[80%] w-full md:w-[2px] bg-[#D5A9A9] my-5 md:my-0"></div>
        <div className="flex-1 flex flex-col items-center gap-5 w-full md:w-auto">
            <h2>Register Account</h2>
                <form className="flex flex-col items-center justify-center gap-5 w-full" onSubmit={handleRegister}>
                    <div className="flex gap-3 overflow-x-auto">
                    {presetProfilePictures.map((image,index)=>(
                        <div key={index} className={`w-24 h-24 border-2 rounded-full overflow-hidden cursor-pointer ${selectedImage === image ? "border-[#8c52ff]" : "border-white"} hover:border-[#8c52ff]`}
                        onClick={()=> setSelectedImage(image)}
                        >
                            <img src={image} alt="profile picture" className="w-full h-full object-cover"/>
                        </div>
                    ))}
                    </div>
                    <input type="text" placeholder="Username" name="username" className="w-full p-5 border-none outline-none bg-white rounded-md text-[#8c52ff] max-w-[300px]"/>
                    <input type="text" placeholder="E-Mail" name="email" className="w-full p-5 border-none outline-none bg-white rounded-md text-[#8c52ff] max-w-[300px]"/>
                    <input type="password" placeholder="Password" name="password" className="w-full p-5 border-none outline-none bg-white rounded-md text-[#8c52ff] max-w-[300px]"/>
                    <button className="w-full p-5 border-none bg-[#8c52ff] color-white rounded-md font-bold max-w-[300px]" disabled={loading}>Sign Up</button>
                </form>
        </div>
    </div>
    </>
  )
}