<template>
	<div class="container">
		<h1 class="titulo">Administração</h1>
		<div class="q-justify-center cadastros">
			<router-link to="admin/CadastroProduto" class="nav-link active">
				<q-btn color="primary" label="Cadastro de Produtos"></q-btn>
			</router-link>
			<router-link to="admin/CadastroUser" class="nav-link active">
				<q-btn color="primary" label="Cadastro de Colaboradores"></q-btn>
			</router-link>
		</div>
		<q-page-container class="conteiner-geral">
			<q-list>
				<h5 class="produtos-ativos-inativos">Produtos Ativos:</h5>
				<div class="q-gutter-md q-mb-md" v-for="produto in produtos" :key="produto.id">
					<div class="q-pa-md q-row">
						<p class="text q-col"><strong>Produto:</strong> <span class="bold-text">{{ produto.nome }}</span>
						</p>
						<p class="text q-col">Cor: {{ produto.cor }}</p>
						<p class="text q-col">Tamanho: {{ produto.tamanho }}</p>
						<p class="text q-col">Valor: {{ produto.valor }}</p>
						<div class="q-gutter-md q-justify-end">
							<q-btn color="primary" label="Editar" @click="editarProduto(produto)"></q-btn>
							<q-btn color="negative" label="Excluir" @click="excluirProduto(produto.id)"></q-btn>
						</div>
					</div>
				</div>
			</q-list>
			<br />
			<div v-if="produtosInativos.length > 0">
				<q-list>
					<h5 class="produtos-ativos-inativos">Produtos Inativos:</h5>
					<div class="q-gutter-md q-mb-md" v-for="produto in produtosInativos" :key="produto.id">
						<div class="q-pa-md q-row">
							<p class="text q-col"><strong>Produto:</strong> <span class="bold-text">{{ produto.nome
							}}</span></p>
							<p class="text q-col">Cor: {{ produto.cor }}</p>
							<p class="text q-col">Tamanho: {{ produto.tamanho }}</p>
							<p class="text q-col">Valor: {{ produto.valor }}</p>
							<div class="q-gutter-md q-justify-end">
								<q-btn color="negative" label="Reativar" @click="reativarProduto(produto.id)"></q-btn>
							</div>
						</div>
					</div>
				</q-list>
			</div>
			<br />
			<q-list>
				<h5 class="admins-ativos-inativos">Colaboradores Ativos:</h5>
				<div class="q-gutter-md q-mb-md" v-for="admin in admins" :key="admin.id">
					<div class="q-pa-md q-row">
						<p class="text q-col"><strong>Nome:</strong> <span class="bold-text">{{ admin.nome }}</span></p>
						<p class="text q-col">Login: {{ admin.login }}</p>
						<!-- <p class="text q-col">Senha: {{ admin.senha }}</p> -->
						<div class="q-gutter-md q-justify-end">
							<q-btn color="primary" label="Editar" @click="editarAdmin(admin)"></q-btn>
							<q-btn color="negative" label="Excluir" @click="excluirAdmin(admin.id)"></q-btn>
						</div>
					</div>
				</div>
			</q-list>
			<br />
			<div v-if="adminsInativos.length > 0">
				<q-list>
					<h5 class="admins-ativos-inativos">Colaboradores Inativos:</h5>
					<div class="q-gutter-md q-mb-md" v-for="admin in adminsInativos" :key="admin.id">
						<div class="q-pa-md q-row">
							<p class="text q-col"><strong>Nome:</strong> <span class="bold-text">{{ admin.nome }}</span></p>
							<p class="text q-col">Login: {{ admin.login }}</p>
							<!-- <p class="text q-col">Senha: {{ admin.senha }}</p> -->
							<div class="q-gutter-md q-justify-end">
								<q-btn color="negative" label="Reativar" @click="reativarAdmin(admin.id)"></q-btn>
							</div>
						</div>
					</div>
				</q-list>
			</div>
			<br />
		</q-page-container>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Produto from "../services/ProdutoDataService";
import AdminService from "../services/AdminDataService.js";

export default defineComponent({
	setup() {
		const router = useRouter();
		const produtos = ref([]);
		const produtosInativos = ref([]);
		const admins = ref([]);
		const adminsInativos = ref([]);

		const carregarProdutos = async () => {
			try {
				const resposta = await Produto.listarProdutos();
				produtos.value = resposta.content;
			} catch (error) {
				console.error("Erro ao carregar produtos:", error);
			}
		};

		const carregarProdutosInativos = async () => {
			try {
				const respostaInativos = await Produto.listarProdutosInativos();
				produtosInativos.value = respostaInativos.content;
			} catch (error) {
				console.error("Erro ao carregar produtos inativos:", error);
			}
		};

		const editarProduto = (produto) => {
			router.push(`/admin/EditProduto/${produto.id}`);
		};

		const excluirProduto = async (produtoId) => {
			try {
				await Produto.excluirProduto(produtoId);
				await carregarProdutos();
				await carregarProdutosInativos();
			} catch (error) {
				console.error("Erro ao excluir o produto:", error);
			}
		};

		const reativarProduto = async (produtoId) => {
			try {
				await Produto.reativarProduto(produtoId);
				await carregarProdutos();
				await carregarProdutosInativos();
			} catch (error) {
				console.error("Erro ao excluir o produto:", error);
			}
		};

		const carregarAdmins = async () => {
			try {
				const resposta = await AdminService.listarAdmins();
				admins.value = resposta.content;
			} catch (error) {
				console.error("Erro ao carregar admins:", error);
			}
		};

		const carregarAdminsInativos = async () => {
			try {
				const respostaInativos = await AdminService.listarAdminsInativos();
				adminsInativos.value = respostaInativos.content;
			} catch (error) {
				console.error("Erro ao carregar admins inativos:", error);
			}
		};

		const editarAdmin = (admin) => {
			router.push(`/admin/EditUser/${admin.id}`);
		};

		const excluirAdmin = async (adminId) => {
			try {
				await AdminService.excluirAdmin(adminId);
				await carregarAdmins();
				await carregarAdminsInativos();
			} catch (error) {
				console.error("Erro ao excluir o admin:", error);
			}
		};

		const reativarAdmin = async (adminId) => {
			try {
				await AdminService.reativarAdmin(adminId);
				await carregarAdmins();
				await carregarAdminsInativos();
			} catch (error) {
				console.error("Erro ao reativar o admin:", error);
			}
		};

		onMounted(async () => {
			await carregarProdutos();
			await carregarProdutosInativos();
			await carregarAdmins();
			await carregarAdminsInativos();
		});

		return {
			produtos,
			produtosInativos,
			admins,
			adminsInativos,
			reativarProduto,
			editarProduto,
			excluirProduto,
			editarAdmin,
			excluirAdmin,
			reativarAdmin,
		};
	},
});
</script>

<style>
.container {
	margin: 0 auto;
	padding: 20px;
}

.conteiner-geral{
  margin-top: -40px;
}

.admins-ativos-inativos {
	font-weight: bold;
	font-size: 30px;
	text-align: center;
}

.titulo {
	font-size: 24px;
	font-weight: bold;
  margin-bottom: 25px;
}

.form-actions {
	background-color: #3680e2;
	padding: 10px;
	margin-bottom: 10px;
}

.text {
	font-size: 16px;
}

.bold-text {
	font-weight: bold;
	font-size: 20px;
}

.produtos-ativos-inativos {
	font-weight: bold;
	font-size: 30px;
	text-align: center;
}

.produtos-ativos-inativos {
	font-weight: bold;
	font-size: 30px;
	text-align: center;
}

.titulo {
	text-align: center;
	font-size: 35px;
	font-weight: bold;
}

.q-row {
	display: flex;
	flex-wrap: wrap;
}

.q-col {
	flex: 1;
	margin-right: 10px;
}

.q-gutter-md {
	margin-right: -10px;
	margin-left: -10px;
}

.q-pa-md {
	padding: 10px;
}

.q-list {
	margin-top: 20px;
}

.q-btn {
	margin-right: 16px;
}

h5 {
	padding-left: 15px;
}

.q-mb-md {
	border: 2px solid #868686;
	margin-bottom: 25px;
}

.q-justify-center {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}
</style>
