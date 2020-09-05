import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import axios from 'axios';

const AddDepartment = ({ addDepartmentSuccessHandler }) => {
  const [name, setName] = useState('');

  const formSubmitHandler = async e => {
    e.preventDefault();
    const body = {
      name
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/departments`,
        body,
        getAuthHeader()
      );
      addDepartmentSuccessHandler(res.data);
    } catch (error) {
      console.log('There is some problem creating department');
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
      <Button variant='primary' size='sm' className='float-right' type='submit'>
        Save
      </Button>
    </Form>
  );
};

export default AddDepartment;
