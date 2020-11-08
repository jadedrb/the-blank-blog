import { combineReducers } from 'redux';

import exampleReducer from './exampleReducer';

const rootReducer = combineReducers({
    data: exampleReducer                                  // The second property name in mapStateToProps    (state.posts.loading)
})

export default rootReducer;