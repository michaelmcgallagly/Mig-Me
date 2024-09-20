import UserInfo from "./userInfo/UserInfo.jsx"
import ChatList from "./chatList/ChatList.jsx"

//Compoent to store other components to display the list of chats and user infomation
export default function List() {
  return (
    <div className="flex-1 flex flex-col border-b border-white md:border-none">
        <UserInfo/>
        <ChatList/>
    </div>
  )
}