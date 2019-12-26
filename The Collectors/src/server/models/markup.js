import DataTypes from "sequelize";
import sequelize from "./sequelize";

const markup = sequelize.define(
  "markup",
  {
    title: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
  },
  {}
);

export default markup;