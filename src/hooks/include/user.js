const { mergeWithKey, concat } = require("ramda");

const concatValue = (k, l, r) => (k === "include" ? concat(l, r) : r);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const { attributes } = options;
    const sequelize = context.app.get("sequelizeClient");
    const { users } = sequelize.models;
    const include = [
      {
        model: users,
        as: "user",
        ...(attributes
          ? { attributes }
          : { attributes: { exclude: ["password"] } }),
      },
    ];

    const sequelizeOptions = mergeWithKey(
      concatValue,
      context.params.sequelize,
      { include, raw: false }
    );

    context.params.sequelize = sequelizeOptions;

    return context;
  };
};
