const { pgSettings } = require('./constants');
const { Client } = require('pg');
module.exports = (() => {
    const myClient = new Client(pgSettings);
    myClient.connect();
    return myClient;
})();
//# sourceMappingURL=database.js.map