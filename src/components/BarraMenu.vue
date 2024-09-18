<template>
    <div class="principal">
        <div class="apresentacao ">
            <div class="rotas"> 
                <CadastroRacao />
            </div>
        </div>
        <BarraPerfil />
        <VisualizarRacao />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CadastroRacao from './CadastroRacao.vue';
import VisualizarRacao from './VisualizarRacao.vue';
import BarraPerfil from './BarraPerfil.vue';
export default defineComponent({
    components:{
        VisualizarRacao, 
        BarraPerfil,
        CadastroRacao
    },
    data() {
        return {
          
        };
    },
    
})
</script>
<style scoped>
.principal{
   
    display: flex
}

.rotas {
    width: 70%;
    display: flex;
    justify-content: center;
    margin-left: 40px;
}


.apresentacao {
  
    width: 20%;
    background-color: darkgray;
    height: 100dvh;
    display: flex;
    align-items: center;
    gap: 100px;


}

@media screen and (max-width: 768px) {
    .apresentacao {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
        height: 4rem;
        margin-top: 65%;
        width: 100%;
        position: absolute;
        bottom: 3%;
    
    }
    .apresentacao-perfil{
        width: 100%;
        margin-left: 0;
    }

    .logo-titulo {
        flex-direction: row;
        justify-content: center;
        margin-bottom: 0;
    }

    .rotas {
        width: 40%;
    }
}
@media screen and (max-width: 720px) {
    .apresentacao{
        bottom: 11%;
        
    }
}
@media screen and (max-width: 500px) {
    .apresentacao{
        position: absolute;
        bottom: 7%;
    }
}



</style>
