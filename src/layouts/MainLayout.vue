<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary glossy text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <br />
        <q-avatar>
          <img src="../assets/qr-code.png">
        </q-avatar>
        <q-toolbar-title>
          SGQ
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-bellow bordered>
      <br />
      <q-item-label header>
        Links Essenciais
      </q-item-label>
      <q-list>
        <div class="btnLink">
          <q-btn flat color="primary" label="Catálogo" @click="navigateToCatalogo" />
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    const navigateToAdmin = () => {
      router.push('/admin')
    }
    const navigateToCatalogo = () => {
      router.push('/')
    }

    return {
      leftDrawerOpen,
      navigateToAdmin,
      navigateToCatalogo,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
