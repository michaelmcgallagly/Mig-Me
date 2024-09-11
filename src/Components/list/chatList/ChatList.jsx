import "./chatList.css"

export default function ChatList() {
  return (
    <div className="chatList">
        <div className="flex items-center gap-5 p-5">
            <div className="flex-1 bg-[#8c52ff] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 rounded-lg border border-white border-opacity-10 flex items-center gap-5 rounded-lg p-2">
                <i className="fa-solid fa-magnifying-glass"></i>
                 <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white placeholder-white flex-1"/>
            </div>
         <i className="fa-solid fa-plus cursor-pointer"></i>

        </div>


        <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#D5A9A9]">
        <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
        <div className="flex flex-col gap-2">
          <span>Jane Doe</span>
          <p className="font-light text-sm">Hello</p>
        </div>
      </div>

      


    </div>
  )
}