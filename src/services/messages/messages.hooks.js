const { authenticate } = require("@feathersjs/authentication").hooks;
const includeUsers = require("../../hooks/include/user");

const handleCreate = () => {
  return (context) => {
    const { params } = context;
    context.data.user_id = params.user.id;
    context.data.created_by = params.user.fullname;
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [includeUsers({ attributes: ["fullname", "email"] })],
    get: [includeUsers({ attributes: ["fullname", "email"] })],
    create: [
      handleCreate(),
      includeUsers({ attributes: ["fullname", "email"] }),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        const getLastData = await context.app
          .service("messages")
          .get(context.result.id);
        context.result = getLastData;
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
