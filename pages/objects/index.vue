<template>
    <Button
        class="logout"
        text="Logout"
        textColor="#fff"
        textSize="16px"
        path="/logout"
    />
    <div class="user-objects-container">
        <div v-if="auth.user">
            <h1>Objects</h1>
            <h3 class="username">
                {{ auth.user.name }}
            </h3>
        </div>
        <div>
            <div v-if="error">
                <p>Une erreur est survenue: {{ error.message }}</p>
            </div>
            
            <div v-else-if="!userObjects">
                <p>Chargement...</p>
            </div>
            
            <ul class="objects-list-container" v-else>
                <li class="objects-list" v-for="userObject in userObjects" :key="userObject._id">
                    <!-- {{ userObject.title }} -->
                    <!-- <img :src="'http://localhost:3000/' + userObject.photo_url" alt=""> -->
                    <div class="object-img-container">
                        <img :src="'http://localhost:3000/' + userObject.photo_url" alt="" class="object-img">
                    </div>
                    <div class="object">
                        <NuxtLink :to="`/objects/${userObject._id}`">
                            <div class="object-text">
                                <h3>{{ userObject.type }}</h3>
                                <h2>{{ userObject.title }}</h2>
                                <p>{{ userObject.description }}</p>
                            </div>
                        </NuxtLink>
                        <div class="buttons-container">
                            <Button
                                text="Edit"
                                textColor="#fff"
                                textSize="12px"
                                :path="`/objects/edit/${userObject._id}`"
                            />
                            <Button
                                @click="handleDelete(userObject._id)"
                                text="Delete"
                                textColor="#fff"
                                textSize="12px"
                                path=""
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
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
const userObjects = ref<Object[] | null>(null)
const userObjectsError = ref<any>(null)

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


const { data, error: userError } = await useFetch<Object[]>(`${config.public.apiBaseUrl}/user/objects`, {
    method: 'GET',
    server: true,
    credentials: 'include',
    headers
});
userObjects.value = data.value || null
userObjectsError.value = userError.value

console.log("Mes objects de mon user: ", userObjects.value);
console.log("Mes objects de mon user error: ", userObjectsError.value);

const error = computed(() => userError.value)

console.log("Mon user logged", auth.user)
</script>

<style lang="scss" scoped>
.navbar-container{
    position: fixed;
    top: 90%;
    left: 0;

    padding: 0rem 1rem;

    width: 100%;
}
.user-objects-container{
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.objects-list-container{
    display: flex;
    flex-direction: column;
    gap: 32px;
    text-decoration: none;
    margin-bottom: 96px;
}
.objects-list{
    display: flex;
    gap: 8px;
    align-items: stretch; 
    
    a{
        text-decoration: none;
    }
}
.object{
    flex: 1; 
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.object-img-container{
    flex: 0 0 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.object-img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block; 
}
.object-text{
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-decoration: none;

    h2{
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
.buttons-container{
    display: flex;
    gap: 16px
}
.username::first-letter{
    text-transform: uppercase;
}
.username{
    font-size: 24px;
    font-weight: 300;
}
.logout{
    align-self: end;
}
</style>
