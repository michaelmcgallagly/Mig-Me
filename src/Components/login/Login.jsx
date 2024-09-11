import { useState } from "react";
import {toast} from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {doc, setDoc} from "firebase/firestore"

export default function Login() {

    const presetProfilePictures =[
        "/pfp1.png",
        "/pfp2.png",
        "/pfp3.png"
    ]

    const [selectedImage, setSelectedImage] = useState(presetProfilePictures[0]);

    const handleRegister = async e =>{
        e.preventDefault();
        const formData = new FormData(e.target);

        const {username,email,password} = Object.fromEntries(formData);

        try{
            const res = await createUserWithEmailAndPassword(auth,email,password);

            await setDoc(doc(db,"users", res.user.uid),{
                username,
                email,
                id: res.user.uid
            });

            await setDoc(doc(db,"userchats", res.user.uid),{
                chats:[]
            });

            toast.success("Successfully created user");


        }
        catch(err){
            console.log(err);
            toast.error(err.message);
        }

    }

  return (
    <>
    <div className="w-full h-full flex items-center gap-8">
        <div className="flex-1 flex flex-col items-center gap-5">
            <h2>Sign In</h2>
            <form className="flex flex-col items-center justify-center gap-5">
                <input type="text" placeholder="E-Mail" name="email" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                <input type="password" placeholder="Password" name="password" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                <button className="w-[100%] p-5 border-none bg-[#8c52ff] color-white rounded-md font-bold">Sign In</button>
            </form>
        </div>
        <div className="h-[80%] w-[2px] bg-[#D5A9A9]"></div>
        <div className="flex-1 flex flex-col items-center gap-5">
            <h2>Register Account</h2>
                <form className="flex flex-col items-center justify-center gap-5" onSubmit={handleRegister}>
                    <div className="flex gap-4">
                    {presetProfilePictures.map((image,index)=>(
                        <div key={index} className={`w-24 h-24 border-2 rounded-full overflow-hidden cursor-pointer ${selectedImage === image ? "border-[#8c52ff]" : "border-white"} hover:border-[#8c52ff]`}
                        onClick={()=> setSelectedImage(image)}
                        >
                            <img src={image} alt="profile picture" className="w-full h-full object-cover"/>
                        </div>
                    ))}
                    </div>
                    <input type="text" placeholder="Username" name="username" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <input type="text" placeholder="E-Mail" name="email" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <input type="password" placeholder="Password" name="password" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <button className="w-[70%] p-5 border-none bg-[#8c52ff] color-white rounded-md font-bold">Sign Up</button>
                </form>
        </div>
    </div>
    </>
  )
}