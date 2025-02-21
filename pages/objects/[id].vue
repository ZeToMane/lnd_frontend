<template>
    <div>
        <BackButton/>
    </div>
    <div>
        <div v-if="error">
            <p>Une erreur est survenue: {{ error.message }}</p>
        </div>
        <div v-else-if="!object">
            <p>Chargement...</p>
        </div>
        <div class="object-container" v-else>
            <h1 class="object-text">{{ object.title }}</h1>
            <div class="object-img-container">
                <img v-if="object.photo_url" :src="'http://localhost:3000/' + object.photo_url" alt="Object photo" />
            </div>
            <h3 class="object-text">{{ object.type }}</h3>
            <p class="object-text">{{ object.description }}</p>
            <p class="object-text">{{ object.contact_info }}</p>
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

<style lang="scss" scoped>
.object-container{
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    gap: 16px;

    h1{
        font-size: 32px;
        font-weight: 700;
    }
    h3{
        font-size: 12px;
        font-weight: 300;

        ::first-letter{
            text-transform: uppercase;
        }
    }
    p{
        font-size: 16px;
    }
}
.object-img-container{
    width: 100%;
    
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block; 
    }
}
.object-text{
    flex: 1; 
}
</style>