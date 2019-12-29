const Sequelize = require('sequelize')
const DBhelper = require('../../config/mysql')

var sequelize = new Sequelize(DBhelper.database, DBhelper.username, DBhelper.password, {
  host: DBhelper.host,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

/* sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }); */

module.exports = sequelize