import React from 'react';
import UserForm from './UserForm';
import { registerUser } from './../actions/authActions';
import { connect } from 'react-redux';

const SignUp = (props) => {
    const isAuthenticated = props.auth.isAuthenticated;
    if (isAuthenticated) {
        props.history.push('/');
        return null;
    }
    return (
        <div>
            <UserForm
                formName="Sign Up"
                onSubmit={(userData) => {
                    props.dispatch(registerUser(userData, props.history));
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
};

export default connect(mapStateToProps)(SignUp);