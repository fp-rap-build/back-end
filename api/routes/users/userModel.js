const db = require('../../../data/db-config');

const findAll = async (query = {}) =>
	await db('users').modify((qb) => {
		if (query.isRequestingAssistance) {
			qb.where({ isRequestingAssistance: true });
		}
	});

const findBy = (filter) => db('users').where(filter);

const findById = async (id) => db('users').where({ id }).first('*');

const findByIdAndUpdate = async (id, payload) => await db('users').where({ id }).update(payload).returning('*') 

const findAddressByUserId = async (id) =>
	await db('users')
		.where('users.id', id)
		.join('addresses', 'users.addressId', '=', 'addresses.id')
		.select('addresses.address', 'addresses.state', 'addresses.cityName', 'addresses.zipCode');

const findOrCreateAddress = async (user) => {
	if (!user.address_id) {
		let address = await db('addresses').insert({}).returning('*');
	}
};

const updateAddressById = async (address_id, payload) =>
	await db('addresses').where({ id: address_id }).update(payload).returning('*');

const findByOktaId = async (okta_id) => db('users').where({ okta_id });

const create = async (profile) => db('users').insert(profile).returning('*');

const update = (id, profile) => {
	console.log(profile);
	return db('users').where({ id }).first().update(profile).returning('*');
};

const remove = async (id) => await db('users').where({ id }).del();

const findOrCreateProfile = async (profileObj) => {
	const foundProfile = await findById(profileObj.id).then((profile) => profile);
	if (foundProfile) {
		return foundProfile;
	}

  // Create an empty address for the user and set the address_id

	let newAddress = await db('addresses').insert({}).returning('*');

	profileObj['addressId'] = newAddress[0].id;

	return await create(profileObj).then((newProfile) => (newProfile ? newProfile[0] : newProfile));
};

module.exports = {
	findAll,
	findBy,
	findById,
	findByIdAndUpdate,
	findByOktaId,
	create,
	update,
	remove,
	findOrCreateProfile,
	findAddressByUserId,
	findOrCreateAddress,
  updateAddressById
};
