import React, { useState } from 'react';
import { Card, Row, Col, Badge, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import { setAlert } from '../../store/actions/alertActions';

const RequestCard = ({
  request,
  permissionToChangeStatus,
  setAlert,
  statusChangedSuccessHandler
}) => {
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const requestStatusChangeHandler = async (requestId, status) => {
    try {
      const body = {
        status
      };
      if (status === 'APPROVED') setApproveLoading(true);
      else if (status === 'REJECTED') setRejectLoading(true);
      await axios.put(
        `${BASE_URL}/users/${requestId}/changeStatus`,
        body,
        getAuthHeader()
      );
      setApproveLoading(false);
      setRejectLoading(false);
      setAlert({
        type: 'success',
        message: `You ${status} the request`
      });
      statusChangedSuccessHandler(requestId);
    } catch (err) {
      console.log('There is some problem changing state');
      setApproveLoading(false);
      setRejectLoading(false);
    }
  };
  return (
    request && (
      <Card className='mt-2'>
        <Card.Body>
          <Row>
            <Col xs={9}>
              <div className='d-flex align-items-center'>
                <h4 style={{ marginRight: '.2rem' }}>{request.sender.name}</h4>
                <Badge variant='warning'>{request.status}</Badge>
              </div>
              <p>{request.message}</p>
              <Badge variant='secondary'>
                Request to:
                {permissionToChangeStatus ? 'You' : request.reciever.name}
              </Badge>
            </Col>
            <Col xs={3}>
              {permissionToChangeStatus &&
                (request.status === 'PENDING' ? (
                  <ButtonGroup className='float-right'>
                    <Button
                      size='sm'
                      onClick={() =>
                        requestStatusChangeHandler(request._id, 'APPROVED')
                      }
                    >
                      {!approveLoading ? 'Approve' : 'Loading....'}
                    </Button>
                    <Button
                      size='sm'
                      variant='danger'
                      onClick={() =>
                        requestStatusChangeHandler(request._id, 'REJECTED')
                      }
                    >
                      {!rejectLoading ? 'Reject' : 'Loading...'}
                    </Button>
                  </ButtonGroup>
                ) : request.status === 'APPROVED' ? (
                  <Badge variant='success' className='float-right' size='lg'>
                    You Approved
                  </Badge>
                ) : (
                  <Badge variant='danger' className='float-right'>
                    You Rejectd
                  </Badge>
                ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
};

export default connect(null, { setAlert })(RequestCard);
