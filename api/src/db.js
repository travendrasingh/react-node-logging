require('dotenv').config();
const { Response } = require('./biz/response');
const { ErrorMsg } = require('./biz/constants');
const Sequelize = require('sequelize');

let instance = null

class DBClass {
  constructor() {
    this._conn = new Sequelize(
      process.env.MS_DATABASE,
      process.env.MS_DB_USER,
      process.env.MS_DB_PASS,
      {
        host: process.env.MS_DB_HOST,
        port: process.env.MS_DB_PORT,
        dialect: 'mysql',
        timezone: process.env.DB_TZ,
        operatorsAliases: false,
        pool: {
          max: 200,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        dialectOptions: {
          multipleStatements: true
        }
      }
    )
  }

  static getInstance() {
    if (!instance) {
      instance = new DBClass()
    }
    return instance
  }
}

exports.sequelize = DBClass.getInstance()._conn