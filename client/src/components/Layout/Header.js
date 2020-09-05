import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Notification from './Notification';

const Header = ({ history }) => {
  return (
    <Navbar bg='primary' variant='dark'>
      <Navbar.Brand href='#home' onClick={() => history.push('/home')}>
        MERN
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#!' onClick={() => history.push('/requests/PENDING')}>
          Pending
        </Nav.Link>
        <Nav.Link href='#!' onClick={() => history.push('/requests/APPROVED')}>
          Approved
        </Nav.Link>
        <Nav.Link href='#!' onClick={() => history.push('/requests/REJECTED')}>
          Rejected
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href='#!' onClick={() => history.push('/users')}>
          Users
        </Nav.Link>
        <Nav.Link href='#!' onClick={() => history.push('/departments')}>
          Departments
        </Nav.Link>
        <Notification />
        <Nav.Link href='#!' onClick={() => history.push('/logout')}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default withRouter(Header);
