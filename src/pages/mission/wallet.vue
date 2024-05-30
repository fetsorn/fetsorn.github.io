<script setup>
 import { useRouter } from 'vue-router'
 import { BackButton } from 'vue-tg'

 const router = useRouter()

 function handleBackButton() {
     router.push('/')
 }
</script>

<template>
    <BackButton @click="handleBackButton" />

    <div>
        <header>open wallet</header>
        <a>open link to install wallet</a>
        <div>timer</div>
    </div>
</template>
