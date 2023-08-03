<template>
  <q-page class="q-pa-md">
    <h1 class="titulo">Login de Colaborador:</h1>
    <q-card class="quadrado" style="background-color: #e1e3e6;">
      <q-form @submit="logarColaborador" class="form-base">
        <div class="colaborador-form">
          <div class="colaborador-input">
            <label for="login" style="font-size: 15px;">Login:</label>
            <q-input outlined v-model="loginRef" id="login" required placeholder="Login" class="input-narrow"></q-input>
          </div>
          <div class="colaborador-input">
            <label for="senha" style="font-size: 15px;">Senha:</label>
            <q-input outlined v-model="senhaRef" id="senha" type="password" required placeholder="Senha" class="input-narrow"></q-input>
          </div>
          <q-btn type="submit" class="glossy q-px-xl q-py-xs cadastrar" color="primary" label="Entrar"></q-btn>
        </div>
      </q-form>
    </q-card>
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
