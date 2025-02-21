<template>
    <!-- Bind inline styles directly from props -->
    <div class="navbar">
        <NuxtLink
            to="/create"
        >
            Create
        </NuxtLink>
        <NuxtLink
            to="/"
        >
            Map
        </NuxtLink>
        <NuxtLink
            to="/objects"
        >
            User
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
/* const props = defineProps({
    text: {
        type: String,
        default: 'Click Me'
    },
    backgroundColor: {
        type: String,
        default: ''
    },
    textColor: {
        type: String,
        default: '#ffffff'
    },
    textSize: {
        type: String,
        default: '16px'
    },
    path: {
        type: String,
        default: '/'
    }
}) */
</script>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        justify-content: space-around;

        background-color: $secondary;
        padding: 0.5rem 1rem;
        border: 1px solid $secondary;
        border-radius: 100px;
        cursor: pointer;
        text-decoration: none;

        width: 100%;
        height: fit-content;
        
        a{
            color: #fff;
            font-size: 16px;
            text-decoration: none;
        }
    }
</style>
