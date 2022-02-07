<template>
  <h2>SIgn Up</h2>
  <form @submit.prevent="signup">
      <input type="text" placeholder="Display Name" autocomplete="off" v-model="displayname"> 
      <input type="email" placeholder="Email" autocomplete="off" v-model="email">
      <input type="password" placeholder="password" autocomplete="off" v-model="password">
      <div v-if="error" class="error">
          <p v-if="error === 'Firebase: Password should be at least 6 characters (auth/weak-password).'">Password need contain at least 8 character</p>
          <p v-if="error === 'Firebase: Error (auth/email-already-in-use).'">This Email is allready have account</p>
         
      </div>
      <button>Sign Up</button>
      
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'


import useSignup from '../composable/useSignup'

export default {
    setup(props,context){
        let displayname = ref('')
        let email = ref('')
        let password = ref ('')
        let {error,createAccount} = useSignup()

        let signup =async()=>{
            let res = await createAccount(email.value,password.value,displayname.value)
            if(res){
                context.emit('enterChatroom')
            }
        }


        return{displayname,email,password,error,signup}
    }
}
</script>

<style>

</style>