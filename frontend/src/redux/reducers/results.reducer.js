import {
    FETCH_STANDINGS, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_FAILURE,
} from '../types';


const initialState = {
    standingsLoading: false,
    standingsFailure: false,
    errorMessage: '',
    standings: [],
    fetchStandingsSuccess: false,
    fetchError: false
};

const resultsReducer = (state = { ...initialState }, actions) => {
    switch (actions.type) {
        case FETCH_STANDINGS:
            return { ...state, standingsLoading: true, fetchStandingsSuccess: false }
        case FETCH_STANDINGS_SUCCESS:
            const standings = actions.payload.data.data
            return {
                ...state,
                standingsLoading: true,
                standings: standings
            }
        case FETCH_STANDINGS_FAILURE:
            return {
                ...state,
                fetchStandingsSuccess: false,
                standingsLoading: false,
                standingsFailure: true,
                fetchError: true,
                errorMessage: 'Failed to fetch standings',
            }
        default:
            return { ...state }
    }
};

export default resultsReducer;

