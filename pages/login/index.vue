<template>
    <div class="login-container">
        <h1>Connexion</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="Votre email"
                    required
                />
            </div>
            <div>
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="Votre mot de passe"
                    required
                />
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const auth = useAuthStore()

const handleSubmit = async () => {
    error.value = '' // réinitialiser l'erreur
    try {
        // Appel direct de useFetch dans le handleSubmit
        await auth.login(email.value, password.value)
        // Rediriger vers la page d'accueil après une connexion réussie
        router.push('/')
    } catch (err: any) {
        error.value = err || "Une erreur est survenue lors de la connexion."
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 auto;
    padding: 2rem;

    max-width: 400px;
    height: 100%;

}
.login-container h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 42px;
}
.login-container form > div {
    margin-bottom: 1rem;
}
.login-container label {
    display: block;
    margin-bottom: 0.5rem;
}
.login-container input {
    width: 100%;
    padding: 0.5rem 1rem;

    border: 1px solid $secondary;
    border-radius: 100px;
}
.login-container input::placeholder {
    font-size: 12px;
    font-family: "Source Code Pro", serif;
    font-optical-sizing: auto;
    font-weight: 200;
    font-style: normal;
}
.login-container button {
    color: #ffffff;
    background-color: $secondary;
    padding: 0.5rem 1rem;
    border: 1px solid $secondary;
    border-radius: 100px;
    cursor: pointer;
    text-decoration: none;

    width: 100%;
    height: fit-content;
}
.error {
    margin-top: 1rem;
    color: red;
    text-align: center;
}
</style>
