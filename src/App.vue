<template>
  <main>
   
    <template v-if="!autencidado">
      <router-view></router-view> 
      <Rodape />
     
    </template>
    <template v-else>
      <TelaCadastro @login-success="logado( )" />
    </template>
  </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import Rodape from './components/Rodape.vue';
import TelaCadastro from './components/TelaCadastro.vue'


export default defineComponent({
  components:{  
   
    TelaCadastro,
    Rodape

  },

  data(){
    return{
      autencidado: false,
    }
  },
  methods:{
    logado(){
      this.autencidado = false;
    }
  }
    
});
</script>

<style>
@import 'assets/blue-saga.css';
@import 'primeicons/primeicons.css';
*{
  padding: 0;
  margin: 0;
}
body{
  font-family:'Krona-one,sans-serif';
}
</style>
