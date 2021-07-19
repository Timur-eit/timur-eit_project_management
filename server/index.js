"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * import instead of require to separate module's scope
 * https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable-typescript
 * https://www.typescriptlang.org/tsconfig#esModuleInterop
 */
var express_1 = __importDefault(require("express"));
var port = require('./constants').port;
var projectRouter = require('./Modules/Project/router');
var app = express_1.default();
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use('/projects', projectRouter);
app.listen(port, function () {
    var date = new Date();
    console.log("Server has been loaded on " + port + " port at " + date);
});
//# sourceMappingURL=index.js.map