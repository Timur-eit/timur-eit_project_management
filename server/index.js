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
const express_1 = __importDefault(require("express"));
const constants_1 = __importDefault(require("./constants"));
const router_1 = __importDefault(require("./Modules/Project/router"));
const router_2 = __importDefault(require("./Modules/Task/router"));
const app = express_1.default();
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use('/projects', router_1.default);
app.use('/projects', router_2.default);
app.use('/tasks', router_2.default);
app.listen(constants_1.default.port, () => {
    const date = new Date();
    console.log(`Server has been loaded on ${constants_1.default.port} port at ${date}`);
});
//# sourceMappingURL=index.js.map