import { FETCH_STANDINGS_REQUEST, FETCH_STANDINGS_FAILURE, FETCH_STANDINGS_SUCCESS } from '../types';
import { createAction } from './helper.actions';
import ApiHandler from '../../api/AxiosApi';


export const resultsActions = () => async (dispatch) => {
    dispatch(createAction(FETCH_STANDINGS_REQUEST))
    try {
        const response = await ApiHandler.apiRequest('GET', 'standings', undefined, false)
        let data = response.data
        data = data.replace(/NaN/g, "null")
        data = JSON.parse(data);

        if (![200, 201].includes(response.status)) {
            return dispatch(createAction(FETCH_STANDINGS_FAILURE, { error: data }))
        }
        return dispatch(createAction(FETCH_STANDINGS_SUCCESS, { data: data }))
    } catch (error) {
        dispatch(createAction(FETCH_STANDINGS_FAILURE, { error: error.message }))
    }
};
