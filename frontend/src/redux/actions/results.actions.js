import { FETCH_STANDINGS, FETCH_STANDINGS_FAILURE, FETCH_STANDINGS_SUCCESS } from '../types';
import { createAction } from './helper.actions';
import ApiHandler from '../../api/AxiosApi';


const resultsActions = (dispatch) => {
    const fetchResults = async () => {
        dispatch(createAction(FETCH_STANDINGS))
        try {
            const response = await ApiHandler.apiRequest('GET', 'standings', undefined, false)
            if (![200, 201].includes(response.status)) {
                return dispatch(createAction(FETCH_STANDINGS_FAILURE, { error: response.data }))
            }
            return dispatch(createAction(FETCH_STANDINGS_SUCCESS, { data: response.data }))
        } catch (error) {
            dispatch(createAction(FETCH_STANDINGS_FAILURE, { error: error.message }))
        }
    };

    return {
        fetchResults
    }
};

export default resultsActions;