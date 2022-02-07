import { ref } from "vue"

import auth from '../firebase/config'
import { signInWithEmailAndPassword } from '@firebase/auth'

let error = ref('')

let useLogin = ()=>{

    let signin =async(email,password)=>{
        try{
            let res = await signInWithEmailAndPassword(auth,email,password)
            if(!res){
                throw new Error ("Can't login account")
            }
            return res;
        }
        catch(err){
            error.value = err.message
        }
    }

    return {error,signin}
}

export default useLogin