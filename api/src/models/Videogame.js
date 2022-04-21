const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      defaultValue:0,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    
    createdInDb: { // Que debería hacer con esto
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  },{timestamps : false});
};
