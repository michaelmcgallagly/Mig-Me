import { doc, getDoc } from 'firebase/firestore';
import {create} from 'zustand'
import { db } from './firebase';

//Using Zustand to manage user state 
export const useUserStore = create((set) => ({
    currentUser:null, // stores the current user
    isLoading:true, //checks to see if data is loading

    //function to fetch user info from firestore using the users UID
    fetchUserInfo: async (uid) =>{
        if(!uid) return set({currentUser:null, isLoading:false}); //if no UID exists, set currentUser to null and loading to false

        try{

            const docRef = doc(db,"users",uid); //reference for the users collection and the document with the provided UID
            const docSnap = await getDoc(docRef); //fetch the doc from firestore

            if (docSnap.exists()){ //if this doc exists
                set({currentUser:docSnap.data(), isLoading:false}) //set the current user to the fetched data and set loading to false
            } else{
                set({currentUser:null, isLoading:false}); //if doc doesnt exist, set currentUser to null and loading to false
            }

        }catch(err){
            return set({currentUser:null, isLoading:false}); //error occurs, set currentUser to null and loading to false
        }
    },
}))