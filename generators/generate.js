const faker = require('faker');

/**
 * This file includes generator data for testing
 * */

// address data
const getAddress = () => faker.address.streetAddress();
const getCity = () => faker.address.city();
const getState = () => faker.address.stateAbbr();
const getZipCode = () => faker.address.zipCode();

// profile data
const getOktaId = () => faker.random.alphaNumeric(20);
const getEmail = () => faker.internet.email();
const getName = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
const getAssistanceReq = () => faker.random.boolean();
const getRequestStatus = () =>
  faker.random.arrayElement(['recieved', 'inReview', 'approved', 'denied']);
const getRole = () =>
  faker.random.arrayElement([
    'pending',
    'tenant',
    'landlord',
    'admin',
    'programManger',
  ]);

// Random ID
const getId = () => faker.random.number();

// Location data
const getAddress = () => faker.address.streetAddress();
const getPhoneNumber = () => faker.phone.phoneNumberFormat();

// organization data
const getOrganization = () => faker.company.companyName();

// User
function buildUser() {
  return {
    id: getOktaId(),
    email: getEmail(),
    name: getName(),
    address: getAddress(),
    city: getCity(),
    state: getState(),
    zip: getZipCode(),
    role: getRole(),
    requestStatus: getRequestStatus(),
  };
}

/**
 * Build organization data
 * */
function buildOrgs() {
  return {
    id: getId(),
    organization: getOrganization(),
  };
}

// Location
function buildLocation() {
  return {
    id: getId(),
    address: getAddress(),
    city: getCity(),
    state: getState(),
    zip: getZipCode(),
  };
}

// Response
function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('res.json'),
    status: jest.fn(() => res).mockName('res.status'),
    ...overrides,
  };
  return res;
}

// Request
function buildReq(overrides = {}) {
  const req = {
    body: {},
    params: {},
    ...overrides,
  };
  return req;
}

module.exports = {
  getId,
  getOktaId,
  getEmail,
  getName,
  getAddress,
  getLocationName,
  getPhoneNumber,
  getCity,
  getState,
  getZipCode,
  buildUser,
  buildLocation,
  buildRes,
  buildReq,
};
