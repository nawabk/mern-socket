import React from 'react';
import { Alert } from 'react-bootstrap';

const UIAlert = ({ type, message }) => {
  return (
    <Alert variant={type} className='alert__top-right'>
      {message}
    </Alert>
  );
};

export default UIAlert;
