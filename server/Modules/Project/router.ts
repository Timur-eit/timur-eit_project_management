const express = require('express')
const {projectDelete, projectCreate, projectUpdate, projectList, getProject} = require('./controller')

const router = express.Router()

interface IPath {
  [property: string]: string
}

const path: IPath = {
  root: '/',
  id: '/:id/',
}

router.post(path.root, projectCreate)
router.get(path.root, projectList)
router.get(path.id, getProject)
router.put(path.root, projectUpdate)
router.delete(path.root, projectDelete)

module.exports = router