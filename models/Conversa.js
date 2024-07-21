module.exports = (sequelize, DataTypes) => {
  const Conversa = sequelize.define('Conversa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dt_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fk_user_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    fk_user_from: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
  }, {
    tableName: 'conversas',
    timestamps: false,
  });

  return Conversa;
};
