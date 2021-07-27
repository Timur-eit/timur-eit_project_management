"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controller_1 = require("./controller");
const router = express.Router();
router.get('/', controller_1.getAllTasks);
router.post('/:project_id/tasks', controller_1.taskCreate);
router.get('/:project_id/tasks', controller_1.getTasksByProject);
router.put('/:project_id/tasks/:id', controller_1.taskUpdate);
router.get('/:project_id/tasks/:id', controller_1.getTaskById);
router.delete('/:project_id/tasks/:id', controller_1.taskDelete);
exports.default = router;
//# sourceMappingURL=router.js.map