const db = require('../../../data/db-config');

const findAll = async () => await db('requests');

const create = (request) => {
  return db('requests').insert(request).returning('*');
};

const remove = async (id) => await db('requests').where({ id }).del();

const update = (id, request) => {
  return db('requests').where({ id }).first().update(request).returning('*');
};

const findAllActive = () => {
  return db('requests as r')
    .join('users as tenant', 'r.tenantId', '=', 'tenant.id')
    .join('users as landlord', 'r.landlordId', '=', 'landlord.id')
    .select(
      'r.id',
      'tenant.firstName as tFirstName',
      'tenant.lastName as tLastName',
      'landlord.firstName as llFirstName',
      'landlord.lastName as llLastName',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval'
    )
    .whereNot('r.requestStatus', 'denied');
};

const findForTable = () => {
  return db('requests as r')
    .join('users as tenant', 'r.tenantId', '=', 'tenant.id')
    .join('addresses as a', 'tenant.addressId', '=', 'a.id')
    .select(
      'r.id',
      'tenant.firstName',
      'tenant.lastName',
      'tenant.email',
      'tenant.role',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval',
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    );
};

const findBy = (filter) => {
  return db('requests').where(filter);
};

module.exports = {
  findAll,
  findBy,
  create,
  remove,
  update,
  findAllActive,
  findForTable,
};
