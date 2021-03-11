import config from '../config.js';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    hasAuthToken(){
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY);
    },
}