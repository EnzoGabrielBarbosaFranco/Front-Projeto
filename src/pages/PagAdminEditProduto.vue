<template>
  <q-form class="product-form" @submit="editarProduto">
    <h5 class="titulo">Editar Produto:</h5>
    <div>
      <label for="nome">Nome:</label>
      <q-input class="form-input" outlined v-model="produto.nome" required></q-input>
    </div>
    <div>
      <label for="descricao">Descrição:</label>
      <q-input class="form-input" outlined v-model="produto.descricao" type="textarea" maxlength  ="200" required></q-input>
    </div>
    <div>
      <label for="cor">Cor:</label>
      <q-input class="form-input" outlined v-model="produto.cor" required></q-input>
    </div>
    <div>
      <label for="tamanho">Tamanho:</label>
      <q-input class="form-input" outlined v-model="produto.tamanho" required></q-input>
    </div>
    <div>
      <label for="quantidade">Quantidade:</label>
      <q-input class="form-input" outlined v-model="produto.quantidade" type="number" min="1" required></q-input>
    </div>
    <div>
      <label for="valor">Valor:</label>
      <q-input class="form-input" outlined v-model="produto.valor" type="number" min="1" step="0.01" required></q-input>
    </div>
    <q-select class="form-input" label="Categoria" v-model="produto.categoria" required>
      <template #option-label="{ option }">
        {{ option.label }}
      </template>
      <q-option v-for="categoria in categorias" :key="categoria.value" :label="categoria.label"
        :value="categoria.value"></q-option>
    </q-select>
    <q-btn size="16px" color="primary" class="submit-btn" type="submit" label="Atualizar"></q-btn>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue';
import produtoDataService from '../services/ProdutoDataService';

export default defineComponent({
  data() {
    return {
      produtoId: null,
      produto: {
        id: null,
        nome: '',
        descricao: '',
        cor: '',
        tamanho: '',
        quantidade: null,
        valor: null,
        categoria: ''
      },
      categorias: [
        { label: 'Selecione uma categoria', value: null, disabled: true },
        { label: 'Calçados', value: 'CALCADOS' },
        { label: 'Acessórios', value: 'ACESSORIOS' },
        { label: 'Roupas', value: 'ROUPAS' }
      ]
    };
  },
  mounted() {
    this.produtoId = this.$route.params.id;
    this.carregarProduto();
  },
  methods: {
    async carregarProduto() {
      try {
        this.produto = await produtoDataService.obterProduto(this.produtoId);
      } catch (error) {
        console.error('Erro ao carregar o produto:', error);
      }
    },
    async editarProduto() {
      try {
        await produtoDataService.editarProduto(this.produtoId, this.produto);
        alert('Produto atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao editar o produto:', error);
      }
    }
  }
});
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  width: 300px;
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 20px;
}
</style>
