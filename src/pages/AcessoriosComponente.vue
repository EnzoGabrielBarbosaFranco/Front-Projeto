<template>
  <q-page class="q-pa-md">
    <h1 class="titulo">Acessórios:</h1>
      <q-form @submit="logarColaborador" class="form-base">

      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {

  },
});
</script>

<style>
.form-base {
  padding: 20px;
}

.titulo {
  margin-top: 40px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: bold;
}

.quadrado {
  max-width: 400px; /* Largura máxima do quadrado */
  margin: 0 auto; /* Centralizar o quadrado horizontalmente */
  padding: 10px; /* Espaçamento interno do quadrado */
}

.colaborador-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colaborador-input {
  margin-bottom: 10px;
}

.input-narrow {
  width: 300px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

q-btn.cadastrar {
  width: 120px;
  margin-top: 20px;
}
</style>
