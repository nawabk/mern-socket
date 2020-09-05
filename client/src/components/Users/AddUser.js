import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import axios from 'axios';

const AddUser = ({ addUserSuccessHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const formSubmitHandler = async e => {
    e.preventDefault();
    const body = {
      name,
      email
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/users/add`,
        body,
        getAuthHeader()
      );
      addUserSuccessHandler(res.data);
    } catch (error) {
      console.log('There is some problem creating user');
    }
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='text'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' size='sm' className='float-right' type='submit'>
        Save
      </Button>
    </Form>
  );
};

export default AddUser;
