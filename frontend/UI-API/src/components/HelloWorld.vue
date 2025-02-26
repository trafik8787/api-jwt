
<script setup lang="ts">
import instance from '../axios'
import {ref} from 'vue'
defineProps<{
  msg: string
}>()
const data = ref<object | null>(null)
const dataLogin = ref<object | null>(null)
const token = ref<string | null>(null)
const email = ref<string | null>(null)
const password = ref<string | null>(null)

const getProduct = async () => {
  const response = await instance.get('/products', {
    headers: {
      'Authorization': token.value
    }
  });
  data.value = response.data;
}

const login = async () => {
  const response = await instance.post('/login', {
      email: email.value,
      password: password.value,
  });
  dataLogin.value = response.data;
}


</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <pre>
        {{data}}
      </pre>
      <input type="text" v-model="token" placeholder="JWT token">
      <br>
      <button @click="getProduct">getProduct</button>

      <hr>
      <pre>
        {{dataLogin}}
      </pre>

      <input type="email" placeholder="email" v-model="email">
      <br>
      <input type="password" placeholder="Pass" v-model="password">
      <br>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<style scoped>

</style>
