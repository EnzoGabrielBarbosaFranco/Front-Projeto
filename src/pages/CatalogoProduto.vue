<template>
	<div class="catalogo">
    <h4 class="titulo"><strong>Catálogo</strong></h4>
    	<div class="q-gutter-md">
			<div class="q-col" v-for="produto in produtos" :key="produto.id">
				<product-card :produto="produto" />
			</div>
		</div>
	</div>
</template>

<script>
import ProdutoCard from '../components/ProdutoCard.vue';
import Produto from '../services/ProdutoDataService';
import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		'product-card': ProdutoCard,
	},
	data() {
		return {
			produtos: [],
		};
	},
	mounted() {
		Produto.listarProdutos().then(resposta => {
			console.log(resposta.content);
			this.produtos = resposta.content;
		})
			.catch(error => {
				console.error('Erro ao listar os produtos:', error);
			});;
	},
});
</script>
<style scoped>
.titulo {
	text-align: center;
}

.q-col {
	margin: 20px 0;
	box-sizing: border-box;
}

.q-gutter-md {
	display: flex;
	flex-wrap: wrap;
	margin: -10px;
}

.q-gutter-md .q-col {
	padding: 10px;
	box-sizing: border-box;
}
</style>
