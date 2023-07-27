<template>
	<q-form class="admin-form" @submit="editarAdmin">
		<h5 class="titulo">Editar Admin:</h5>
		<div>
			<label for="nome">Nome:</label>
			<q-input class="form-input" v-model="nomeRef" outlined required></q-input>
		</div>
		<div>
			<label for="login">Login:</label>

			<q-input class="form-input" v-model="loginRef" outlined required></q-input>
		</div>
		<div>
			<label for="senha">Senha:</label>

			<q-input class="form-input" v-model="senhaRef" outlined type="password" required></q-input>
		</div>
		<q-btn class="submit-btn" color="primary" type="submit" label="Salvar"></q-btn>
	</q-form>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminService from "../services/AdminDataService";

export default defineComponent({
	setup() {
		const router = useRouter();
		const nomeRef = ref("");
		const loginRef = ref("");
		const senhaRef = ref("");

		const editarAdmin = async () => {
			try {
				const nome = nomeRef.value;
				const login = loginRef.value;
				const senha = senhaRef.value;
				const id = router.currentRoute.value.params.id;

				const admin = {
					id,
					nome,
					login,
					senha,
				};

				await AdminService.editarAdmin(id, admin);
				await carregarAdmin();
				alert("Admin atualizado com sucesso!");
			} catch (error) {
				alert("Erro: " + error);
				console.error("Erro ao editar o admin:", error);
			}
		};

		const carregarAdmin = async () => {
			try {
				const adminId = router.currentRoute.value.params.id;
				const admin = await AdminService.obterAdmin(adminId);
				nomeRef.value = admin.nome;
				loginRef.value = admin.login;
				senhaRef.value = admin.senha;
			} catch (error) {
				console.error("Erro ao carregar o admin:", error);
			}
		};

		onMounted(async () => {
			await carregarAdmin();
		});

		return {
			editarAdmin,
			nomeRef,
			loginRef,
			senhaRef,
		};
	},
});
</script>

<style scoped>
.admin-form {
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

.titulo {
	margin-top: 50px;
	text-align: center;
	font-size: 35px;
	margin-bottom: 40px;
	font-weight: bold;
}
</style>
