import axios from 'axios';

class AxiosAPi{
    constructor(){
        this._host = process.env.REACT_APP_API_URL;
        this._apiVersion = process.env.REACT_APP_MAIN_VERSION || 'api/';
    }

    createInstance = (baseURL) => {
        const axiosInstance = axios.create({
            baseURL,
            headers: {'Content-Type': 'application/json'},
          });
        
        axiosInstance.interceptors.response.use(
          (response) => response,
          (error) => {
            if(error.response){
                if(error.response.status === 403) {
                    window.location.href = `${window.location.origin}/`;
                }
                return error.response 
            } else {
                return Promise.reject(error)
            }
          }
          );
          return axiosInstance;
    }

    get host() {
        return this._host;
      }
    
    /**
     * @param {method} method - method (GET, POST, UPDATE, DELETE)
     * @param {endpoint} endpoint for example "/login", "/createUser", "deleteForms"
     * @param {queries} queries for example "?name=James&age=2" or "?number=234"
     * @param {options} options used by axios request 
     *      { 
     *          headers: {
     *              token: "<authToken>",
     *              'Content-Type': 'application/json',
     *              ...other headers,
     *              }
     *      }
     * */ 
    async apiRequest(method='GET', endpoint, data=null, queries='', options={}){
        const baseURL = `${this.host}/${this._apiVersion}/`;
        const axiosInstance = this.createInstance(baseURL);
        let url = "";
        url = endpoint ? `${endpoint}` : url;
        url = queries ? `${url}/${queries}`: url;

        const configs = {
            method,
            url,
            data,
            ...options
        };

        return await axiosInstance(configs);
    }
}

const ApiHandler = new AxiosAPi();

export default ApiHandler;
