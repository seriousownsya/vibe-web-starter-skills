<template>
  <main>
    <h1>{{ message }}</h1>
    <p>This full-stack app is ready to edit.</p>
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/message', {
  method: 'post',
  body: { message: 'Hello from the API' },
})

const message = computed(() => data.value?.message ?? 'Hello')
</script>
