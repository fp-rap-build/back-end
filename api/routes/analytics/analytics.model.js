const db = require('../../../data/db-config');

const getFamiliesServed = () => {
  return db
    .count('requestStatus')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};

const getPeopleServed = () => {
  return db
    .sum('familySize')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};

const getChildrenServed = () => {
  return db
    .sum('totalChildren')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};

const getOrgBudget = (orgId) => {
  return db
    .select("budget")
    .from("requests")
    .where('id', '=', orgId);
}
module.exports = { getFamiliesServed, getPeopleServed, getChildrenServed };
