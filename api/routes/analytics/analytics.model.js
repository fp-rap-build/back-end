const db = require('../../../data/db-config')

const getRequestStatus = () => {
    return db.count("requestStatus").from("requests").where("requestStatus", "=", "approved");
}

module.exports = {getRequestStatus}