import HomeView from "@/views/HomeView.vue"
import { shallowMount } from "@vue/test-utils"

describe('Pruebas en el Home View', () => {

    test('debe de renderizar el componente correctamente', () => {
        const wrapper = shallowMount(HomeView)
        expect(wrapper.html()).toMatchSnapshot()
    })
})