if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = null;
 
  if (process.env.HEROKU_POSTGRESQL_OLIVE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_OLIVE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
 
    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    });
  } else {
    sequelize = new Sequelize('lazyevent', 'postgres', 'admin', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    })
  }
 
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Event: sequelize.import(__dirname + '/event'),
    Reminder: sequelize.import(__dirname + '/reminder'),
 
    // add your other models here
  }
 
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
  global.db.User.hasMany(global.db.Event);
  global.db.Event.belongsTo(global.db.User);

  global.db.Event.hasMany(global.db.Reminder);
  global.db.Reminder.belongsTo(global.db.Event);
}
 
module.exports = global.db;
