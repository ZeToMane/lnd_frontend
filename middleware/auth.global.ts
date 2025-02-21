// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // get your pinia store
    const auth = useAuthStore()

    // If user is not logged in and we are not already on /login or /register...
    // (You may adapt this condition so that you allow /onboarding as well.)
    if (!auth.user && !['/login', '/register', '/onboarding'].includes(to.path)) {
        return navigateTo('/onboarding')
    }
    if (auth.user && ['/login', '/register', '/onboarding'].includes(to.path)) {
        return navigateTo('/')
    }
})
