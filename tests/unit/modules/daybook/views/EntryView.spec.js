import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex'
import journal from "@/modules/daybook/store/journal"
import { journalState } from '../../../mock-data/test-journal-state';
import EntryView from '@/modules/daybook/views/EntryView.vue';

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Pruebas en el EntryView', () =>{

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-NOclo-5q93c5opgJjKw'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('debe de sacar al usuario porque el id no existe', () => {
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
    });

    test('debe de mostrar el componente correctamente', () => { 
        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()
    });
})