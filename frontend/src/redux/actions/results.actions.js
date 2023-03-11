import { FETCH_STANDINGS_REQUEST, FETCH_STANDINGS_FAILURE, FETCH_STANDINGS_SUCCESS } from '../types';
import { createAction } from './helper.actions';
import ApiHandler from '../../api/AxiosApi';


export const resultsActions = (gender, year, week) => async (dispatch) => {
    dispatch(createAction(FETCH_STANDINGS_REQUEST))
    try {
        let response = ''
        if (gender && year && week) {
            response = await ApiHandler.apiRequest('GET', 'standings', '', `?gender=${gender}&year=${year}&week=${week}`, false)
        }
        else {
            response = await ApiHandler.apiRequest('GET', 'standings', '', '', false)
        }
        let data = response.data

        if (response.status == 200){
            data = data.replace(/NaN/g, "null")
            data = JSON.parse(data);
            return dispatch(createAction(FETCH_STANDINGS_SUCCESS, { data: data }))
        }else{
            return dispatch(createAction(FETCH_STANDINGS_FAILURE, data))
        }
        
    } catch (error) {
        dispatch(createAction(FETCH_STANDINGS_FAILURE, { error: error.message }))
    }
};
