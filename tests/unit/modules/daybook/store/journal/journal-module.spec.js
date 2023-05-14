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

    //=================== Básicas ===================
    test('este es el estado inicial, debe de tener este state ', () => {
        
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy();
        expect( entries ).toEqual( journalState.entries );
    });

    //=================== Mutations ===================

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

    //=================== Getters ===================

    test('getters: getEntriesByTerm, getEntryById', () => {
       const store = createVuexStore( journalState )
       const [entry1, entry2] = journalState.entries;

       expect( store.getters['journal/getEntriesByTerm']('') ).toEqual( journalState.entries );
       expect( store.getters['journal/getEntriesByTerm']('pomme').length ).toBe(1);

       expect( store.getters['journal/getEntriesByTerm']('pomme') ).toEqual([ entry2 ]);
       
       expect( store.getters['journal/getEntryById']('-NM-cOeka0Y5It_BaoAr') ).toEqual( entry1 );
    }); 

    //=================== Actions ===================

    test('actions: loadEntries', async() => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        
        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2);
    });

    test('actions: updateEntry', async() => {
        const store = createVuexStore( journalState )

        const updateEntry = {
            id: "-NM-cOeka0Y5It_BaoAr",
            date: 1673974025496,
            text: "Hola mundo desde mock data",
            otroCampo: true,
            otroMas: { a: 2 }
        }
        
        await store.dispatch('journal/updateEntry', updateEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( 
            store.state.journal.entries.find( e => e.id === updateEntry.id ) 
        ).toEqual({
            id: "-NM-cOeka0Y5It_BaoAr",
            date: 1673974025496,
            text: "Hola mundo desde mock data",
        });
    });

    test('actions: createEntry, deleteEntry', async() => {
        //createStore
        const store = createVuexStore( journalState )
        
        const newEntry = { date: 1673974025496, text: "Esta es una nueva entrada para las pruebas" }

        //dispach  de la accion createEntry
        await store.dispatch('journal/createEntry', newEntry)

        //Obtener el id de la nueva entrada

        const newEntryId = store.state.journal.entries.find( e => e.text === newEntry.text ).id
        
        // el ID debe de ser un string
        expect( typeof newEntryId ).toBe('string');


        //la nueva entrada debe de existir en el state.journal.entries...
        expect( store.state.journal.entries.find( e => e.id === newEntryId ) ).toBeTruthy();

        // #Segunda Parte

        //dispach de la accion deleteEntry
        await store.dispatch('journal/deleteEntry', newEntryId)

        //la nueva entrada NO debe de existir en el state.journal.entries...
        expect( store.state.journal.entries.find( e => e.id === newEntryId ) ).toBeFalsy();
    });
})