<template>
    <!-- Bind inline styles directly from props -->
    <NuxtLink
        class="button-link"
        :to="{path}"
        :style="{
            backgroundColor: backgroundColor,
            color: textColor,
            fontSize: textSize
        }"
    >
        {{ text }}
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
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
})
</script>

<style lang="scss" scoped>
    .button-link {
        background-color: $secondary;
        padding: 0.5rem 1rem;
        border: 1px solid $secondary;
        border-radius: 100px;
        cursor: pointer;
        text-decoration: none;

        width: fit-content;
        height: fit-content;
    }
</style>
