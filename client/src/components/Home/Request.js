import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RequestCard from './RequestCard';
import { BASE_URL, getAuthHeader } from '../../utils/shared';

const Request = ({ match, user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getAllRequests() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/users/requests?status=${match.params.status}`,
          getAuthHeader()
        );
        setLoading(false);
        setRequests(res.data);
      } catch (err) {
        console.log('error fetching pending requests');
        setLoading(false);
      }
    }
    getAllRequests();
  }, [match.params.status]);

  const checkPermission = reciever => {
    if (user) {
      if (user._id === reciever._id) return true;
    }
    return false;
  };
  const statusChangedSuccessHandler = requestId => {
    setRequests(prevState =>
      prevState.filter(request => request._id !== requestId)
    );
  };
  let content = null;
  if (loading) {
    content = <h5>Fetching data...</h5>;
  } else {
    content =
      requests.length > 0 ? (
        requests.map(request => (
          <RequestCard
            key={request._id}
            request={request}
            statusChangedSuccessHandler={statusChangedSuccessHandler}
            permissionToChangeStatus={checkPermission(request.reciever)}
          />
        ))
      ) : (
        <h5>No Data</h5>
      );
  }
  return content;
};

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(Request);
