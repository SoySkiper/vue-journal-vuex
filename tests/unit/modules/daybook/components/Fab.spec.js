import { shallowMount } from "@vue/test-utils"
import FabVue from "@/modules/daybook/components/Fab.vue"

describe('Pruebas en el FAB component', () => {

    
    test('debe de mostrar el icono por defecto', () => {
        const wrapper = shallowMount(FabVue)
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-plus')).toBeTruthy()
        // fa-plus
    })

    test('debe de mostrar el icono por argumentos: fa-circle', () => {
        const wrapper = shallowMount(FabVue, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-circle')).toBeTruthy()

        // fa-circle
    })
    
    test('debe de emitir el evento on:click cuando se hace click', () => {
        // wrapper.emitted('onclick')
        const wrapper = shallowMount( FabVue )

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })

})