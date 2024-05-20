const errorsResponse = require("@feathersjs/errors");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, data, error } = context;
    const { errors, message } = error;

    if (message === "Validation error" && errors[0].path === "email") {
      const email = data.email;
      const isEmailValid = await app.service("users").Model.findOne({
        where: {
          email: email,
        },
      });

      if (isEmailValid) {
        throw new errorsResponse.BadRequest(
          "Email ini sudah terdaftar, silahkan gunakan email lain"
        );
      }
    }

    return context;
  };
};
