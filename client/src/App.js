import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import NotFoundPage from './components/NotFoundPage';

class App extends Component {

  componentDidMount() {
    if (localStorage.noteToken) {
      setAuthToken(localStorage.noteToken);
      const decoded = jwt_decode(localStorage.noteToken);
      this.props.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.dispatch(logoutUser());
      }
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route
              path="/"
              exact={true}
              component={Dashboard}
            />
            <Route
              path="/notes"
              exact={true}
              component={Notes}
            />
            <Route
              path="/add"
              component={AddNote}
              exact={true}
            />
            <Route
              path="/notes/edit/:id"
              component={EditNote}
              exact={true}
            />
            <Route
              path="/signup"
              component={SignUp}
            />
            <Route
              path="/login"
              component={LogIn}
            />
            <Route 
              component={NotFoundPage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
