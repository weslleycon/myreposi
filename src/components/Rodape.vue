<template>
    <footer class="fotter-final">
      <p class="texto-footer">Todos os direitos reservados. Gerado em: {{ tempoDeCarregamento }}ms</p>
    </footer>
  </template>
  <script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent ({
    name:"RodapeFinal",
    data() {
      return {
        tempoDeCarregamento: 0
      };
    },
    mounted() {
      const tempoInicial = performance.now();
      window.addEventListener('load', () => {
        const tempoFinal = performance.now();
        this.tempoDeCarregamento = Math.round(tempoFinal - tempoInicial);
      });
    }
  });
  </script>
  <style scoped>
    .fotter-final{
    background-color: darkgray;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    }
.texto-footer{
  color: black;
  margin-top: 10px;
}
    @media screen and (max-width: 767px) {
    .fotter-final{
      height: 4rem;
      width: 100%;
    }
    }
  
    @media screen and (max-width: 767px) {
      .fotter-final{
        position: absolute;
      }
    }
  </style>