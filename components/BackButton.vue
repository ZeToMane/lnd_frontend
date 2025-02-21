<template>
    <button @click="goBack">
        Retour
    </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
    router.back()
}
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    border: 1px solid $secondary;
    background-color: #fff;
    transition: background-color 0.2s;
}
</style>
