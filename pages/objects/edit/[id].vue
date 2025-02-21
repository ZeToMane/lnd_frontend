<template>
    <div>
        <BackButton/>
    </div>
    <div class="object-form-container">
        <h1>Edit Object</h1>
        <form class="object-form" @submit.prevent="handleSubmit">
            <div>
                <label for="type">Type:</label>
                <select id="type" v-model="type">
                    <option value="found">Found</option>
                    <option value="lost">Lost</option>
                </select>
            </div>
    
            <div>
                <label for="title">Title:</label>
                <input id="title" type="text" v-model="title" placeholder="e.g. Portefeuille" />
            </div>
    
            <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="description" placeholder="e.g. Portefeuille noir en cuir"></textarea>
            </div>
    
            <div>
                <label for="photo">Photo:</label>
                <input id="photo" type="file" accept="image/*" @change="handleFileChange"/>
                </div>
    
            <div>
                <label for="contact_info">Contact Information:</label>
                <input id="contact_info" type="text" v-model="contact_info" placeholder="e.g. @instagram"/>
            </div>
    
            <label>Location</label>
            <select id="type" v-model="location_type">
                <option value="map">Map</option>
                <option value="gps">GPS</option>
            </select>
            <client-only>
                <div v-if="location_type == 'map'" class="map-select">
                    <MapSelect @map-clicked="setLocation"/>
                </div>
                <div v-else-if="location_type === 'gps'" class="gps-select">
                    <!-- A button to trigger the geolocation lookup -->
                    <button type="button" @click="getUserLocation">
                        Use my current location
                    </button>
                    <!-- Optionally, show the fetched coordinates -->
                    <div v-if="latitude && longitude">
                        <p>Your location: {{ latitude }}, {{ longitude }}</p>
                    </div>
                </div>
            </client-only>
    
            <button type="submit">Edit Object</button>
        </form>
        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Object } from '~/assets/types'

    const type = ref('found')
    const title = ref('')
    const description = ref('')
    const contact_info = ref('')
    const latitude = ref<number | null>(null)
    const longitude = ref<number | null>(null)
    const photoFile = ref<File | null>(null)
    const error = ref('')

    const location_type = ref('map')

    const route = useRoute()
    const router = useRouter()
    const config = useRuntimeConfig()
    const headers = useRequestHeaders(['cookie']);

    /* const { data: object } = await useFetch<Object>(`${config.public.apiBaseUrl}/objects/${route.params.id}`, {
        method: 'GET',
        server: true,        
        credentials: 'include',
        headers
    }) */

    const { data: object } = await useFetch<Object>(`${config.public.apiBaseUrl}/objects/${route.params.id}`, {
        method: 'GET',
        server: true,        
        credentials: 'include',
        headers
    })
    type.value = object.value?.type || 'found'
    title.value = object.value?.title || ''
    description.value = object.value?.description || ''
    contact_info.value = object.value?.contact_info || ''
    latitude.value = object.value?.latitude || null
    longitude.value = object.value?.longitude || null
    

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.files && target.files.length > 0) {
            photoFile.value = target.files[0]
        }
    }

    const handleSubmit = async () => {
        error.value = ''

        // Create FormData object and append fields
        const formData = new FormData()
        formData.append('type', type.value)
        formData.append('title', title.value)
        formData.append('description', description.value)
        formData.append('contact_info', contact_info.value)
        formData.append('latitude', latitude.value?.toString() || '')
        formData.append('longitude', longitude.value?.toString() || '')
        if (photoFile.value) {
            formData.append('photo', photoFile.value)
        }

        try {
            // Use useFetch or another HTTP library to POST formData
            // Notice: do not set Content-Type header manually!
            const { error: uploadError } = await useFetch(`${config.public.apiBaseUrl}/user/objects/update/${route.params.id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
                headers
            })

            if (uploadError.value) {
                throw uploadError.value
            }

            // Redirect after successful creation
            router.push('/')
        } catch (err: any) {
            error.value = err.message || "An error occurred while creating the object."
        }
    }

    function setLocation(location: any){
        latitude.value = location.lat;
        longitude.value = location.lng;

        console.log("lat and lng", latitude.value, longitude.value)
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude.value = position.coords.latitude
                longitude.value = position.coords.longitude
                console.log('User GPS:', latitude.value, longitude.value)
            },
            (err) => {
                console.error('Error getting location', err)
                error.value = 'Error getting GPS location: ' + err.message
            }
            )
        } else {
            error.value = 'Geolocation is not supported by your browser.'
        }
    }
</script>

<style lang="scss" scoped>
.object-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    

    max-width: 600px;
    height: fit-content;

    .object-form{
        display: flex;
        flex-direction: column;
        gap: 16px
    }
    .object-form > div{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}
.object-form-container h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 32px;
}
.object-form-container form > div {
    margin-bottom: 1rem;
}
.object-form-container label {
    display: block;
    margin-bottom: 0.5rem;

    font-family: "Source Code Pro", serif;
    font-size: 16px;
    font-weight: 400;
}
.object-form-container input {
    width: 100%;
    padding: 0.5rem 1rem;

    border: 1px solid $secondary;
    border-radius: 100px;
}
.object-form-container select {
    width: 100%;
    padding: 0.5rem 1rem;

    border: 1px solid $secondary;
    border-radius: 100px;
}
.object-form-container textarea {
    width: 100%;
    height: 100px;
    padding: 0.5rem 1rem;

    border: 1px solid $secondary;
    border-radius: 32px;
}
.object-form-container input::placeholder {
    font-size: 12px;
    font-family: "Source Code Pro", serif;
    font-optical-sizing: auto;
    font-weight: 200;
    font-style: normal;
}
.object-form-container textarea::placeholder {
    font-size: 12px;
    font-family: "Source Code Pro", serif;
    font-optical-sizing: auto;
    font-weight: 200;
    font-style: normal;
}
.object-form-container button {
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
.map-select{
    width: 100%;
    height: 200px;
}
.error {
margin-top: 1rem;
color: red;
}
</style>
