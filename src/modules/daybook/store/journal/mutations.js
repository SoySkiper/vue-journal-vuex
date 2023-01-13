// export const myAction = ( state ) => {
    // 
// }
//import state from "./state"

export const setEntries = ( state, entries ) => {

    state.entries = [ ...state.entries, ...entries ] 
    state.isLoading = false
}

export const updateEntry = ( state, entry) => {

    const idx = state.entries.map( e => e.id).indexOf( entry.id )
    state.entries[idx] = entry
    
}

export const addEntry = ( state, entry ) => {

    // state -> entries  -> la nueva entrada  debe de ser la primera
    state.entries = [ entry, ...state.entries]
}

export const deleteEntry = ( state, id ) => {
    // remover del state.entries borrar la entrada por ese ID 
    state.entries = state.entries.filter( entry => entry.id !== id)
}