const { request } = require('express');
const Users = require('../../userModel');
const Orgs = require('../../../organizations/org-model');

exports.getCurrentUser = async (req, res) => {
  let { user } = req;

  try {
    let requests = await Users.findRequestsByUserId(user.id);

    let organization = await Orgs.findById(user.organizationId);

    user['requests'] = requests;
    user['organization'] = organization;

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json('internal server error');
  }
};

exports.updateCurrentUser = async (req, res) => {
  const { id } = req.user;

  let role = req.body['role'];

  // Users can't update their role to admin or program manager

  if (role == 'admin' || role == 'programManager') {
    return res.status(401).json({ message: 'Nice try' });
  }

  let payload = req.body;

  try {
    let updatedUser = await Users.findByIdAndUpdate(id, payload);

    res.status(200).json({ user: updatedUser[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCurrentUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    await Users.findByIdAndDelete(id);

    res.status(204).json({ message: 'User was successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
