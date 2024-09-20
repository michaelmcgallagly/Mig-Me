import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//Component used to send notifications to users 
export default function Notification() {
  return (
    <div>
        <ToastContainer position="bottom-right"/>
    </div>
  )
}