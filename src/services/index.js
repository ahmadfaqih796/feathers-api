const users = require('./users/users.service.js');
const address = require('./address/address.service.js');
const product = require('./product/product.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(address);
  app.configure(product);
  app.configure(messages);
};
