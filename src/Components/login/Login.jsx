export default function Login() {
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
                    <label htmlFor="file" className="w-[100%] flex items-center justify-between cursor-pointer">
                        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-lg object-cover opacity-60"/> 
                        Upload an Image
                    </label>
                    <input type="file" id="file" style={{display: "none"}}/>
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