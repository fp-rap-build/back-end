const db = require('../../../data/db-config')

const getFamiliesServed = () => {
    return db.count("familySize").from("requests").where("requestStatus", "=", "approved");
};

const getPeopleServed = () => {
    return db.count("requestStatus").from("requests").where("requestStatus", "=", "approved");
}
module.exports = {getFamiliesServed, getPeopleServed}