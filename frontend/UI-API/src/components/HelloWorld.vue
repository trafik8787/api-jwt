
<script setup lang="ts">
import instance from '../axios'
import {ref} from 'vue'
defineProps<{
  msg: string
}>()
const data = ref<object | null>(null)

const getProduct = async () => {
  const response = await instance.get('/products');
  data.value = response.data;
}

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <pre>
        {{data}}
      </pre>
      <button @click="getProduct">Click</button>
    </div>
  </div>
</template>

<style scoped>

</style>
