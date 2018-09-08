import React from 'react';
import UserForm from './UserForm';
import { loginUser } from './../actions/authActions';
import { connect } from 'react-redux';

const LogIn = (props) => {
    const isAuthenticated = props.auth.isAuthenticated;
    if (isAuthenticated) {
        props.history.push('/');
        return null;
    }
    return(
        <div>
            <UserForm 
                formName="Log In"
                onSubmit={(userData) => {
                    props.dispatch(loginUser(userData));
                }}
                errors={props.errors}
            />
        </div>
    ); 
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(LogIn);