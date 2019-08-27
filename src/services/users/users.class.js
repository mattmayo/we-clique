const { Service } = require("feathers-mongoose");
const errors = require("@feathersjs/errors");

exports.Users = class Users extends Service {
  create(data, params) {
    const email = data.email.toLowerCase();
    const password = data.password;

    return this.find({
      query: { email }
    }).then(users => {
      if (users.total)
        return new errors.Conflict("User already exists.", {
          email
        });

      const userData = {
        email,
        password
      };

      return super.create(userData, params);
    });
  }
};
