<template>
	<q-form @submit="cadastrarProduto" class="form-base" method="POST" enctype="multipart/form-data">
		<h5>Cadastro de Produto</h5>
		<div class="product-form">
			<q-input outlined v-model="nomeRef" label="Nome" required></q-input>
		</div>
		<div class="product-form">
			<q-input outlined v-model="descricaoRef" label="Descrição" maxlength="200" textarea></q-input>
		</div>
		<div class="product-form">
			<q-input outlined v-model="corRef" label="Cor" required></q-input>
		</div>
		<div class="product-form">
			<q-input outlined v-model="tamanhoRef" label="Tamanho" required></q-input>
		</div>
		<div class="product-form">
			<q-input outlined v-model="quantidadeRef" type="number" label="Quantidade" min="1" required></q-input>
		</div>
		<div class="product-form">
			<q-input outlined v-model="valorRef" type="number" label="Valor" min="1" step="0.01" required></q-input>
		</div>
		<div class="product-form">
			<label for="categoria">Categoria:</label>
			<select id="categoria" name="categoria" required v-model="categoriaRef">
				<option value="" disabled selected>Selecione uma categoria</option>
				<option value="CALCADOS">Calçados</option>
				<option value="ACESSORIOS">Acessórios</option>
				<option value="ROUPAS">Roupas</option>
			</select>
		</div>
		<div class="product-form">
			<q-file v-model="imagemRef" outlined label="Imagem" accept="image/*" @input="tratadorImagem"></q-file>
		</div>
		<q-btn size="22px" class="glossy q-px-xl q-py-xs" color="primary" type="submit" :disable="isLoading">
			<q-spinner v-if="isLoading" />
			<span v-else>Cadastrar</span>
		</q-btn>
	</q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import dataService from "../services/ProdutoDataService";
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const nomeRef = ref('');
		const descricaoRef = ref('');
		const corRef = ref('');
		const tamanhoRef = ref('');
		const quantidadeRef = ref('');
		const valorRef = ref('');
		const categoriaRef = ref('');
		const imagemRef = ref([]);
		const isLoading = ref(false);
		const imagemBase64 = ref(null);
		const router = useRouter();

		const cadastrarProduto = async () => {
			try {
				const produto = {
					nome: nomeRef.value,
					descricao: descricaoRef.value,
					cor: corRef.value,
					tamanho: tamanhoRef.value,
					quantidade: parseInt(quantidadeRef.value),
					valor: parseFloat(valorRef.value),
					categoria: categoriaRef.value,
					imagem: imagemBase64.value
				};

				isLoading.value = true;
				console.log(produto);
				await dataService.salvarProduto(produto);
				router.push({ name: 'adminCadastroProduto' });
				isLoading.value = false;
			} catch (error) {
				isLoading.value = false;
				alert('Erro: ' + error);
				console.error('Erro ao cadastrar o produto:', error);
			}
		};

		const tratadorImagem = (event) => {
			try {
				const file = event.target.files[0];

				if (file) {
					const reader = new FileReader();

					reader.onload = () => {
						try {
							const base64Image = reader.result;
							console.log("Imagem convertida: " + base64Image);
							imagemBase64.value = base64Image; // Armazene o valor convertido em base64 na variável imagemBase64
						} catch (error) {
							console.error('Erro ao tratar a imagem:', error);
						}
					};

					reader.onerror = (error) => {
						console.error('Error:', error);
					};

					reader.readAsDataURL(file);
				} else {
					console.error('Arquivo inválido.');
				}
			} catch (error) {
				console.error('Erro ao ler o arquivo:', error);
			}
		};

		return {
			tratadorImagem,
			nomeRef,
			descricaoRef,
			corRef,
			tamanhoRef,
			quantidadeRef,
			valorRef,
			categoriaRef,
			imagemRef,
			isLoading,
			cadastrarProduto
		};
	}
});
</script>

<style>
.form-base {
	padding: 20px;
}

.product-form {
	margin-bottom: 7px;
}

label {
	display: block;
	margin-bottom: 5px;
}

input,
textarea,
select {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	margin-bottom: 10px;
}

button {
	background-color: #4caf50;
	color: white;
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
}

button:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}
</style>

