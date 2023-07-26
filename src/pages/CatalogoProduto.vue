<template>
	<div>
		<h5 id="catalogo"> - Catálogo - </h5>
		<div class="product-list">
			<product-card v-for="produto in produtos" :key="produto.id" :produto="produto" />
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
		}).catch(error => {
			console.log(error)
		});;
	},
});
</script>

<style scoped>
.product-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.product-card {
	flex-basis: calc(33.33% - 20px);
	margin: 20px;
	box-shadow: 0 7px 12px rgba(19, 61, 247, 0.1);
	transition: box-shadow 1s ease-in-out;
}

.product-card:hover {
	box-shadow: 0 16px 25px rgba(9, 60, 199, 0.1);
}
</style>
