var pgSettings = require('./constants').pgSettings;
var Client = require('pg').Client;
module.exports = (function () {
    var myClient = new Client(pgSettings);
    myClient.connect();
    return myClient;
})();
//# sourceMappingURL=database.js.map