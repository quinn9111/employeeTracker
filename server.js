const db = require('./db/connect');
const startEmployeeTracker = require('./utils/myindex');

db.connect(err => {
  if (err) throw err;
  console.log('');
  console.log('Database connected.');
  setTimeout(() => {
    startEmployeeTracker();
  }, 500);
});