<template>
    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const error = ref('')

const router = useRouter()
const config = useRuntimeConfig()
const auth = useAuthStore()

const handleLogout = async () => {
    error.value = '' // réinitialiser l'erreur
    try {
        // Appel direct de useFetch dans le handleSubmit
        await auth.logout()
        // Rediriger vers la page d'accueil après une connexion réussie
        router.push('/')
    } catch (err: any) {
        error.value = err.data?.message || "Une erreur est survenue lors de la connexion."
        console.log(err);
    }
}

// Appeler handleLogout dès que le composant est monté
onMounted(() => {
    handleLogout();
});
</script>

