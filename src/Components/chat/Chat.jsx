export default function Chat() {
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

        <div className="center">

        </div>
        <div className="p-5 flex items-center justify-between border-t border-[#D5A9A9] gap-5 mt-auto">
            <input type="text" placeholder="Type a message..."    className="flex-1 bg-white border-none outline-none text-[#8c52ff] p-5 rounded-lg text-base"/>
            <button className="py-2.5 px-5 border-none rounded cursor-pointer"><i className="fa-regular fa-paper-plane"></i></button>

        </div>
    
    </div>
    
  )
}