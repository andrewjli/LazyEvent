module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    fbuserid: DataTypes.BIGINT,
    fullname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING
  })
}
