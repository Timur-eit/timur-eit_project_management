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
exports.getProject = exports.projectList = exports.projectUpdate = exports.projectCreate = exports.projectDelete = void 0;
var model_1 = require("./model");
var projectCreate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, name, code, _a, status, rows;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reqBody = req.body;
                name = reqBody // controller
                .name, code = reqBody // controller
                .code;
                return [4 /*yield*/, model_1.createProject(name, code)]; // model
            case 1:
                _a = _b.sent() // model
                , status = _a.status, rows = _a.data.rows;
                res.status(status).send(rows); // controller
                return [2 /*return*/];
        }
    });
}); };
exports.projectCreate = projectCreate;
var projectList = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status, rows;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, model_1.readAllProjects()];
            case 1:
                _a = _b.sent(), status = _a.status, rows = _a.data.rows;
                res.status(status).send(rows);
                return [2 /*return*/];
        }
    });
}); };
exports.projectList = projectList;
var projectUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, code, id, _b, status, rows;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, code = _a.code, id = _a.id;
                return [4 /*yield*/, model_1.updateProject(name, code, id)];
            case 1:
                _b = _c.sent(), status = _b.status, rows = _b.data.rows;
                res.status(status).send(rows);
                return [2 /*return*/];
        }
    });
}); };
exports.projectUpdate = projectUpdate;
var projectDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, model_1.removeProject(id)];
            case 1:
                status = (_a.sent()).status;
                res.status(status).send("success");
                return [2 /*return*/];
        }
    });
}); };
exports.projectDelete = projectDelete;
var getProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, field, _a, status, rows;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                field = typeof req.query.field === "string" ? req.query.field : undefined;
                return [4 /*yield*/, model_1.readProjectById(id, field)]; // express types error - see below 
            case 1:
                _a = _b.sent() // express types error - see below 
                , status = _a.status, rows = _a.data.rows;
                res.status(status).send(rows);
                return [2 /*return*/];
        }
    });
}); };
exports.getProject = getProject;
//# sourceMappingURL=controller.js.map