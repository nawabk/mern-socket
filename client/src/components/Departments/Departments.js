import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import AddDepartment from './AddDepartment';
import DepartmentsTable from './DepartmentsTable';
import { BASE_URL, getAuthHeader } from '../../utils/shared';
import Modal from '../Modal/Modal';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const fetchDepartments = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/departments`, getAuthHeader());
      setDepartments(res.data);
    } catch (err) {
      console.log('There is some problem fetching departments');
    }
  }, []);
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const addDepartmentSuccessHandler = department => {
    setDepartments(prevState => [...prevState, department]);
    setShowAddDepartmentModal(false);
  };
  return (
    <>
      <Modal
        show={showAddDepartmentModal}
        onHide={() => setShowAddDepartmentModal(false)}
        title='Add Department'
      >
        <AddDepartment
          addDepartmentSuccessHandler={addDepartmentSuccessHandler}
        />
      </Modal>
      <Row>
        <Col xs={6}>
          <h3>Departments</h3>
        </Col>
        <Col xs={6}>
          <Button
            variant='primary'
            size='sm'
            className='float-right'
            onClick={() => setShowAddDepartmentModal(true)}
          >
            Add Department
          </Button>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col xs={4}>
          <DepartmentsTable departments={departments} />
        </Col>
      </Row>
    </>
  );
};

export default Departments;
