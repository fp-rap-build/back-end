const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const Users = require('../routes/users/userModel');

const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const makeProfileObj = (claims) => {
  let id,
    email,
    firstName,
    lastName = '';

  if (claims.firstName) {
    firstName = claims.firstName;
  }

  if (claims.lastName) {
    lastName = claims.lastName;
  }

  if (claims.name) {
    firstName = claims.name.split(' ')[0];
  }

  id = claims.sub;
  email = claims.email;

  const profile = {
    id,
    email,
    firstName,
    lastName,
  };

  return profile;
};

/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */

const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) throw new Error('Missing idToken');

    const idToken = match[1];

    oktaJwtVerifier
      .verifyAccessToken(idToken, oktaVerifierConfig.expectedAudience)
      .then(async (data) => {
        const jwtUserObj = makeProfileObj(data.claims);
        const user = await Users.findOrCreateProfile(jwtUserObj);
        if (user) {
          req.user = user;
        } else {
          throw new Error('Unable to process idToken');
        }
        next();
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({ message: 'Invalid token' });
      });
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
