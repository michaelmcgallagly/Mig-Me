import UserInfo from "./userinfo/Userinfo.jsx"
import ChatList from "./chatList/ChatList.jsx"


export default function List() {
  return (
    <div className="flex-1 flex flex-col border-b border-white">
        <UserInfo/>
        <ChatList/>
    </div>
  )
}