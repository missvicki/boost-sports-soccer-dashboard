import {
    FETCH_PERFORMANCES_REQUEST, FETCH_PERFORMANCES_SUCCESS, FETCH_PERFORMANCES_FAILURE,
} from '../types';


const initialState = {
    loading: false,
    data: null,
    error: null
};

const performancessReducer = (state = { ...initialState }, actions) => {
    switch (actions.type) {
        case FETCH_PERFORMANCES_REQUEST:
            return { ...state, loading: true }
        case FETCH_PERFORMANCES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: actions.payload.data,
                error: null
            }
        case FETCH_PERFORMANCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: actions.payload.message,
            }
        default:
            return { ...state }
    }
};

export default performancessReducer;

