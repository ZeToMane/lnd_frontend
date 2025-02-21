import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()
    
    // Call fetchUser to refresh auth state on app startup
    await authStore.fetchUser()
    console.log("plugin is called", authStore.user)
})