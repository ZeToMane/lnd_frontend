<template>
    <div class="object-form-container">
        <h1>Create Object</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="type">Type:</label>
                <select id="type" v-model="type" required>
                    <option value="found">Found</option>
                    <option value="lost">Lost</option>
                </select>
            </div>
    
            <div>
                <label for="title">Title:</label>
                <input id="title" type="text" v-model="title" required />
            </div>
    
            <div>
                <label for="description">Description:</label>
                <textarea id="description" v-model="description"></textarea>
            </div>
    
            <div>
                <label for="photo">Photo:</label>
                <input id="photo" type="file" accept="image/*" @change="handleFileChange" required />
                </div>
    
            <div>
                <label for="contact_info">Contact Info:</label>
                <input id="contact_info" type="text" v-model="contact_info" required />
            </div>
    
            <div>
                <label for="latitude">Latitude:</label>
                <input id="latitude" type="number" step="any" v-model="latitude" required />
            </div>
    
            <div>
                <label for="longitude">Longitude:</label>
                <input id="longitude" type="number" step="any" v-model="longitude" required />
            </div>
    
            <button type="submit">Update Object</button>
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
</script>

<style scoped>
.object-form-container {
max-width: 600px;
margin: 0 auto;
padding: 2rem;
}
.error {
margin-top: 1rem;
color: red;
}
</style>
