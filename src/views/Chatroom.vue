<template>
  <div class="container">
      <Navbar></Navbar>
      <Chatwindow></Chatwindow>
      <NewChatForm></NewChatForm>
  </div>

  
</template>

<script>
import Chatwindow from '../components/Chatwindow'
import NewChatForm from '../components/NewChatForm'
import { watch } from '@vue/runtime-core'
import Navbar from '../components/Navbar'
import getUser from '../composable/getUser'
import { useRouter } from 'vue-router'

export default {
  components: {
    Chatwindow,
    NewChatForm, Navbar },
  setup(){
    let {user} = getUser()
    let router = useRouter()
    watch(user,()=>{
      if(!user.value){
        // redirect welcome
        router.push({name:'Welcome'})
      }
    })
  }

}
</script>

<style>

</style>