export default function UserSearch() {
  return (
    <div className="w-[max-content] h-[max-content] p-6 bg-[#8c52ff] rounded-lg absolute top-0 bottom-0 left-0 right-0 m-auto bg-opacity-50 backdrop-blur-sm z-50">
        <form className="flex gap-5">
            <input className="p-5 rounded-lg border-none outline-none bg-[#8c52ff] placeholder-white" type="text" placeholder="Enter Username" name="username"/>
            <button className="p-5 rounded-lg bg-transparent border-none cursor-pointer"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <img className="w-12 h-12 rounded-full object-cover" src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" alt="User profile picture" />
                <p>Jane Doe</p>
            </div>
            <button className="p-2 rounded-lg bg-transparent border-none cursor-pointer"><i class="fa-solid fa-square-plus"></i></button>
        </div>
    </div>
  )
}