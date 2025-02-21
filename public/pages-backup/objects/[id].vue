<template>
    <div>
        <h1>Object Details</h1>
        <div v-if="error">
            <p>Une erreur est survenue: {{ error.message }}</p>
        </div>
        <div v-else-if="!object">
            <p>Chargement...</p>
        </div>
        <div v-else>
            <h2>{{ object.title }}</h2>
            <p>ID: {{ object._id }}</p>
            <p>Description: {{ object.description }}</p>
            <img v-if="object.photo_url" :src="'http://localhost:3000/' + object.photo_url" alt="Object photo" />
        <!-- Add more fields as needed -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Object } from '~/assets/types'

// Get the current route to read the :id param
const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie']);

// Make an API call to get the object details by ID
const { data: object, error } = await useFetch<Object>(`${config.public.apiBaseUrl}/objects/${route.params.id}`, {
    method: 'GET',
    server: true,        
    credentials: 'include',
    headers
})

console.log("Object GET by id: ", object)
</script>
