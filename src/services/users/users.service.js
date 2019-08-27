// Initializes the `users` service on path `/users`
const { Users } = require("./users.class");
const hooks = require("./users.hooks");
const UserModel = require("./users.model");
const mongoose = require("mongoose");

module.exports = function(app) {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:27017/weclique");

  const paginate = app.get("paginate");

  const options = {
    Model: UserModel,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use("/users", new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);
};
