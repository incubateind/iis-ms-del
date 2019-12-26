import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";

import config from "../config/config.json";

let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(
    process.env[config[env].use_env_variable],
    config[env]
  );
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
}

export default sequelize;
