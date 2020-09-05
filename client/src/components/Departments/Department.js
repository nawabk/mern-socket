import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import UsersTable from '../Users/UsersTable';
import Modal from '../Modal/Modal';
import AddUserToDep from './AddUserToDep';

const Department = ({ match }) => {
  const [department, setDepartment] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [usersInDep, setUsersInDep] = useState([]);
  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await axios.get(
          `${BASE_URL}/departments/${match.params.id}`,
          getAuthHeader()
        );
        setDepartment(res.data);
      } catch (error) {
        console.log('Problem in fetching the department');
      }
    }
    fetchDepartment();
  }, [match.params.id]);
  useEffect(() => {
    if (department) setUsersInDep(department.users);
  }, [department]);
  const addUserToDepSuccesHandler = user => {
    setUsersInDep(prevState => [...prevState, user]);
    setShowAddUserModal(false);
  };
  return (
    <>
      <Modal
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        title='Add User to department'
      >
        <AddUserToDep
          addUserToDepSuccesHandler={addUserToDepSuccesHandler}
          id={department && department._id}
        />
      </Modal>
      <Row>
        <Col xs={6}>
          <h3>{department && department.name}</h3>
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
      <Row>
        <Col xs={6}>
          <UsersTable users={usersInDep} showDepartment={false} />
        </Col>
      </Row>
    </>
  );
};

export default Department;
