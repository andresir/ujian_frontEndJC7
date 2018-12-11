import { 
    USER_REG_SUCCESS,
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from '../actions/types';

const INITIAL_STATE = { username: '', email: '', error: '', loading: false, cookie: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_REG_SUCCESS :
            return { ...INITIAL_STATE, username: action.payload, cookie: true };
        case USER_LOGIN_SUCCESS :
            return { ...INITIAL_STATE, username: action.payload.username, email: action.payload.email, cookie: true };
        case AUTH_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error: action.payload, cookie: true }
        case AUTH_LOADING :
            return { ...state, loading: true }
        case LOGOUT :
            return { ...INITIAL_STATE, cookie: true };
        case COOKIE_CHECKED :
            return { ...INITIAL_STATE, cookie: true }
        default :
            return state;
    }
}