import config from '../config.js';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getAuthToken(){
        return localStorage.getItem(config.TOKEN_KEY)
    },
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    hasAuthToken(){
        return !!this.getAuthToken();
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY);
    },
}