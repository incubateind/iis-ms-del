/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problems', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    upvote: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 0
    },
    impact: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'problems',
    timestamps:false
  });
};
