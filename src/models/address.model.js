// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const address = sequelizeClient.define(
    "address",
    {
      id_address: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      jln: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rw: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: false,
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
  address.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    address.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  };

  return address;
};
