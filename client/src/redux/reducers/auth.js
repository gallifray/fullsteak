import * as types from '../types';

var initial_state = {
    user: null,
    loading: false
}

export default function auth(state = initial_state, action) {
    switch (action.type) {
        case 'LOGIN_FETCH': {
            return {
                ...state,
                loading: true
            }
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        }
        default:
            return state
    }
}
