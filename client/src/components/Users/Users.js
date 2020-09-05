import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import UsersTable from './UsersTable';
import Modal from '../Modal/Modal';
import AddUser from './AddUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, getAuthHeader());
      setUsers(res.data);
    } catch (err) {
      console.log('There is some problem fetching users');
    }
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const addUserSuccessHandler = user => {
    setUsers(prevState => [...prevState, user]);
    setShowAddUserModal(false);
  };
  return (
    <>
      <Modal
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        title='Add User'
      >
        <AddUser addUserSuccessHandler={addUserSuccessHandler} />
      </Modal>
      <Row>
        <Col xs={6}>
          <h3>Users</h3>
        </Col>
        <Col xs={6}>
          <Button
            variant='primary'
            size='sm'
            className='float-right'
            onClick={() => setShowAddUserModal(true)}
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Row className='mt-2'>
        <UsersTable users={users} />
      </Row>
    </>
  );
};

export default Users;
