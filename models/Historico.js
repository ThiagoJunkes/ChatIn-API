module.exports = (sequelize, DataTypes) => {
  const Historico = sequelize.define('Historico', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fk_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    fk_id_conversa: {
      type: DataTypes.INTEGER,
      references: {
        model: 'conversas',
        key: 'id',
      },
    },
    dt_msg_send: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dt_msg_received: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'historicos',
    timestamps: false,
  });

  return Historico;
};
