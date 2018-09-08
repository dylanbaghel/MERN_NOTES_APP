import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Dashboard = (props) => {
    const isAuthenticated = props.auth.isAuthenticated;
    const authDashboard = (
        <div>
            <h1 className="mb-5">Welcome Back To Notes App</h1>
            <Link className="btn btn-primary" to="/add">Add Notes</Link>
            <span className="mx-2"></span>
            <Link className="btn btn-dark" to="/notes">View Notes</Link>
        </div>
    );
    const guestDashboard = (
        <div>
            <h1 className="mb-5">Welcome To Notes App</h1>
            <Link className="btn btn-primary mr-2" to="/signup">Sign Up</Link>
            <Link className="btn btn-dark ml-2" to="/login">Log In</Link>
        </div>
    );
    return(
        <div className="container text-center d-flex justify-content-center align-items-end">
            { isAuthenticated ? authDashboard : guestDashboard }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Dashboard);