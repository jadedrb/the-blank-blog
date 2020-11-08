import { addData, dataRetrieved, loadingData, saveData, deleteData, updateData } from './exampleActions'
import axios from 'axios';

export const readAllFrom = (route, property, cleanup) => async (dispatch) => {
        dispatch(loadingData())
    try {
        let data = await axios.get(route)
        if (typeof cleanup === 'function') data = cleanup(data) 
        console.log(data)
        dispatch(saveData(data, property))
        return data
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}

export const createOneFor = (route, data, property, cleanup) => async (dispatch) => {
    dispatch(loadingData())
    try { 
        data = await axios.post(route, data)
        if (typeof cleanup === 'function') data = cleanup(data) 
        dispatch(addData(data, property))
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}

export const deleteOneByIdFor = (route, property, id) => async (dispatch) => {
    dispatch(loadingData())
    try { 
        await axios.delete(route).then(() => console.log('delete')).catch(err => console.log('error')) 
        dispatch(deleteData(property, id))
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}

export const updateOneByIdFor = (route, data, property, id) => async (dispatch) => {
    dispatch(loadingData())
    try { 
        await axios.put(route, data).then(() => console.log('yeet')).catch(err => console.log('error')) 
        dispatch(updateData(data, property, id))
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}
