import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { Container } from 'react-bootstrap';

import { getNotifications } from '../../store/actions/notificationActions';

const PageLayout = ({ children, getNotifications }) => {
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

export default connect(null, { getNotifications })(PageLayout);
