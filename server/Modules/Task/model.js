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
exports.removeItem = exports.updateTask = exports.readAllTasksByProjectId = exports.readAllTasks = exports.createTask = void 0;
const database_1 = __importDefault(require("../../database"));
const sqlCreateTask = {
    text: `INSERT INTO tasks (name, description, status, type, project_id) 
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::integer) 
        RETURNING id::integer, name::text, description::text, status::text, type::text, project_id::integer`
};
const sqlSelectTaskByNameAndProjectId = {
    text: 'SELECT * FROM tasks WHERE name = $1 AND project_id = $2'
};
const sqlSelectTaskListByProjectId = {
    text: 'SELECT * FROM tasks WHERE project_id = $1'
};
const sqlSelectProjectByProjectId = {
    text: 'SELECT id FROM projects WHERE id = $1'
};
const sqlSelectAllTasks = { text: `SELECT * FROM tasks` };
const sqlUpdateTask = {
    text: 'UPDATE tasks SET name = $1, description = $2, status = $3, type = $4 WHERE id = $5'
};
const sqlDeleteItem = { text: 'DELETE FROM items WHERE id = $1' };
const createTask = (name, status, type, description, project_id) => __awaiter(void 0, void 0, void 0, function* () {
    const taskData = yield database_1.default.query(sqlSelectTaskByNameAndProjectId, [name, project_id]);
    const projectData = yield database_1.default.query(sqlSelectProjectByProjectId, [project_id]);
    const task = taskData.rows;
    const project = projectData.rows;
    if (task.length) {
        return { statusCode: 400, data: { rows: 'task name already exists in this project' } };
    }
    else if (project.length === 0) {
        return { statusCode: 400, data: { rows: 'this project_id doesn\'t exist' } };
    }
    else {
        return { statusCode: 200, data: yield database_1.default.query(sqlCreateTask, [name, status, type, description, project_id]) };
    }
});
exports.createTask = createTask;
const readAllTasksByProjectId = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    const projectData = yield database_1.default.query(sqlSelectProjectByProjectId, [project_id]);
    const { rows } = projectData;
    if (rows.length === 0) {
        return { statusCode: 400, data: { rows: 'this project_id doesn\'t exist' } };
    }
    const taskData = yield database_1.default.query(sqlSelectTaskListByProjectId, [project_id]);
    return { statusCode: 200, data: taskData };
});
exports.readAllTasksByProjectId = readAllTasksByProjectId;
const readAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query(sqlSelectAllTasks);
    return { statusCode: 200, data };
});
exports.readAllTasks = readAllTasks;
const updateTask = (name, description, status, type, id) => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 200, data: yield database_1.default.query(sqlUpdateTask, [name, description, status, type, id]) };
});
exports.updateTask = updateTask;
const removeItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 200, data: yield database_1.default.query(sqlDeleteItem, [id]) };
});
exports.removeItem = removeItem;
//# sourceMappingURL=model.js.map