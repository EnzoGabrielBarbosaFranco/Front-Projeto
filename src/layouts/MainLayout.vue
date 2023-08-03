<template>
	<q-layout view="lHh Lpr lFf-reverse">
		<q-header elevated>
			<q-toolbar class="bg-primary glossy text-white">
				<q-avatar>
					<img src="../assets/qr-code.png" />
				</q-avatar>
				<q-toolbar-title> SGQ </q-toolbar-title>
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
          <q-btn flat color="primary" label="Colaborador" @click="navigateToColaborador" />
        </div>
				<div class="btnLink">
					<q-btn flat color="primary" label="Admin" @click="navigateToAdmin" />
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

		return {
			rightDrawerOpen,
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
</style>
