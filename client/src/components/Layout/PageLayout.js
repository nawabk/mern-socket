import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';
import Header from './Header';
import { Container } from 'react-bootstrap';

import {
  getNotifications,
  addNotification
} from '../../store/actions/notificationActions';
import { SOCKET } from '../../utils/shared';

const PageLayout = ({ children, getNotifications, user, addNotification }) => {
  useEffect(() => {
    if (user) {
      const socket = socketIoClient(SOCKET);
      socket.emit('newUserConnection', user._id);
      socket.on('notification', notification => {
        console.log(notification);
        addNotification(notification);
      });
    }
  }, [user, addNotification]);
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  return (
    <>
      <Header />
      <Container style={{ marginTop: '1rem', padding: '0 .2rem' }}>
        {children}
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { getNotifications, addNotification })(
  PageLayout
);
