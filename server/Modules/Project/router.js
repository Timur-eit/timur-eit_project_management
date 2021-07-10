var express = require('express');
var _a = require('./controller'), projectDelete = _a.projectDelete, projectCreate = _a.projectCreate, projectUpdate = _a.projectUpdate, projectList = _a.projectList, getProject = _a.getProject;
var router = express.Router();
var path = {
    root: '/',
    id: '/:id/'
};
router.post(path.root, projectCreate);
router.get(path.root, projectList);
router.get(path.id, getProject);
router.put(path.root, projectUpdate);
router["delete"](path.root, projectDelete);
module.exports = router;
