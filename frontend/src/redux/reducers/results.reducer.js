import {
    FETCH_STANDINGS_REQUEST, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_FAILURE,
} from '../types';


const initialState = {
    loading: false,
    data: null,
    error: null
};

const resultsReducer = (state = { ...initialState }, actions) => {
    switch (actions.type) {
        case FETCH_STANDINGS_REQUEST:
            return { ...state, loading: true }
        case FETCH_STANDINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: actions.payload.data
            }
        case FETCH_STANDINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: actions.payload.error,
            }
        default:
            return { ...state }
    }
};

export default resultsReducer;

