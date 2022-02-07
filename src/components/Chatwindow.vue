<template>
  <div class="chatwindow">
      <div class="messages" ref="msg">
          <div class="single" v-for="message in formattedmessages" :key="message.id">
              <span class="created-at">{{message.created_at}} ago</span>
              <span class="name">{{message.name}}</span>
              <span class="message">{{message.message}}</span>
          </div>
      </div>
      
  </div>
</template>

<script>

import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { ref } from '@vue/reactivity';
import { computed, onUpdated } from '@vue/runtime-core';
import {} from 'date-fns'
import { formatDistanceToNowStrict } from 'date-fns/esm';

export default {
    setup(){
        let messages = ref([]);
        let msg = ref('')

        // auto scrolling feature
        onUpdated(()=>{
            msg.value.scrollTop = msg.value.scrollHeight
        })
        let formattedmessages = computed(()=>{
            return messages.value.map(msg=>{
                let formatTime = formatDistanceToNowStrict(msg.created_at.toDate(),{includeSeconds: true})
                return {...msg,created_at:formatTime}
            })
        })
        
        
        let db = getFirestore();
        let colref = collection(db,'messages')
        let q = query(colref, orderBy("created_at"));


        onSnapshot(q,colref,(snap)=>{
            let results = []
            snap.docs.forEach(doc => {
                // if(doc.data().created_at){
                   doc.data().created_at && results.push(doc.data())
                // }
            });
            messages.value = results
        })


        return{messages,formattedmessages,msg}
    }
}
</script>

<style>
.chatwindow{
    background-color: #fafafa;
    padding: 30px 20px;
}
.single{
    margin: 18px 0;
}
.created-at{
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 7px;
}
.name{
    font-weight: bold;
    margin-right: 10px;
}
.messages{
    max-height: 400px;
    overflow: auto;
    overflow-x:hidden;
}

.message{
    background-color: rgb(187, 185, 185);
    padding: 4px 5px;
    border-radius: 6px;
    margin-bottom: 5px;
}

.messages::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.messages::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

.messages::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #0cf8aa;
}

</style>