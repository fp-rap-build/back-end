const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Users = require('./userModel');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');
/** 
 * @swagger
 * /me:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: object
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 * */
router.get('/me', authRequired, (req, res) => {
  const { user } = req;
  res.status(200).json({
    user,
  });
});

/** 
 * @swagger
 * /me:
 *  put:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: '#/components/parameters/id'
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      500:
 * */
router.put('/me', authRequired, async (req, res) => {
  const { id } = req.user;


  let role = req.body['role']

  // Users can't update their role to admin or program manager

  if (role == 'admin' || role == 'programManager') {
    req.body['role'] = undefined
  }

  let payload = req.body

  try {
    let updatedUser = await Users.findByIdAndUpdate(id, payload)

    res.status(200).json({ user: updatedUser[0] })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
});

/** 
 * @swagger
 * /me/address:
 *  put:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      500:
 * */
router.put('/me/address', authRequired, async (req, res) => {
  let { id } = req.user

  // Make it impossible to update the id
  req.body['id'] = undefined

  let payload = req.body

  try {
    let user = await Users.findById(id)

    let updatedAddress = await Users.updateAddressById(user.addressId, payload)

    res.status(200).json({ address: updatedAddress[0] })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/** 
 * @swagger
 * /:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      500:
 * */
router.get('/', authRequired, restrictTo('admin'), async (req, res) => {
  try {
    let users = await Users.findAll();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** 
 * @swagger
 * /requests:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.get(
  '/requests',
  authRequired,
  restrictTo('admin', 'program_manager'),
  async (req, res) => {
    try {
      let users = await Users.findAll({ isRequestingAssistance: true });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/** 
 * @swagger
 * /:
 *  post:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.post('/', authRequired, (req, res) => {
  Users.findOrCreateProfile(req.body)
    .then(() => {
      res.status(201).json({ message: 'Profile created' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Unable to create profile' });
    });
});

/** 
 * @swagger
 * /{id}:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.get('/:id', authRequired, restrictTo('admin'), (req, res) => {
  const id = String(req.params.id);
  Users.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/** 
 * @swagger
 * /{id}/address/:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.get(
  '/:id/address',
  authRequired,
  restrictTo('admin'),
  async (req, res) => {
    let { id } = req.params;
    try {
      let address = await Users.findAddressByUserId(id);
      res.status(200).json({ address: address[0] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/** 
 * @swagger
 * /{id}/address:
 *  put:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.put(
  '/:id/address',
  authRequired,
  restrictTo('admin'),
  async (req, res) => {
    let { id } = req.params;

    // Make it impossible to update the id
    req.body['id'] = undefined;

    let payload = req.body;

    try {
      let user = await Users.findById(id);

      let updatedAddress = await Users.updateAddressById(
        user.addressId,
        payload
      );

      res.status(200).json({ address: updatedAddress[0] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/** 
 * @swagger
 * /{id}:
 *  put:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.put('/:id', authRequired, restrictTo('admin'), async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, payload)
    res.status(200).json({ user: updatedUser[0] })
  } catch (error) {
    res.status(500).json({ message: 'Internal service error' })
  }
});

/** 
 * @swagger
 * /{id}:
 *  delete:
 *    summary: Attempts to request the current users profile.
 *    description: 
 *      add the description of what this endpoint does here
 *    security:   
 *      - okta: []
 *    tags: 
 *      - users
 *    parameters:
 *      - $ref: ''
 *    responses: 
 *      200:
 *        description: add a description of what a successful response looks like
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example: 
 *                  - Add an example of the shape of the data that is returned
 *      401:
 *        $ref: ''
 *      404: 
 *        $ref: ''
 *      500:
 * */
router.delete('/:id', restrictTo('admin'), (req, res) => {
  const { id } = req.params;
  try {
    Users.findById(id).then((profile) => {
      Users.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;