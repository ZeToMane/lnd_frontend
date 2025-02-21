<template>
    <client-only>
        <MapView :objects="objects" @marker-clicked="openMarkerModal"/>
    </client-only>

    <transition name="slide-up">
        <div v-if="showModal && selectedObject" class="modal object-container">
            <button class="cross-container" @click="hideModal()"><img class="cross-img" src="/cross.png" alt=""></button>
            <!-- <h2>{{ selectedObject.title }}</h2>
            <p>{{ selectedObject.description }}</p> -->
            <h1 class="object-text">{{ selectedObject.title }}</h1>
            <div class="object-img-container">
                <img v-if="selectedObject.photo_url" :src="'http://localhost:3000/' + selectedObject.photo_url" alt="Object photo" />
            </div>
            <h3 class="object-text">{{ selectedObject.type }}</h3>
            <p class="object-text">{{ selectedObject.description }}</p>
            <p class="object-text">{{ selectedObject.contact_info }}</p>
        </div>
    </transition>
    
    <div class="navbar-container">
        <Navbar/>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type { Object } from '~/assets/types'

const router = useRouter()
const config = useRuntimeConfig();
const auth = useAuthStore()
const headers = useRequestHeaders(['cookie']);

const showModal = ref(false)

function hideModal() {
    showModal.value = false
    selectedObject.value = null
}
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

const error = computed(() => objectsError.value /* || userError.value */)

console.log("Ma data", objects)
console.log("Mon user logged", auth.user)

const selectedObject = ref<Object | null>(null)

function openMarkerModal(obj: Object) {
    selectedObject.value = obj
    showModal.value = true
    console.log("Emitted the emit with this data: ", obj)
}
</script>

<style lang="scss" scoped>
.navbar-container{
    position: fixed;
    top: 90%;
    left: 0;

    padding: 0rem 1rem;

    width: 100%;
}

.object-container{
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    gap: 16px;
    overflow-y: scroll;

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
/* .object-text{
    flex: 1; 
}
 */
.modal {
    position: fixed;
    top: 100%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 1rem;
    z-index: 9999; 
    border: 1px solid #ccc;
    border-radius: 4px;
    transform: translateY(-100%);
}


.cross-container{
    display: flex;
    justify-content: center;

    background-color: #fff;
    border: 0;

    padding: 0;

    width: 30px;
    height: 30px;

    position: sticky;
    top: 0;
    left: 0;

    .cross-img{
        display: block;

        width: 100%;
        height: 100%;
    }
}

@keyframes slideIn {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }
}

@keyframes slideOut {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}

.slide-up-enter-active {
    animation: slideIn 0.5s ease forwards;
}

.slide-up-leave-active {
    animation: slideOut 0.5s ease forwards;
}
</style>
