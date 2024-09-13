import { auth } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

export default function UserInfo() {

  const {currentUser} = useUserStore();
  return (
    <div className="p-5 flex items-center justify-between border-b border-[#D5A9A9]">
        <div className="flex items-center gap-5">
            <img src={currentUser.avatar || "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"} alt="user profile picture" className="w-12 h-12 rounded-full object-cover"/>
            <h2>{currentUser.username}</h2>

        </div>
        <button className="px-5 py-2.5 bg-[#C62828] bg-opacity-55 text-white border-none rounded-md cursor-pointer transition-colors duration-300 hover:bg-red-700" onClick={()=>auth.signOut()}>LogOut</button>

    </div>
  )
}