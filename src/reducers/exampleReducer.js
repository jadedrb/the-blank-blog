import { ADD_DATA, DATA_RETRIEVED, DELETE_DATA, LOADING_DATA, SAVE_DATA, UPDATE_DATA } from "../actions/exampleActions";

export const initialState = {
    loading: 0,
    comments: [],
    posts: [],
    current: {},
    titleOfBlog: []
}

export default function exampleReducer(state = initialState, action) {
    switch(action.type) {
        case SAVE_DATA:
            let [data, property] = action.payload
            return {
                ...state, 
                [property] : data 
            }
        case ADD_DATA:
            let [data1, property1] = action.payload
            return {
                ...state, 
                [property1]: [...state[property1], data1]
            }
        case DELETE_DATA:
            let [property2, id] = action.payload
            return {
                ...state,
                [property2]: state[property2].filter(d => d.id !== id)
            }
        case UPDATE_DATA: 
            let [data2, property3, id1] = action.payload
            let newObj = [...state[property3]]
            let arrIndex = newObj.findIndex(item => Number(item.id) === Number(id1))
            Object.keys(data2).forEach(key => newObj[arrIndex][key] = data2[key])
            return {
                ...state,
                [property3]: newObj
            }
        case LOADING_DATA:
            return {
                ...state, 
                loading: state.loading + 1
            }
        case DATA_RETRIEVED:
            return {
                ...state, 
                loading: state.loading - 1
            }
        default:
            return state;
    }
}