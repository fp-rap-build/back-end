const db = require('../../../data/db-config');
const bcrypt = require('bcryptjs');

const findAll = async (query = {}) =>
  await db('users as u')
    .join('addresses as a', 'u.addressId', '=', 'a.id')
    .select(
      'u.id',
      'u.email',
      'u.firstName',
      'u.lastName',
      'u.role',
      'u.familySize',
      'u.monthlyIncome',
      'a.address',
      'a.state',
      'a.cityName',
      'a.zipCode'
    )
    .modify((qb) => {
      if (query.isRequestingAssistance) {
        qb.where({ isRequestingAssistance: true });
      }
    });

const findBy = async (filter) => await db('users').where(filter);

const findById = async (id) => db('users').where({ id }).first('*');

const findByIdAndUpdate = async (id, payload) =>
  await db('users').where({ id }).update(payload).returning('*');

const findByIdAndDelete = async (id) => await db('users').where({ id }).del();

const findAddressByUserId = async (id) =>
  await db('users')
    .where('users.id', id)
    .join('addresses', 'users.addressId', '=', 'addresses.id')
    .select(
      'addresses.address',
      'addresses.state',
      'addresses.cityName',
      'addresses.zipCode'
    );

const findOrCreateAddress = async (user) => {
  if (!user.addressId) {
    let address = await db('addresses').insert({}).returning('*');
  }
};

const updateAddressById = async (addressId, payload) =>
  await db('addresses').where({ id: addressId }).update(payload).returning('*');

const create = async (user) => {
  // Create an empty address for the user and set the addressId

  let newAddress = await db('addresses').insert({}).returning('*');

  user['addressId'] = newAddress[0].id;

  // Encrypt password

  user['password'] = await bcrypt.hash(user['password'], 12);

  return db('users').insert(user).returning('*');
};

const update = (id, profile) => {
  return db('users').where({ id }).first().update(profile).returning('*');
};

const remove = async (id) => await db('users').where({ id }).del();

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  }

  // Create an empty address for the user and set the addressId

  let newAddress = await db('addresses').insert({}).returning('*');

  profileObj['addressId'] = newAddress[0].id;

  return await create(profileObj).then((newProfile) =>
    newProfile ? newProfile[0] : newProfile
  );
};

module.exports = {
  findAll,
  findBy,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
  update,
  remove,
  findOrCreateProfile,
  findAddressByUserId,
  findOrCreateAddress,
  updateAddressById,
};
