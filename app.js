const express = require('express');
const cors = require('cors');
const path = require('path');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const assignmentRequestRouter = require('./routes/assignmentRequestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cors());

app.use('/api/users', userRouter, assignmentRequestRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/notifications', notificationRoutes);
// app.use('/api/assignmentRequest', assignmentRequestRouter);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(globalErrorHandler);

module.exports = app;
