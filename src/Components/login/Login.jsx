import { useState } from "react";

export default function Login() {

    const presetProfilePictures =[
        "/pfp1.png",
        "/pfp2.png",
        "/pfp3.png"
    ]

    const [selectedImage, setSelectedImage] = useState(presetProfilePictures[0]);

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
        <img src="/logo.png" className="w-28 h-28 object-contain"/>
        <div className="flex-1 flex flex-col items-center gap-5">
            <h2>Register Account</h2>
                <form className="flex flex-col items-center justify-center gap-5">
                    <div className="flex gap-4">
                    {presetProfilePictures.map((image,index)=>(
                        <div key={index} className={`w-24 h-24 border rounded-full overflow-hidden cursor-pointer hover:border-blue-400`}
                        onClick={()=> setSelectedImage(image)}
                        >
                            <img src={image} alt="profile picture" className="w-full h-full object-cover"/>
                        </div>
                    ))}
                    </div>
                    <input type="text" placeholder="Username" name="username" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <input type="text" placeholder="E-Mail" name="email" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <input type="password" placeholder="Password" name="password" className="p-5 border-none outline-none bg-white rounded-md text-[#8c52ff]"/>
                    <button className="w-[100%] p-5 border-none bg-[#8c52ff] color-white rounded-md font-bold">Sign Up</button>
                </form>
        </div>
    </div>
    </>
  )
}