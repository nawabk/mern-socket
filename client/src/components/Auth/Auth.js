import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';
import { onLogin } from '../../store/actions/authActions';

const popover = (
  <Popover id='popover-basic'>
    <Popover.Content>
      Hey there!Please use email(mdkhalid@gmail.com) and password(test1234) for
      login
    </Popover.Content>
  </Popover>
);
const Auth = ({ isAuthenticated, loading, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopover, setShowPopover] = useState(true);
  const formSubmitHandler = e => {
    e.preventDefault();
    onLogin(email, password);
  };
  if (isAuthenticated) return <Redirect to='/home' />;
  return (
    <div className='auth' onClick={() => setShowPopover(false)}>
      <div className='auth__container'>
        <Form onSubmit={formSubmitHandler} className='auth__form'>
          <OverlayTrigger show={showPopover} placement='top' overlay={popover}>
            <h2 className='auth__heading'>Login</h2>
          </OverlayTrigger>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='auth__button'>
            {loading ? 'loading...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { onLogin })(Auth);
