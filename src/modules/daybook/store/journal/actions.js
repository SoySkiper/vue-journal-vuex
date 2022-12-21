// export const myAction = async ({ commit }) => {
    // 
// }

import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {
    
    const { data } = await journalApi.get('/entries.json')
    const entries = []
    for( let id of Object.keys( data )) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit( 'setEntries', entries )
}

export const updateEntry = async (/*{ commit }*/) => { // entry debe de ser un parámetro

    // extraer solo lo que necesitam

    // await journalApi.put(PATH  .json, dataToSave )

    // Commit de una mutación update 
    
}

export const createEntry = async (/*{ commit }*/) => {
    
}