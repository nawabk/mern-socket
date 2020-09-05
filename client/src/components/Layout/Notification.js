import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Popover, OverlayTrigger, Button, ListGroup } from 'react-bootstrap';
import { BASE_URL, getAuthHeader } from '../../utils/shared';

const Notification = ({ notifications }) => {
  const [unreadNotification, setUnreadNotification] = useState(0);
  useEffect(() => {
    const countUnreadNotifications = () => {
      let count = 0;
      notifications.forEach(notification => {
        if (notification.status === 'UNREAD') {
          count++;
        }
      });
      return count;
    };
    if (notifications.length > 0)
      setUnreadNotification(countUnreadNotifications());
  }, [notifications]);

  const readNotificationHandler = async () => {
    try {
      await axios.put(
        `${BASE_URL}/notifications/markAllRead`,
        {},
        getAuthHeader()
      );
      setUnreadNotification(0);
    } catch (err) {
      console.log('There is some problem...please try later');
    }
  };
  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom'
      overlay={
        <Popover id={`popover-positioned-bottom`}>
          <Popover.Content>
            {notifications.length > 0 ? (
              <ListGroup>
                {notifications.map(notification => (
                  <ListGroup.Item key={notification._id}>
                    {notification.message}
                  </ListGroup.Item>
                ))}
                {unreadNotification > 0 && (
                  <Button
                    variant='link'
                    size='sm'
                    onClick={readNotificationHandler}
                  >
                    Mark all as read
                  </Button>
                )}
              </ListGroup>
            ) : (
              <h5>No Notifcations</h5>
            )}
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant='danger' size='sm'>
        Notifcations{' '}
        {unreadNotification > 0 && (
          <span className='badge badge-light'>{unreadNotification}</span>
        )}
      </Button>
    </OverlayTrigger>
  );
};

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});
export default connect(mapStateToProps)(Notification);
