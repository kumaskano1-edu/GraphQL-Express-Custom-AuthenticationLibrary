const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");

const FacebookTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: "266795204489325",
      clientSecret: "2fc1925fa2a6bd5360135aaa2b6181b4",
    },
    FacebookTokenStrategyCallback
  )
);

module.exports = {
  authenticateFacebook: (req, res) =>
    new Promise((resolve, reject) => {
      passport.authenticate(
        "facebook-token",
        { session: false },
        (err, data, info) => {
          if (err) reject(err);
          resolve({ data, info });
        }
      )(req, res);
    }),
};
