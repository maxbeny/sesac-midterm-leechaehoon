const Todo = (sequelize, DataTypes) => {
  return sequelize.define(
    'todo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true, // table name 고정
      timestamps: true, // createAt, updateAt 추가
    }
  );
};

module.exports = Todo;
