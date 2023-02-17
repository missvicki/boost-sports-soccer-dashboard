import { combineReducers } from 'redux';
import resultsReducer from './results.reducer';

const reducerStates = {
    resultsState: resultsReducer,
}
const rootReducer = combineReducers({ ...reducerStates })

export default rootReducer