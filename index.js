const app = require('./app');

const connection = require('./db.connector');

const { port, host } = { port: 3000, host: 'localhost' };

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    app.listen(port, host, () => {
      console.log(`👉: http://${host}:${port}`);
    });
  }
});
