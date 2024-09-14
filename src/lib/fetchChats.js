import {create} from 'zustand'
import { useUserStore } from './userStore';

export const doFetchChats = create((set) => ({
    chatId:null,
    user:null,
    changeChat:(chatId,user)=>{
        const currentUser = useUserStore.getState().currentUser;

        if (!chatId) {
            set({
              chatId: null,
              user: null,
            });
          } else {
            set({
              chatId,
              user,
            });
          }
    }

   
   
} ))