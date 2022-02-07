<template>
  <form>
      <textarea placeholder="Text message and hit enter to send" @keypress.enter="handlesubmit" v-model="message"></textarea>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composable/getUser'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import useCollection from '../composable/useCollection'

export default {
    setup(){
        let message = ref('')
        let {user} = getUser()
        let {error,AddDoc} = useCollection('messages');

        let handlesubmit=async ()=>{
            let chat ={
                message:message.value,
                name: user.value.displayName,
                created_at:serverTimestamp()
            }

            if(chat.message !== "" && chat.message !== " "){
                await AddDoc(chat);
                message.value=''
            }
        }



        return{message,handlesubmit}
    }
}
</script>

<style>
form{
    margin: 10px;
}

textarea{
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding:10px;
    box-sizing: border-box;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.7),
                inset 0 0 10px rgba(0,0,0,0.4);
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
    resize: none;
}

</style>