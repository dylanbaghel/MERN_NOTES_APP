import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './../actions/authActions';

const Header = (props) => {
    const isAuthenticated = props.auth.isAuthenticated;
    return (
        <nav className="navbar navbar-dark navbar-expand bg-dark mb-5">
            <div className="container">
                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Notes
                </Link>
                {
                    isAuthenticated
                        //AUTH
                        ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/add" >
                                    Add Note
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notes">
                                    Notes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/"
                                    onClick={() => {
                                        props.dispatch(logoutUser());
                                    }}
                                >
                                    Log out
                                </Link>
                            </li>
                        </ul>
                        // NOT AUTH
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/signup"
                                >
                                    Sign Up
                    </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Log In
                    </Link>
                            </li>
                        </ul>
                }
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Header);