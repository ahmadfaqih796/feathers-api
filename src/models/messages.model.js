// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const messages = sequelizeClient.define(
    "messages",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      comment_id: {
        type: DataTypes.UUID,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      created_by: {
        type: DataTypes.STRING(100),
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  messages.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html

    messages.belongsTo(models.users, {
      forignKey: "user_id",
      as: "user",
    });
    // messages.hasMany(models.comments, {
    //   forignKey: 'comment_id',
    //   targetKey:'comment_id',
    //   as: 'children',
    // });
  };

  return messages;
};
