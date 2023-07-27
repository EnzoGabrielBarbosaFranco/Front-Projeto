<template>
	<q-card class="my-card product-container rounded">
		<q-img :src="produto.imagem" class="product-card__image">
			<div class="absolute-bottom text-h6">{{ produto.nome }}</div>
		</q-img>
		<q-rating v-model="stars" :max="5" size="34px" />
		<q-card-section class="product-card__info">
			<div class="q-pt-none product-card__description">Descrição: {{ produto.descricao }}</div>
			<div class="text-subtitle2 product-card__color">Cor: {{ produto.cor }}</div>
			<q-card-section class="product-card__bottom">
				<div class="text-subtitle2 product-card__price">R$ {{ produto.valor }}</div>
			</q-card-section>
			<div class="button">
				<q-btn push color="primary" label="Experimentar" />
			</div>
		</q-card-section>
	</q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		produto: {
			type: Object,
			required: true
		}
	},
});

</script>
<style scoped>
.my-card {
	width: 400px;
	height: 555px;
	margin: 10px;
	box-shadow: 0 2px 12px rgb(19, 33, 54);
	transition: box-shadow 0.3s ease-in-out;
}

.my-card:hover {
	box-shadow: 0 16px 25px rgba(43, 43, 70, 0.1);
}

.product-card {
	width: 400px;
	height: 455px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-shadow: 0 2px 8px rgba(43, 43, 70, 0.1);
	border-radius: 4px;
	padding: 16px;
	margin: 30px 14px;
	margin-bottom: 30px;
}

.product-card__image {
	width: 400px;
	height: 330px;
	object-fit: fill;
}

.product-card__info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
}

.product-card__name {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 8px;
}

.product-card__description,
.product-card__color {
	font-size: 14px;
	margin-bottom: 8px;
}

.product-card__price {
	font-size: 18px;
	font-weight: bold;
}

.button {
	display: flex;
	align-items: center;
}

.button button {
	margin-left: 8px;
}
</style>
