export default function Placeholder() {
    return (
        <div className="flex-grow flex flex-col h-full border-l border-r border-[#D5A9A9]">
            <div className="p-5 flex items-center justify-between border-b border-[#D5A9A9]" >
                <div className="flex items-center gap-5">
                    <img src="/logo1.png" alt="logo" className="w-18 h-12 "/>
                    <div className="flex flex-col gap-2">
                        <span className="pt-2">Welcome!</span>                    
                    </div>
                </div>
            </div>
    
            <div className="p-5 flex-1 flex overflow-scroll flex-col gap-5 overflow-x-hidden chat">
                
               <p>Welcome to MigMe! Add your friends by their usernames and get chatting with them! Here's all the fun things you can get up to through using our site:<br/><br/>
               • Add your friends by clicking the + icon and entering in their username!<br/><br/>
               • Then click on their chat on the left hand side to start chatting with them!<br/><br/>
               • Use the input at the bottom of the screen to type your message then click the paper plane icon to send your message!<br/><br/>
               • Lastly, HAVE FUN! :)
               </p>
                
    
            </div>
           
        
        </div>
        
      )
}