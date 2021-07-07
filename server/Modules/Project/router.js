const express = require('express')
const {projectDelete, projectCreate, projectUpdate, projectList, getProject} = require('./controller')

const router = express.Router()

router.post('/', projectCreate)
router.get('/', projectList)
router.get('/:id/', getProject)
router.put('/', projectUpdate)
router.delete('/', projectDelete)


module.exports = router