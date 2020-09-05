/*eslint-disable*/
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/Routng/PrivateRoute';
import Auth from './components/Auth/Auth';
import { checkStatus } from './store/actions/authActions';
import Alert from './components/Alert/Alert';
import Logout from './components/Auth/Logout';
import Home from './components/Home/Home';
import Request from './components/Home/Request';
import Users from './components/Users/Users';
import Departments from './components/Departments/Departments';
import Department from './components/Departments/Department';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ alert, checkStatus }) => {
  useEffect(() => {
    checkStatus();
  }, []);
  return (
    <Fragment>
      {alert.length > 0 && (
        <div className='alert__container'>
          {alert.map(al => (
            <Alert key={al.id} message={al.message} type={al.type} />
          ))}
        </div>
      )}
      <Switch>
        <Route path='/login' exact component={Auth} />
        <Route path='/logout' component={Logout} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/requests/:status' component={Request} />
        <PrivateRoute path='/users' component={Users} />
        <PrivateRoute exact path='/departments/:id' component={Department} />
        <PrivateRoute path='/departments' component={Departments} />
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps, { checkStatus })(App);
