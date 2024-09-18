<template>
    <BarraMenu />
    <div class="componente">
        
    <div class="tela-cadastro">               
         <h2 class="titulo-update-login">
                Atualize seu login ou senha!
         </h2>
         <div class="cadastro-componente-login">
                <div class="componente-cadastro-1">
                         <InputText v-model="user.login" type="text" placeholder="Login / Novo login" class="input-cadastros"/>
                </div>
                <div class="componente-cadastro-2">
                         <InputText v-model="user.senha" type="text" class="input-cadastros" placeholder="Senha / Nova senha"/>
                 </div>
                 <div class="botoes">
                        <Button label="Salvar" :disabled="!camposPreenchidos()" text @click="realizarAtualizacao()"
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 enviar" ></Button>
                        <Button label="Cancelar"  text @click="cancelar()"
                        class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 cancelar"></Button>
                      
                 </div>
         </div>
     </div>
    </div>
    </template>
    <script lang="ts">
    import { realizarLogout, verificarUsuarioLogado } from '@/http';
    import { defineComponent } from 'vue';
import BarraMenu from './BarraMenu.vue';
    export default defineComponent({
    data(){
    return{
        user:{
            login: '',
            senha:'',
            id: 0
        },
      }
    },
    methods:{
        async realizarAtualizacao(){
            await verificarUsuarioLogado(this.user)
            await realizarLogout()
            alert('Suas credencias foram atualizadas com sucesso!')
            this.$router.push('/login')
    
    },

 camposPreenchidos(){
     return this.user.login && this.user.senha
 },
 cancelar(){
    this.$router.push('/')
 }
    }
    })
    </script>
    <style scoped>
    .cadastro {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40rem;
        background-color: white;
}
.titulo-componente{
        color: white;
        font-size: 26px;
        box-sizing: border-box;
        text-align: center;
        padding: 0px 4px;

    }
  
.conteudo-apresentacao{
        display: flex;
        flex-direction: column;
        gap: 20%;
    }
.apresentacao {
    width: 22%;
    background-color: black;
    height: 43.6rem;
    display: flex;
    align-items: center;
}
.componente{
    display: flex
}
.tela-cadastro{ 
  align-items: center;
padding: 14% 36%;
display: flex;
flex-direction: column; 
}
.cadastro{
    background-color: aqua;
    text-align: center;
    width: 56rem;
    height: 24rem;
    background-color: white;
    border-radius: 21px;
    box-shadow: 0px 4px 9px black;
 }

.input-cadastros{
    box-shadow: 0px 6px 9px #5CB9EE;
    border-radius: 6px;
    height: 2rem;   
    width: 100%;
    background-color: white;
    padding: 10px;
 }
  
 .cadastro-componente-login{
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 90%;
    gap: 10px;
    height: 10rem;
    justify-content: center;
    align-items: center;  
}

.componente-cadastro-1,.componente-cadastro-2{
    display: flex;
    gap:10px;
    width:100%;
 }
.botoes{
    display: flex;
    gap: 170px;
}

.enviar {
    background-color: white;
    width: 100px;
    color: black;
    height: 2rem;
    border: 2px solid black;
    border-radius: 8px;
 }
.cancelar {
    background-color: white;
    width: 100px;
    color: red;
    height: 2rem;
    border: 2px solid black;
    border-radius: 8px;
    }
.enviar:hover {
    background-color: #5CB9EE;
    color: white;
 }

.cancelar:hover {
    background-color: red;
    color: white;
}
    @media screen and (max-width: 1200px) {
  .apresentacao {
    width: 30%; 
  }
}

@media screen and (max-width: 768px) {
  .apresentacao {
    width: 40%; 
    height: 100dvh;
  }

  .tela-cadastro{
    
    padding: 10% 10%;
  }

  .titulo-componente {
    font-size: 18px;
  }
  .cadastro-componente-login{
    width: 100%;
  }     
  .componente-cadastro-1, .componente-cadastro-2{
    width: 100%;
  }
  .botoes {
 gap: 10px;
 flex-direction:column;
 width: 100%;
  }
  .cancelar, .enviar{
    width: 100%;
  }

  .input-cadastros {
    width: 100%; 
  }
}
</style>