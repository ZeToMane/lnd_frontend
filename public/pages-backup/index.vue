<template>
<div>
    <h1>Liste d'objets</h1>
    
    <div v-if="error">
        <p>Une erreur est survenue: {{ error.message }}</p>
    </div>
    
    <div v-else-if="!objects">
        <p>Chargement...</p>
    </div>
    
    <ul v-else>
        <li v-for="object in objects" :key="object._id">
            {{ object.title }}
            <!-- <img :src="'http://localhost:3000/' + object.photo_url" alt=""> -->
        </li>
    </ul>
</div>
<div>
    <ul v-if="auth.user">
        <li>
            {{ auth.user.userId }}
        </li>
    </ul>
    <div>
        <h1>Liste d'objets User</h1>
        
        <div v-if="error">
            <p>Une erreur est survenue: {{ error.message }}</p>
        </div>
        
        <div v-else-if="!userObjects">
            <p>Chargement...</p>
        </div>
        
        <ul v-else>
            <li v-for="userObject in userObjects" :key="userObject._id">
                <!-- {{ userObject.title }} -->
                <!-- <img :src="'http://localhost:3000/' + userObject.photo_url" alt=""> -->
                <NuxtLink :to="`/objects/${userObject._id}`">
                    {{ userObject.title }}
                </NuxtLink>
                <button @click="handleDelete(userObject._id)">Delete</button>
                <NuxtLink :to="`/objects/edit/${userObject._id}`">
                    Edit
                </NuxtLink>
            </li>
        </ul>
    </div>
</div>
<div style="display: flex; flex-direction: column;">
    <NuxtLink to="/create" class="">create</NuxtLink>
    <NuxtLink to="/login" class="">login</NuxtLink>
    <NuxtLink to="/register" class="">register</NuxtLink>
    <NuxtLink to="/logout" class="">logout</NuxtLink>
</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type { User, Object } from '~/assets/types'

const router = useRouter()
const config = useRuntimeConfig();
const auth = useAuthStore()
const headers = useRequestHeaders(['cookie']);

// Récupération des objets depuis votre API en appelant la route /objects sur le serveur
const { data: objects, error: objectsError } = await useFetch<Object[]>(`${config.public.apiBaseUrl}/objects`, {
    server: true // Assure que la requête est effectuée côté serveur
});

const userObjects = ref<Object[] | null>(null)
const userObjectsError = ref<any>(null)

if(auth.user){
    const { data, error } = await useFetch<Object[]>(`${config.public.apiBaseUrl}/user/objects`, {
        method: 'GET',
        server: true,
        credentials: 'include',
        headers
    });
    userObjects.value = data.value || null
    userObjectsError.value = error.value

    console.log("Mes objects de mon user: ", userObjects.value);
    console.log("Mes objects de mon user error: ", userObjectsError.value);
}

/* const { data: user, error: userError } = await useFetch<User>(`${config.public.apiBaseUrl}/auth/me`, {
    method: 'GET',
    credentials: 'include', // Ensures cookies are sent
    server: true,
    headers // Pass cookies automatically
}); */

const error = computed(() => objectsError.value /* || userError.value */)


/* const handleUser = async () => {
    //error.value = ''; // Reset error message

    try {
        const user = await useFetch(`${config.public.apiBaseUrl}/auth/me`, {
            method: 'GET',
            credentials: 'include', // Ensures cookies are sent
            headers // Pass cookies automatically
        });

        console.log("User authenticated:", user);
    } catch (err: any) {
        error.value = err.data?.message || "Une erreur est survenue lors de la connexion.";
        console.log(err);
    }
}; */

console.log("Ma data", objects)
console.log("Mon user logged", auth.user)

const handleDelete = async (id: string | undefined) => {
    const { error: deleteError } = await useFetch(`${config.public.apiBaseUrl}/user/objects/${id}`, {
        method: 'DELETE',
        server: true,
        credentials: 'include',
        headers
    })
    
    if (!deleteError.value) {
        const { data, error: fetchError } = await useFetch<Object[]>(`${config.public.apiBaseUrl}/user/objects`, {
            method: 'GET',
            credentials: 'include',
            headers
        })
        if (!fetchError.value) {
            userObjects.value = data.value || []
        }
    }
}

/* onMounted(() => {
    handleUser();
}); */
</script>

<style scoped>
/* Vos styles ici */
</style>
