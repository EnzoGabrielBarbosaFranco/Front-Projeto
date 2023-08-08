<template>
  <div class="catalogo">
    <h4 class="titulo"><strong>Catálogo</strong></h4>
    <div class="text-center">
      <q-btn color="primary" id="botao-catalogo" label="Acessórios" @click="navigateToAcessorios" />
      <q-btn color="primary" id="botao-catalogo" label="Calçados" @click="navigateToCalcados"/>
      <q-btn color="primary" id="botao-catalogo" label="Roupas" @click="navigateToRoupas"/>
    </div>
    <div class="q-gutter-md center-items">
      <div class="q-col" v-for="produto in produtos" :key="produto.id" >
        <product-card :produto="produto" />
      </div>
    </div>
  </div>
</template>

<script>
import ProdutoCard from '../components/ProdutoCard.vue';
import Produto from '../services/ProdutoDataService';
import { defineComponent, ref, onMounted } from 'vue'; // Importe 'ref' e 'onMounted'
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CatalogoProduto",
  components: {
    'product-card': ProdutoCard,
  },
  setup() {
    const produtos = ref([]); // Use 'ref' para criar o reativo 'produtos'
    const router = useRouter();

    const navigateToAcessorios = () => {
      router.push("/acessorios");
    };
    const navigateToCalcados = () => {
      router.push("/calcados");
    };
    const navigateToRoupas = () => {
      router.push("/roupas");
    };

    // Use 'onMounted' para carregar os produtos após o componente ser montado
    onMounted(async () => {
      try {
        const resposta = await Produto.listarProdutos();
        console.log(resposta.content);
        produtos.value = resposta.content;
      } catch (error) {
        console.error('Erro ao listar os produtos:', error);
      }
    });

    // Retorne os valores que deseja tornar disponíveis para o template
    return {
      produtos,
      navigateToAcessorios,
      navigateToCalcados,
      navigateToRoupas
    };
  },
});
</script>
<style scoped>
.titulo {
  text-align: center;
  margin-bottom: 25px;
  font-size: 35px;
}

.q-col {
  margin: 20px 0;
  box-sizing: border-box;
}

.q-gutter-md {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Centraliza os produtos horizontalmente */
  align-items: center;
  /* Centraliza os produtos verticalmente */
  margin: -10px;
  min-height: 100vh;
  /* Ocupa toda a altura disponível na tela */
}

.q-gutter-md .q-col {
  padding: 10px;
  box-sizing: border-box;
}

#botao-catalogo {
  padding: 5px 10px;
  /* Espaçamento interno dos botões */
  margin: 5px;
  /* Espaçamento entre os botões */
  font-size: 14px;
  /* Tamanho da fonte dos botões */
  border-radius: 10px;
}

.catalogo {
  margin-top: -5px;
}</style>
