// tests/BackButton.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

const backSpy = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: () => ({
        back: backSpy
    })
}))

import BackButton from '../components/BackButton.vue'

describe('BackButton.vue', () => {
    it('renders the button and responds to click', async () => {
        const wrapper = mount(BackButton)
        // Check that the button renders with the expected text
        expect(wrapper.text()).toContain('Retour')
        
        // Simulate a click and (if applicable) verify that the router's back method is called.
        // For example, if you’re using a spy on the router:
        await wrapper.find('button').trigger('click')
        expect(backSpy).toHaveBeenCalled()
    })
})
