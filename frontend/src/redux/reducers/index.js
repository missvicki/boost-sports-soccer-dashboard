import { combineReducers } from 'redux';
import resultsReducer from './results.reducer';
import performancesReducer from './performances.reducer';

const reducerStates = {
    resultsState: resultsReducer,
    performanceState: performancesReducer,
}
const rootReducer = combineReducers({ ...reducerStates })

export default rootReducer