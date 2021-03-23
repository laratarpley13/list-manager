//import config from "../config";
import TokenService from "./token-service";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    postUser(user) {
        return fetch(`https://mighty-taiga-07413.herokuapp.com/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    signinUser(user) {
        return fetch(`https://mighty-taiga-07413.herokuapp.com/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
    getUser() {
        return fetch(`https://mighty-taiga-07413.herokuapp.com/api/users`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.hasAuthToken}`
            },
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        )
    }
};