<template>
    <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 30ch">
          Sem Permissão!
        </div>
  
        <div class="text-h2" style="opacity:.4">
          Você não tem acesso a essa página!
        </div>
  
        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Voltar Para O Catalogo" no-caps />
      </div>
    </div>
  </template>
  
  <script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorAcessoNegado'
})
</script>