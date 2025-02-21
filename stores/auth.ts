// stores/auth.ts
import { defineStore } from 'pinia'
import type { User } from '~/assets/types'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),
    actions: {
        // Call this to update the state if you want to refresh on app startup
        async fetchUser() {
            const config = useRuntimeConfig()
            const headers = useRequestHeaders(['cookie']);

            const { data } = await useFetch<User>(`${config.public.apiBaseUrl}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers
            })
            this.user = data.value || null
        },

        async login(email: string, password: string) {
            const config = useRuntimeConfig()
            // Make your login API call
            const { error } = await useFetch(`${config.public.apiBaseUrl}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: { email, password },
            })
            if (error.value) {
                // Throw an error so that the calling function catches it.
                throw new Error("Login failed")
            } else {
                // After a successful login, update the user state
                await this.fetchUser()
            }
        },

        async register(username: string, email: string, password: string) {
            const config = useRuntimeConfig()
            // Make your login API call
            const { error } = await useFetch(`${config.public.apiBaseUrl}/auth/register`, {
                method: 'POST',
                body: { username, email, password },
            })
            if (error.value) {
                // Throw an error so that the calling function catches it.
                throw new Error("Register failed")
            } else {
                // After a successful login, update the user state
                await this.login(email, password)
                await this.fetchUser()
            }
        },

        async logout() {
            const config = useRuntimeConfig()
            await useFetch(`${config.public.apiBaseUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            })
            // Clear the user state
            this.user = null
        },
    },
})
