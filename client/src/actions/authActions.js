import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import setErrors from './errorActions';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('http://localhost:4400/users', userData)
        .then((res) => {
            history.push('/login');
        })
        .catch((e) => {
            console.log(e.response.data);
            dispatch(setErrors(e.response.data));
        });
};

export const loginUser = (userData) => dispatch => {
    axios
        .post('http://localhost:4400/users/login', userData)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('noteToken', token);
            setAuthToken(token);
            let decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch((e) => {
            console.log(e.response.data);
            dispatch(setErrors(e.response.data));
        });
};

export const setCurrentUser = decoded => {
    return {
        type: 'SET_CURRENT_USER',
        user: decoded
    }
};

export const logoutUser = () => dispatch => {
    axios
        .delete('http://localhost:4400/users/me/token')
        .then((res) => {
            localStorage.removeItem('noteToken');
            setAuthToken(false);
            dispatch(setCurrentUser({}));
        })
        .catch((e) => {
            console.log(e.response.data);
        });
};