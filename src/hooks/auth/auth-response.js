// eslint-disable-next-line no-unused-vars
const errors = require("@feathersjs/errors");
module.exports = () => {
  return async (context) => {
    const { user, accessToken } = context.result;
    delete context.result.authentication;

    context.result = {
      message: "Anda berhasil login",
      user,
      accessToken,
    };
    return context;
  };
};
