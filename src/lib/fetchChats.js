import {create} from 'zustand'
import { useUserStore } from './userStore';

//use Zustand for managing chat state
export const doFetchChats = create((set) => ({

    // chatId and user are null to indicate no active chat
    chatId:null,
    user:null,

    //this function changes the users chat
    changeChat:(chatId,user)=>{

        //fetches the currentUser
        const currentUser = useUserStore.getState().currentUser;
        
        //if no chatId is provided set chatId and user to null
        if (!chatId) {
            set({
              chatId: null,
              user: null,
            });

            //if a valid chatId is provided, set the chatId and user to their new values
          } else {
            set({
              chatId,
              user,
            });
          }
    }

   
   
} ))