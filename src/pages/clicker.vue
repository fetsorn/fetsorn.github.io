<script setup>
 import { MainButton, useWebAppPopup } from 'vue-tg'

 const { showAlert } = useWebAppPopup()
</script>

<template>
    <div>
        <span>points</span>
        <button>click</button>
        <router-link :to="'/invite'">Invite friends</router-link>
        <router-link :to="'/mission-wallet'">Open Wallet: 50p</router-link>
        <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
    </div>
</template>
