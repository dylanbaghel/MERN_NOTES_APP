import { isEmpty } from './../validation/isEmpty';

const authReducerDefaultState = {
    isAuthenticated: false,
    user: {}
};

const authReducer = (state = authReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            }
        default:
            return state;
    }
};

export default authReducer;