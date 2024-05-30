<script setup lang="ts">
 import { useWebAppViewport } from 'vue-tg'

 const { expand } = useWebAppViewport()

 expand()
</script>

<template>
  <main>
      <router-view></router-view>
  </main>
</template>
