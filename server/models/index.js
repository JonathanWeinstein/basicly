'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const db = {};
const dbURL = 'postgres://iqsiekmuhobubu:aeacd4ffc63e884dd379cf22a70796cffa367c8686a20978e5a7b80e0328a6bc@ec2-23-21-246-25.compute-1.amazonaws.com:5432/dcfsvvf408pgf4'
if (env === 'production') {
  const sequelize = new Sequelize(dbURL);
} else {
  const sequelize = new Sequelize('basicly', process.env.DB_USER, 'password', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });  
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
