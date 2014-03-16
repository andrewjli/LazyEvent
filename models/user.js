module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    fbuserid: DataTypes.BIGINT
  })
}
