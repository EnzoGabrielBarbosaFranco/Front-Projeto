<template>
	<q-layout view="lHh Lpr lFf-reverse">
		<q-header elevated>
			<q-toolbar class="bg-primary glossy text-white">
				<img class="logo" @click="navigateToCatalogo" src="../assets/qr-code.png" />
				<q-toolbar-title class="nomeEmpresa" @click="navigateToCatalogo"> SGE </q-toolbar-title>
				<q-toolbar-title v-if="userName" class="userName" @click="navigateToAdmin">{{ userName() }}</q-toolbar-title>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleRightDrawer" />
			</q-toolbar>
		</q-header>

		<q-drawer v-model="rightDrawerOpen" side="right" show-if-below right>
			<br />
			<q-item-label header> Links Essenciais </q-item-label>
			<br />
			<q-list>
				<div class="btnLink">
					<q-btn flat color="primary" label="Catálogo" @click="navigateToCatalogo" />
				</div>
				<div class="btnLink">
					<q-btn flat v-if="!verificarAdminLogado()" color="primary" label="Colaborador" @click="navigateToColaborador" />
				</div>
				<div class="btnLink">
					<q-btn flat color="primary" label="Admin" @click="navigateToAdmin" />
				</div>
				<div class="btnLink">
					<q-btn flat color="red" label="Logout" @click="logout" />
				</div>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
import { jwtDecode } from "jwt-decode";

export default defineComponent({
	name: "MainLayout",

	setup() {
		const rightDrawerOpen = ref(false);
		const router = useRouter();

		const navigateToAdmin = () => {
			router.push("/admin");
		};
		const navigateToCatalogo = () => {
			router.push("/");
		};
		const navigateToColaborador = () => {
			router.push("/colaborador");
		};
		const logout = () => {
			// Remova o token e outros dados de autenticação dos cookies
			cookies.remove('token');
			cookies.remove('adminLogin');
			cookies.remove('isAdmin');

			// Redirecione para a página de login ou para onde preferir
			router.push("/");
		};

		const userName = ref(() => {
			const adminLogin = cookies.get('adminLogin')
			return adminLogin || 'Convidado';
		});
		const verificarAdminLogado = () => {
			// Obtenha o token armazenado nos cookies
			const token = cookies.get('token');

			// Verifique se o token está presente
			if (!token) {
				return false; // Admin não está logado
			}

			try {
				// Decodifique o token para obter informações sobre a expiração
				const decodedToken = jwtDecode(token);

				// Verifique se o token expirou
				const agora = Date.now() / 1000; // em segundos
				return decodedToken.exp >= agora;
			} catch (error) {
				console.error('Erro ao decodificar o token:', error);
				return false; // Admin não está logado (ou erro ao decodificar o token)
			}
		};

		return {
			userName,
			verificarAdminLogado,
			rightDrawerOpen,
			logout,
			navigateToAdmin,
			navigateToCatalogo,
			navigateToColaborador,
			toggleRightDrawer() {
			rightDrawerOpen.value = !rightDrawerOpen.value;
			},
		};
	},
});
</script>

<style>
.toolbar-left {
	display: flex;
	align-items: center;
}

.toolbar-right {
	margin-left: auto;
}

.logo {
	width: 69px;
	/* Defina o tamanho desejado para o logotipo */
	height: auto;
	margin-bottom: 6px;
	margin-right: 25px;
}

.nomeEmpresa {
	margin-left: 90px;
	font-size: 30px;
}
</style>
