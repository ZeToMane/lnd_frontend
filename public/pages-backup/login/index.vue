<template>
    <div class="login-container">
        <h1>Connexion</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="email">Email :</label>
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="Votre email"
                    required
                />
            </div>
            <div>
                <label for="password">Mot de passe :</label>
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
import type { User } from '~/assets/types'
import { useAuthStore } from '~/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const config = useRuntimeConfig()
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

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.login-container h1 {
    text-align: center;
    margin-bottom: 1.5rem;
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
    padding: 0.5rem;
    box-sizing: border-box;
}
.login-container button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.error {
    margin-top: 1rem;
    color: red;
    text-align: center;
}
</style>
