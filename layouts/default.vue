<template>
    <main>
        <slot />
    </main>
</template>

<script setup>


</script>

<style lang="scss">
main{
    display: flex;
    flex-direction: column;
    padding: 1rem;

    width: 100%;
    height: 100vh;
    overflow-y: scroll;
}

</style>