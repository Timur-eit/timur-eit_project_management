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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProjectById = exports.removeProject = exports.updateProject = exports.readAllProjects = exports.createProject = void 0;
var DBConnection = require('../../database');
var sqlCreateProject = { text: 'INSERT INTO projects (name, code) VALUES ($1::text, $2::text) RETURNING id::integer, name::text, code::text' };
var sqlSelectProjectList = { text: 'SELECT * FROM projects' };
var sqlUpdateProject = { text: 'UPDATE projects SET name = $1, code = $2 WHERE id = $3' };
var sqlDeleteProject = { text: 'DELETE FROM projects WHERE id = $1' };
var sqlSelectProjectById = function (field) { return ({ text: "SELECT " + field + " FROM projects WHERE id = $1" }); };
var sqlSelectProjectByCode = { text: 'SELECT * FROM projects WHERE code = $1' };
var dbRequest = function (params, fields) { return DBConnection.query(params, fields); };
var createProject = function (name, code) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, dbRequest(sqlSelectProjectByCode, [code])];
            case 1:
                rows = (_b.sent()).rows;
                if (rows.length) {
                    return [2 /*return*/, { status: 400, data: { rows: 'project code already exist' } }];
                }
                _a = { status: 200 };
                return [4 /*yield*/, dbRequest(sqlCreateProject, [name, code])];
            case 2: return [2 /*return*/, (_a.data = _b.sent(), _a)];
        }
    });
}); };
exports.createProject = createProject;
var readAllProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = { status: 200 };
                return [4 /*yield*/, dbRequest(sqlSelectProjectList)];
            case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
        }
    });
}); };
exports.readAllProjects = readAllProjects;
var updateProject = function (name, code, id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = { status: 200 };
                return [4 /*yield*/, dbRequest(sqlUpdateProject, [name, code, id])];
            case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
        }
    });
}); };
exports.updateProject = updateProject;
var removeProject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = { status: 200 };
                return [4 /*yield*/, dbRequest(sqlDeleteProject, [id])];
            case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
        }
    });
}); };
exports.removeProject = removeProject;
var readProjectById = function (id, field) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = { status: 200 };
                return [4 /*yield*/, DBConnection.query(sqlSelectProjectById(field), [id])];
            case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
        }
    });
}); };
exports.readProjectById = readProjectById;
//# sourceMappingURL=model.js.map