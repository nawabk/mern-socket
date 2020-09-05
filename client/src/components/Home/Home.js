import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import './Home.css';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import { setAlert } from '../../store/actions/alertActions';

const Home = ({ user, setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [departments, setDeparments] = useState([]);
  const [depOptions, setDepOptions] = useState([]);
  const [usersOptions, setUsersOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    async function getDepartments() {
      try {
        const res = await axios.get(`${BASE_URL}/departments`, getAuthHeader());
        setDeparments(res.data);
      } catch (err) {
        console.log('error while fetcing departments');
      }
    }
    getDepartments();
  }, []);

  useEffect(() => {
    if (user && departments.length > 0) {
      const filteredDeps = departments.filter(
        dep => dep._id !== user.department
      );
      setDepOptions(
        filteredDeps.map(dep => ({ label: dep.name, value: dep._id }))
      );
    }
  }, [user, departments]);

  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find(
        dep => dep._id === selectedDepartment
      );
      setUsersOptions(
        department.users.map(user => ({
          label: user.name,
          value: user._id
        }))
      );
    }
  }, [selectedDepartment, departments]);

  const formSubmitHandler = async e => {
    e.preventDefault();
    if (!message || !selectedDepartment || !selectedUser) {
      return setAlert({
        type: 'danger',
        message: 'All fields are mandatory...Please fill them.'
      });
    }
    try {
      setLoading(true);
      const body = {
        message
      };
      await axios.post(
        `${BASE_URL}/users/${selectedUser}/sendRequest`,
        body,
        getAuthHeader()
      );
      setLoading(false);
      setAlert({
        type: 'success',
        message: 'Request Send Successfully'
      });
      setMessage('');
      setSelectedDepartment(null);
      setSelectedUser(null);
    } catch (err) {
      setLoading(false);
      setAlert({
        type: 'danger',
        message: 'Problem in sending request...please try later'
      });
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='request-form'>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              type='text'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Select
              options={depOptions}
              isSearchable={true}
              onChange={elem => setSelectedDepartment(elem.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Users</Form.Label>
            <Select
              options={usersOptions}
              isSearchable={true}
              onChange={elem => setSelectedUser(elem.value)}
              isDisabled={selectedDepartment ? false : true}
            />
          </Form.Group>
          <Button size='sm' className='float-right' type='submit'>
            {loading ? 'Sening...' : 'Send Request'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps, { setAlert })(Home);
