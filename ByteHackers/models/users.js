/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pincode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
  }, {
    tableName: 'users',
    timestamps:false
  });
};
