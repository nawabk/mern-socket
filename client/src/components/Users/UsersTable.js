import React from 'react';
import { Table } from 'react-bootstrap';

const UsersTable = ({ users, showDepartment = true }) => {
  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {showDepartment && <th>Department</th>}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {showDepartment && (
              <td>{user.department ? user.department.name : '---'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
