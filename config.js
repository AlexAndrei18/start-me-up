const { Sequelize, DataTypes } = require("sequelize");

// Conectare la MySQL
const database = new Sequelize("start_me_up_db", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});

// Definim modelul pentru participanți
const participantModel = database.define("participants", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nume_echipa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facultate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  an: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idee: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = {
  database,
  participantModel,
};
