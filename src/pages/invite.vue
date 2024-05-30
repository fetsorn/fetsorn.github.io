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
        <header>invite friends</header>
        <ul>
            <li>helen</li>
            <li>mary</li>
            <li>bob</li>
        </ul>
    </div>
</template>
