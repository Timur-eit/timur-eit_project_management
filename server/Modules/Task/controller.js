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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = exports.getTasksByProject = exports.taskCreate = void 0;
const model_1 = require("./model");
const taskCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const { params: { project_id } } = req;
    const { name, status, type, description } = reqBody; // controller
    console.log(name, status, type, description, project_id);
    const { statusCode, data: { rows } } = yield model_1.createTask(name, status, type, description, project_id); // model
    res.status(statusCode).send(rows); // controller
});
exports.taskCreate = taskCreate;
const getTasksByProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { project_id } } = req;
    const { statusCode, data: { rows } } = yield model_1.readAllTasksByProjectId(project_id); // model
    res.status(statusCode).send(rows); // controller
});
exports.getTasksByProject = getTasksByProject;
const getAllTasks = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, data: { rows } } = yield model_1.readAllTasks(); // model
    res.status(statusCode).send(rows);
});
exports.getAllTasks = getAllTasks;
//# sourceMappingURL=controller.js.map