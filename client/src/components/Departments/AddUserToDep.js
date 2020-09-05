import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

import { BASE_URL, getAuthHeader } from '../../utils/shared';

const AddUserToDep = ({ id, addUserToDepSuccesHandler }) => {
  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(
          `${BASE_URL}/users/nodepartment`,
          getAuthHeader()
        );
        if (res.data.length > 0) {
          setOptions(
            res.data.map(user => ({ label: user.name, value: user._id }))
          );
        }
      } catch (err) {
        console.log('Some problem fetching users');
      }
    }
    getAllUsers();
  }, []);
  const formSubmitHandler = async e => {
    e.preventDefault();
    try {
      const body = {
        userId: selectedUser
      };
      const res = await axios.put(
        `${BASE_URL}/departments/${id}/users`,
        body,
        getAuthHeader()
      );
      addUserToDepSuccesHandler(res.data);
    } catch (err) {
      console.log('error while adding user');
    }
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group>
        <Form.Label>Users</Form.Label>
        <Select
          options={options}
          isSearchable={true}
          onChange={elem => {
            setSelectedUser(elem.value);
          }}
        />
      </Form.Group>
      <Button type='submit' size='small' className='float-right'>
        Save
      </Button>
    </Form>
  );
};

export default AddUserToDep;
