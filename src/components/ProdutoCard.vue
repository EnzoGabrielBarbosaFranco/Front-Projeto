<template>
  <q-card class="my-card product-container">
    <div class="product-card">
      <div class="product-card__image">
        <q-img :src="produto.imagem" alt="Imagem do produto" />
      </div>
      <q-card-section class="product-card__info">
        <div class="text-h6 product-card__name">{{ produto.nome }}</div>
        <div class="q-pt-none product-card__description">Descrição: {{ produto.descricao }}</div>
        <div class="text-subtitle2 product-card__color">Cor: {{ produto.cor }}</div>
        <q-card-section class="product-card__bottom">
          <div class="text-subtitle2 product-card__price">R$ {{ produto.valor }}</div>
        </q-card-section>
        <div class="button">
          <q-btn color="primary" label="Experimentar" icon="mdi-play-circle-outline" />
        </div>
      </q-card-section>
    </div>
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
  flex-basis: calc(33.33% - 20px);
  margin: 20px 0;
  box-shadow: 0 7px 12px rgba(19, 61, 247, 0.1);
  transition: box-shadow 1s ease-in-out;
}

.my-card:hover {
  box-shadow: 0 16px 25px rgba(9, 60, 199, 0.1);
}

@media (max-width: 1072px) {
  .my-card {
    flex-basis: calc(50% - 20px);
  }
}

@media (max-width: 712px) {
  .my-card {
    flex-basis: calc(100% - 20px);
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card__image {
  flex: 1 0 auto;
  height: 50%;
  position: relative;
}

.product-card__image img {
  height: 100%;
  object-fit: cover;
}

.product-card__info {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.product-card__name {
  font-size: 18px;
  font-weight: 500;
}

.product-card__description {
  margin-top: 8px;
  color: #7a7a7a;
}

.product-card__color {
  margin-top: 8px;
  color: #7a7a7a;
}

.product-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.product-card__price {
  font-size: 16px;
  font-weight: 500;
}

.button {
  display: flex;
  align-items: center;
}

.button button {
  margin-left: 8px;
}
</style>
