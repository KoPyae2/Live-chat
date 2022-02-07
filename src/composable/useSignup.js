import { ref } from "vue"
import {
    createUserWithEmailAndPassword, getAuth, updateProfile
} from 'firebase/auth'
import auth from '../firebase/config'


let error = ref('')

let createAccount =async (email,password,displayname)=>{
    try{
        let res = await createUserWithEmailAndPassword(auth ,email ,password)
        if(!res){
            throw new Error('could not create account')  
        }
        updateProfile(auth.currentUser,{
            displayName:displayname
        })

        return res;
    }
    catch(err){
        error.value = err.message;
    }
}


let useSignup = ()=>{
    return {error,createAccount}
}

export default useSignup