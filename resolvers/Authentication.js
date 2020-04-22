const { authenticateFacebook } = require("../resolvers/utils/SocialAuth");
module.exports = {
  Mutation: {
    authFacebook: async (
      parent,
      { input: { accessToken } },
      { req, res, prisma }
    ) => {
      req.body = { ...req.body, access_token: accessToken };
      try {
        const { data, info } = await authenticateFacebook(req, res);
        if (data) {
          const user = await prisma.user({ id: data.profile.id });
          let userId = null;
          if (!user) {
            const newUser = await prisma.createUser({
              id: data.profile.id,
              name: data.profile.displayName || data.profile.givenName,
              email: data.profile.emails[0].value,
              password: data.profile.id,
            });
            userId = newUser.id;
          }
          return {
            id: userId,
            token: data.accessToken,
          };
        }
        if (info) {
          console.log(info);
          switch (info.code) {
            case "ETIMEDOUT":
              return new Error("Failed to reach Facebook: Try Again");
            default:
              return new Error("something went wrong");
          }
        }
        return Error("server error");
      } catch (error) {
        return error;
      }
    },
  },
};
