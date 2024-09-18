<template>
    <div class="componente">
      
    
         <div class="tela-cadastro-usuario">
            <div class="titulo-cadastro">
            <h2 class="titulo-update-user">
                    Atualize seus dados.
            </h2>
            </div>
            <div class="cadastro-componente-1">
                <div class="componente-cadastro-1">
                    <InputText v-model="usuarioAtualizado.nome" type="text" placeholder="Nome" class="input-cadastros"/>
                </div>
                <div class="componente-cadastro-2">
                    <InputNumber v-model="usuarioAtualizado.idade" invalid mode="decimal" :min="0" class="input-cadastros" placeholder="Idade"/>
                </div>
            </div>
            <div class="cadastro-componente-2"> 
                <div class="componente-cadastro-2">
                    <InputText  v-model="usuarioAtualizado.email" type="text" class="input-cadastros" placeholder="Email"/>
                </div>
                <div class="componente-cadastro-3">
                    <InputMask id="phone" v-model="usuarioAtualizado.telefone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" class="input-cadastros" />
                </div>     
            </div> 
            <div class="cadastro-componente-3">
                <div class="botoes-usuario">
                <Button label="Salvar" @click="atualizarUsuario()"
                    class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 enviar" ></Button>
                    <Button label="Cancelar" @click="cancelarCadastro()" text
                    class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10 cancelar"></Button>
                </div>
            </div>
        </div>
     </div>
</template>
<script lang="ts">
import { updateUsuario,verificarUsuarioLogado } from '@/http';
import { defineComponent } from 'vue';
export default defineComponent({
data(){
return{
    user:{
        login: '',
        senha:'',
        id: 0
    },
    usuario:{
        nome: '',
idade: 0,
email: '',
cpf: '',
telefone: '',
user:{
    login: '',
    senha: ''
}
    },
    usuarioAtualizado:{
        nome:'',
        idade: 0,
        email: '',
        telefone: '',
        id: 0
    },
    opcaoSelecionada: null,
    opcoes:[
        {
            item:'Login'
        },
        {
            item:'Atualizar dados cadastrais'
        }
    ]
}
},
methods:{
cancelarCadastro(){
    this.$router.push('/')
},

async atualizarUsuario(){
    const usuarioAtulizado = await updateUsuario(this.usuarioAtualizado)
    alert('Dados cadastrais atualizados')
    this.$router.push('/');
},
camposPreenchidos(){
  return this.user.login && this.user.senha
},

}
})
</script>
<style scoped>

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
width: 20%;
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
padding: 10% 10%;
display: flex;
flex-direction: column;

}
.tela-cadastro-usuario{
align-items: center;
padding: 16% 36%;
display: flex;
flex-direction: column;   
}
.input-cadastros{
box-shadow: 0px 6px 9px #5CB9EE;
border-radius: 6px;
height: 2rem;   
width: 100%;
background-color: white;
padding: 0 4px;
}
.cadastro-componente-1,.cadastro-componente-2,.cadastro-componente-3{
display: flex;
width: 100%;
gap: 10px;
height: 2rem;
padding: 22px 0px;    
}

.componente-cadastro-1,.componente-cadastro-2, .componente-cadastro-3{
display: flex;
gap:10px;
}
.botoes-usuario{
display: flex;
gap: 180px;
margin-top: 10px;
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
.tela-cadastro-usuario {
padding: 16% 0%; /* Ajuste o padding para telas menores */
}
}

@media screen and (max-width: 768px) {
.apresentacao {
display: none;
}
.tela-cadastro-usuario{
height: 100dvh;
padding: 10% 22%;
}

.titulo-componente {
font-size: 18px; /* Reduza o tamanho da fonte para telas menores */
}

.cadastro-componente-1,
.cadastro-componente-2,
.cadastro-componente-3 {
flex-direction: column;
height: 5rem; 

}



.botoes-usuario {
margin-top: 5%;
    gap: 10px;
    width: 100%;
    align-items: center;
    flex-direction: column
}

.input-cadastros{
width: 100%;
}
.enviar, .cancelar{
width: 100%;
}

}
</style>