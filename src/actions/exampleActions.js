export const SAVE_DATA = 'SAVE_DATA';
export const saveData = (data, property) => ({
    type: SAVE_DATA,
    payload: [data, property]
})

export const ADD_DATA = 'ADD_DATA';
export const addData = (data, property) => ({
    type: ADD_DATA,
    payload: [data, property]
})

export const DELETE_DATA = 'DELETE_DATA';
export const deleteData = (property, id) => ({
    type: DELETE_DATA,
    payload: [property, id]
})

export const UPDATE_DATA = 'UPDATE_DATA';
export const updateData = (data, property, id) => ({
    type: UPDATE_DATA,
    payload: [data, property, id]
})

export const LOADING_DATA = 'LOADING_DATA';
export const loadingData = () => ({ type: LOADING_DATA })

export const DATA_RETRIEVED = 'DATA_RETRIEVED';
export const dataRetrieved = () => ({ type: DATA_RETRIEVED })