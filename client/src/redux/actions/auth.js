import axios from 'axios'
import * as type from '../types';

const login_success = (data) => {
    localStorage.setItem('token', data.token);
    return {
        type: type.LOGIN_SUCCESS,
        payload: data.user
    }
}

const login_error = (err) => {
    console.log(err)
    return {
        type: type.LOGIN_ERROR
    }
}

const login_fetch = () => {
    return {
        type: type.LOGIN_FETCH
    }
}

export const login = (email, password) => dispatch => {
    dispatch(login_fetch())
    axios.post('/api/auth/login', { email, password })
        .then(resp => dispatch(login_success(resp.data)))
        .catch(err => dispatch(login_error(err)))
}