const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(" ")[0] === "Bearer") {
        return authorization.split(" ")[1]
    }

    return null;
}

const jwtObject = {
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    algorithms: ['sha1', 'RS256', 'HS256'],
};

const auth = {
    required: jwt(jwtObject),
    optional: jwt({ ...jwtObject, credentialsRequired: false })
}

module.exports = auth