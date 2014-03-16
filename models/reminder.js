module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Reminder", {
    type: DataTypes.STRING,
    phonenumber: DataTypes.BIGINT,
    date: DataTypes.DATE,
    content: DataTypes.STRING
  })
}
