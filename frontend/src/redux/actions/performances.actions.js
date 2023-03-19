import { FETCH_PERFORMANCES_REQUEST, FETCH_PERFORMANCES_FAILURE, FETCH_PERFORMANCES_SUCCESS } from '../types';
import { createAction } from './helper.actions';
import ApiHandler from '../../api/AxiosApi';


export const performancesActions = (gender, year, team) => async (dispatch) => {
    dispatch(createAction(FETCH_PERFORMANCES_REQUEST))
    try {
        let response = ''
        if (gender && year && team) {
            response = await ApiHandler.apiRequest('GET', 'team-performance', '', `?gender=${gender}&year=${year}&team=${team}`, false)
        }
        else {
            response = await ApiHandler.apiRequest('GET', 'team-performance', '', '', false)
        }
        let data = response.data
        console.log(response.status)
        return dispatch(createAction(FETCH_PERFORMANCES_SUCCESS, { data: data.data}))
        
    } catch (error) {
        dispatch(createAction(FETCH_PERFORMANCES_FAILURE, { error: error.message }))
    }
};
