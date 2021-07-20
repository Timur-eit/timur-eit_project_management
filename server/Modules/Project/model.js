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
exports.readProjectById = exports.removeProject = exports.updateProject = exports.readAllProjects = exports.createProject = void 0;
const database_1 = __importDefault(require("../../database"));
const sqlCreateProject = { text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text' };
const sqlSelectProjectList = { text: 'SELECT * FROM projects' };
const sqlUpdateProject = { text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3' };
const sqlDeleteProject = { text: 'DELETE FROM projects WHERE id = $1' };
const sqlSelectProjectById = (id) => ({ text: `SELECT * FROM projects WHERE id = ${id}` });
const sqlSelectProjectByCode = { text: 'SELECT * FROM projects WHERE code = $1' };
const createProject = (name, code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query(sqlSelectProjectByCode, [code]);
    const { rows } = data;
    if (rows.length) {
        return { status: 400, data: { rows: 'project code already exist' } };
    }
    return { status: 200, data: yield database_1.default.query(sqlCreateProject, [name, code]) };
});
exports.createProject = createProject;
const readAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query(sqlSelectProjectList);
    return { status: 200, data };
});
exports.readAllProjects = readAllProjects;
const updateProject = (name, code, id) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 200, data: yield database_1.default.query(sqlUpdateProject, [name, code, id]) };
});
exports.updateProject = updateProject;
const removeProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 200, data: yield database_1.default.query(sqlDeleteProject, [id]) };
});
exports.removeProject = removeProject;
const readProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 200, data: yield database_1.default.query(sqlSelectProjectById(id)) };
});
exports.readProjectById = readProjectById;
//# sourceMappingURL=model.js.map