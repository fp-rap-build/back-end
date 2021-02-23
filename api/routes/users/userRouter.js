const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Users = require('./userModel');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

/**
 * @swagger
 * components:
 *   schemas:
 *     Me:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: string
 *         is_requesting_assistance:
 *           type: boolean
 *         request_status:
 *           type: string
 *         family_size:
 *           type: number
 *         income_id:
 *           type: string
 *         address_id:
 *           type: string
 *         organization_id:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: string
 *         isRequestingAssistance:
 *           type: boolean
 *         requestStatus:
 *           type: string
 *         familySize:
 *           type: number
 *         monthlyIncome:
 *           type: float
 *         address:
 *           type: string
 *         state:
 *           type: string
 *         cityName:
 *           type: string
 *         zipCode:
 *           type: number
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *           type: string
 *     Success:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *            type: string
 *   responses:
 *     ServerError:
 *       description: Unknown Server Error
 *       content:
 *         application/json:
 *           schema:
 *             - $ref: '#/components/schemas/Error'
 *           example:
 *             - error:
 *                - message: "Internal Server Error"
 *     Success:
 *       description: Successfully retrieved data
 *       content:
 *         application/json:
 *           schema:
 *             - $ref: '#/components/schemas/Success'
 *           example:
 *             - success:
 *                - message: "OK"
 *     NotFoundError:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             - $ref: '#/components/schemas/Error'
 * */

/**
 * @swagger
 * /me:
 *  get:
 *    summary: Attempts to request the current users profile.
 *    description:
 *     returns all the information about a user
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
 *              items:
 *                anyOf:
 *                  - $ref: '#/components/schemas/Me'
 *              example:
 *                - id: "00u4o3bmgukEv4uzA5d6"
 *                  email: "admin@gmail.com"
 *                  firstName: "Tommy"
 *                  lastName: "Shelby"
 *                  role: "admin"
 *                  is_requesting_assistance: false
 *                  request_status: "pending"
 *                  family_size: 0
 *                  income_id: null
 *                  address_id: null
 *                  organization_id: null
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
 *              type: object
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: ''
 *                example:
 *                  - Add an example of the shape of the data that is returned
 *      500:
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
router.put('/me', authRequired, async (req, res) => {
  const { id } = req.user;

  let role = req.body['role'];

  // Users can't update their role to admin or program manager

  if (role == 'admin' || role == 'programManager') {
    req.body['role'] = undefined;
  }

  let payload = req.body;

  try {
    let updatedUser = await Users.findByIdAndUpdate(id, payload);

    res.status(200).json({ user: updatedUser[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/me', authRequired, async (req, res, next) => {
  const { id } = req.user;

  try {
    await Users.findByIdAndDelete(id);

    res.status(204).json({ message: 'User was successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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
 *      500:
 * */
router.put('/me/address', authRequired, async (req, res) => {
  let { id } = req.user;

  // Make it impossible to update the id
  req.body['id'] = undefined;

  let payload = req.body;

  try {
    let user = await Users.findById(id);

    let updatedAddress = await Users.updateAddressById(user.addressId, payload);

    res.status(200).json({ address: updatedAddress[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /:
 *  get:
 *    summary: Attempts to request the data of all users in the database
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
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: '#/components/schemas/User'
 *              example:
 *                - id: "00u4o3bmgukEv4uzA5d6"
 *                  email: "admin@gmail.com"
 *                  firstName: "Tommy"
 *                  lastName: "Shelby"
 *                  role: "admin"
 *                  is_requesting_assistance: false
 *                  request_status: "pending"
 *                  family_size: 0
 *                  monthlyIncome: 1000.00
 *                  address: "904 E. Hartson Ave"
 *                  state: "WA"
 *                  cityName: "Spokane"
 *                  zipCode: 99202
 *
 *                - id: "00u4o1ofebvodClCm5d6"
 *                  email: "landlord@gmail.com"
 *                  firstName: "John"
 *                  lastName: "Shelby"
 *                  role: landlord
 *                  isRequestingAssistance: true
 *                  requestStatus: "received"
 *                  familySize: 0
 *                  monthlyIncome: null
 *                  address: "904 E. Hartson Ave"
 *                  state: "WA"
 *                  cityName: "Spokane"
 *                  zipCode: 99202
 *      500:
 * */
router.get('/', authRequired, restrictTo('admin'), async (req, res) => {
  try {
    let users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /requests:
 *  get:
 *    summary: Attempts to request all users that have request for assistance
 *    description:
 *      add the description of what this endpoint does here
 *    security:
 *      - okta: []
 *    tags:
 *      - users
 *    responses:
 *      200:
 *        description: Returns an array of objects that contain the data for all users with at minimum a request with a status of recieved
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: add a description here
 *              items:
 *                anyOf:
 *                  - $ref: '#/components/schemas/User'
 *                example:
 *                  - id: "00u4o1ofebvodClCm5d6"
 *                    email: "landlord@gmail.com"
 *                    firstName: "John"
 *                    lastName: "Shelby"
 *                    role: landlord
 *                    isRequestingAssistance: true
 *                    requestStatus: "received"
 *                    familySize: 0
 *                    monthlyIncome: null
 *                    address: "904 E. Hartson Ave"
 *                    state: "WA"
 *                    cityName: "Spokane"
 *                    zipCode: 99202
 *      500:
 *       $ref: '#/components/responses/ServerError'
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
 *      201:
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

router.post('/', authRequired, restrictTo('admin'), async (req, res) => {
  try {
    // Create user

    const newUser = await Users.create(req.body);

    // hide password

    newUser[0]['password'] = undefined;

    // Send back the newly created user

    res.status(201).json({
      user: newUser[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

/**
 * @swagger
 * /{id}:
 *  get:
 *    summary: Attempts to request the users profile with the specified id.
 *    description:
 *      Sends a request to retrieve all the data in the users table for the user with the specified ID
 *    security:
 *      - okta: []
 *    tags:
 *      - users
 *    parameters:
 *      - $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Returns all the data about a user with the specified id
 *        content:
 *          application/json:
 *            schema:
 *              description: add a description here
 *              items:
 *                anyOne:
 *                  - $ref: '#/components/responses/Success'
 *                example:
 *                  - id: "00u4o3bmgukEv4uzA5d6"
 *                    email: "admin@gmail.com"
 *                    firstName: "Tommy"
 *                    lastName: "Shelby"
 *                    role: "admin"
 *                    isRequestingAssistance: false
 *                    requestStatus: "pending"
 *                    familySize: 2
 *                    monthlyIncome: 2000.00
 *                    addressId: 1
 *                    organizationId: 3
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
 *    summary: Attempts to request the address of the current user
 *    description:
 *      add the description of what this endpoint does here
 *    security:
 *      - okta: []
 *    tags:
 *      - users
 *    parameters:
 *      - $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Returns the users address
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: The address of the user with the id given in the parameters
 *              items:
 *                anyOne:
 *                  - $ref: '#/components/responses/Success'
 *                example:
 *                  - address:
 *                      - address: "904 E. Hartson Ave"
 *                        state: "WA"
 *                        cityName: "Spokane"
 *                        zipCode: 99202
 *
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
 *      500:
 * */
router.put('/:id', authRequired, restrictTo('admin'), async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, payload);
    res.status(200).json({ user: updatedUser[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal service error' });
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
