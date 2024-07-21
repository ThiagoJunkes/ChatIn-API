module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apelido: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });

  return Usuario;
};
