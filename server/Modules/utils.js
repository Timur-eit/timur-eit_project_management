"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const model_1 = require("../Modules/Task/model");
function columnsExistChecker(projectId, taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectData = yield database_1.default.query(model_1.sqlSelectProjectByProjectId, [projectId]);
        const project = projectData.rows;
        let result;
        if (taskId === undefined) {
            if (project.length === 0) {
                result = { statusCode: 400, data: { rows: 'this project_id doesn\'t exist' } };
            }
            else {
                result = null;
            }
        }
        else {
            const taskData = yield database_1.default.query(model_1.sqlSelectTaskListById, [taskId]);
            const task = taskData.rows;
            if (project.length === 0) {
                result = { statusCode: 400, data: { rows: 'this project_id doesn\'t exist' } };
            }
            else if (task.length === 0) {
                result = { statusCode: 400, data: { rows: 'this task id doesn\'t exist' } };
            }
            else {
                result = null;
            }
        }
        return result;
    });
}
exports.default = columnsExistChecker;
//# sourceMappingURL=utils.js.map