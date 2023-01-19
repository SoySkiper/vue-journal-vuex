import AboutView from "@/views/AboutView.vue"
import { shallowMount } from "@vue/test-utils"

describe('Pruebas en el About View', () => {

    test('debe de renderizar el componente correctamente', () => {
        const wrapper = shallowMount(AboutView)
        expect(wrapper.html()).toMatchSnapshot()
    })
})