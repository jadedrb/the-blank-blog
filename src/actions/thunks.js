import { addData, dataRetrieved, loadingData, saveData, deleteData, updateData } from './exampleActions'
import { API } from '../config/endpoints'
import axios from 'axios';

// NOTE 1 : necessary if proxy is not working properly (which it isn't)
const proxy = route => route[0] === '/' ? API + route : route

export const readAllFrom = (route, property, cleanup) => async (dispatch) => {
    dispatch(loadingData())
    try {
        route = proxy(route) // see NOTE 1
        let data = await axios.get(route)
        // NOTE 2 : cleanup digs into the data and returns only the needed (nested) object
        if (typeof cleanup === 'function') data = cleanup(data) 
        dispatch(saveData(data, property))
        return data
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}

export const createOneFor = (route, data, property, cleanup) => async (dispatch) => {
    dispatch(loadingData())
    try { 
        route = proxy(route)
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
        route = proxy(route)
        await axios.delete(route).then(() => console.log('delete')).catch(err => console.log('error')) 
        dispatch(deleteData(property, id))
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}

export const updateOneByIdFor = (route, data, property, id) => async (dispatch) => {
    dispatch(loadingData())
    try { 
        route = proxy(route)
        await axios.put(route, data).then(() => console.log('yeet')).catch(err => console.log('error')) 
        dispatch(updateData(data, property, id))
    }
    catch (err) { console.log(err) }
    finally { dispatch(dataRetrieved()) }
}
