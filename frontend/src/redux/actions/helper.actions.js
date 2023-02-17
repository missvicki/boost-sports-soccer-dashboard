export const createAction = (type, payload = null) => ({ type, payload: { ...payload } });
