import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../../../../tests/unit/mock-data/test-journal-state";

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {
    // Básicas 
    test('este es el estado inicial, debe de tener este state ', () => {
        
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy();
        expect( entries ).toEqual( journalState.entries );
    });

    // Mutations

    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        store.commit('journal/setEntries', journalState.entries)

        expect( store.state.journal.entries.length ).toBe(2);
        expect( store.state.journal.isLoading ).toBeFalsy();
    });

    test('mutation: updateEntry', () => {
        const store = createVuexStore( journalState )
        const updateEntry = {
            id: "-NM-cOeka0Y5It_BaoAr",
            date: 1673974025496,
            text: "Hola mundo desde pruebas"
        }

        store.commit('journal/updateEntry', updateEntry)

        const storeEntries = store.state.journal.entries;

        expect( storeEntries.length ).toBe(2);        
        expect( 
            storeEntries.find( e => e.id === updateEntry.id )
        ).toEqual( updateEntry );
    })

    test('mutation: addEntry deteleEntry', () => {
        const store = createVuexStore( journalState )
        const newEntry = {
            id: "ABC-123",
            text: "Hola mundo"
        }

        store.commit('journal/addEntry', newEntry)
        const storeEntries = store.state.journal.entries;

        expect( storeEntries.length ).toBe(3);        
        expect( 
            storeEntries.find( e => e.id === newEntry.id )
        ).toEqual( newEntry );

        store.commit('journal/deleteEntry', newEntry.id)
        expect( store.state.journal.entries.length ).toBe(2);        
        expect( 
            store.state.journal.entries.find( e => e.id === newEntry.id )
        ).toBeFalsy();
    
    });
})