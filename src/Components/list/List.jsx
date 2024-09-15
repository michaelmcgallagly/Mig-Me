import UserInfo from "./userinfo/UserInfo.jsx"
import ChatList from "./chatList/ChatList.jsx"


export default function List() {
  return (
    <div className="flex-1 flex flex-col border-b border-white md:border-none">
        <UserInfo/>
        <ChatList/>
    </div>
  )
}