<template>
  <div v-if="user">
      <nav>
          <div>
              <p>Hi {{user.displayName}}</p>
              <p class="email">logged in as {{user.email}}</p>
          </div>
          <button @click="Logout">Logout</button>
      </nav>
  </div>
</template>

<script>
import auth from '../firebase/config'
import { ref } from '@vue/reactivity'

import getUser from '../composable/getUser'
import { signOut } from '@firebase/auth'

export default {
    setup(){
        let error = ref('')
        let {user} = getUser()

        let Logout =async ()=>{
            try{
                await signOut(auth)
                console.log("user logout")

            }
            catch(err){
                error.value = err.message;
                console.log(err.message)
            }
        }

    

        return{Logout,user}
    }
}
</script>

<style>
nav{
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
nav p{
    margin: 2px auto ;
    font-size: 16px;
    color: #444;
}
nav p.email {
    font-size: 14px;
    color: #999;
}
</style>