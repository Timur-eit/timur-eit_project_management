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
exports.getProject = exports.projectList = exports.projectUpdate = exports.projectCreate = exports.projectDelete = void 0;
const model_1 = require("./model");
const projectCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const { name, code } = reqBody; // controller
    const { statusCode, data: { rows } } = yield model_1.createProject(name, code); // model
    res.status(statusCode).send(rows); // controller
});
exports.projectCreate = projectCreate;
const projectList = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, data: { rows } } = yield model_1.readAllProjects();
    res.status(statusCode).send(rows);
});
exports.projectList = projectList;
const projectUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { name, code, id } } = req;
    const { statusCode, data: { rows } } = yield model_1.updateProject(name, code, id);
    res.status(statusCode).send(rows);
});
exports.projectUpdate = projectUpdate;
const projectDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { id } } = req;
    const { statusCode } = yield model_1.removeProject(id);
    res.status(statusCode).send("success");
});
exports.projectDelete = projectDelete;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { statusCode, data: { rows } } = yield model_1.readProjectById(id);
    res.status(statusCode).send(rows);
});
exports.getProject = getProject;
//# sourceMappingURL=controller.js.map