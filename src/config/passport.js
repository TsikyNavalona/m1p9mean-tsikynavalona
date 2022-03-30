const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Customer = require("../models/customer");
import CustomerService from "../services/CustomerService";

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = "secretToken";
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      CustomerService.showCustomerByIdV2(
        jwt_payload.data._id,
        (err, customer) => {
          if (err) {
            return done(err, false);
          }

          if (customer) {
            return done(null, customer);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
