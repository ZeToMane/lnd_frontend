<template>
    <div class="container">
        <div class="main-title-container">
            <h1 class="main-title">
                Lost’n’Found
            </h1>
        </div>
        <div class="button-container">
            <Button
                text="Login"
                textColor="#fff"
                textSize="24px"
                path="/login"
            />
            <Button
                text="Créer un compte"
                textColor="#fff"
                textSize="24px"
                path="/register"
            />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;

    width: 100%;
    height: 100%;
}
.button-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    width: 100%;
    height: fit-content;
}
</style>