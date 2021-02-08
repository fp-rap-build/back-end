const db = require("../../../data/db-config");

const findAll = async (query={}) => await db("users").modify(qb => {
  if(query.is_requesting_assistance) {
    qb.where({ is_requesting_assistance: true })
  }
});

const findBy = (filter) => db("users").where(filter);

const findById = async (id) => db("users").where({ id }).first("*");

const findByOktaId = async (okta_id) => db("users").where({ okta_id });

const create = async (profile) => db("users").insert(profile).returning("*");

const update = (id, profile) => {
  console.log(profile);
  return db("users").where({ id }).first().update(profile).returning("*");
};

const remove = async (id) => await db("users").where({ id }).del();

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  }

  let newAddress = await db('addresses').insert({}).returning('*')

  profileObj["address_id"] = newAddress[0].id

  console.log(profileObj)
  console.log(newAddress)

  return await create(profileObj).then((newProfile) =>
    newProfile ? newProfile[0] : newProfile
  );
};

module.exports = {
  findAll,
  findBy,
  findById,
  findByOktaId,
  create,
  update,
  remove,
  findOrCreateProfile,
};
