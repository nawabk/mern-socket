import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DepartmentsTable = ({ departments }) => {
  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((department, index) => (
          <tr key={department._id}>
            <td>{++index}</td>
            <td>
              <Link to={`/departments/${department._id}`}>
                {department.name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DepartmentsTable;
