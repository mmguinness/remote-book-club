const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      userName: "user name",
    });
    expect(user.userName).toEqual("user name");
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someoneElse@example.com",
      password: "password",
      userName: "Anotheruser name",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someoneElse@example.com",
          password: "password",
          userName: "Anotheruser name",
        });
        done();
      });
    });
  });
});