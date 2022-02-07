<template>
  <h2>Login</h2>
  <form @submit.prevent="login">
      <input type="email" placeholder="Email" autocomplete="off" v-model="email">
      <input type="password" placeholder="password" autocomplete="off" v-model="password">
      <div class="error" v-if="error">
          <p v-if="error === 'Firebase: Error (auth/wrong-password).'">Invaild password (Try Again)</p>
          <p v-if="error === 'Firebase: Error (auth/user-not-found).'">Invaild Email  Address (Try again)</p>
      </div>
      <button>Login</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composable/useLogin'
export default {
    setup(props,context){
        let email = ref('')
        let password = ref ('')
        let {error,signin} = useLogin()

        let login =async ()=>{
            let res =await signin(email.value,password.value)
            if(res){
                context.emit('enterChatroom')
            }
        }


        return{email,password,error,login}
    }
}
</script>

<style>

</style>