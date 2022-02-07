import { ref } from "vue"
import { addDoc, collection, getFirestore } from "firebase/firestore";




let useCollection = (Coll)=>{

    let db = getFirestore()

    let error = ref('');
    let AddDoc =async (data)=>{
        try{
            let colref = collection(db,Coll)

            addDoc(colref,data)
        }
        catch(err){
            console.log(err.message)
            error.value = "could not send the message"
        }

    }

    return {error,AddDoc}
}

export default useCollection;