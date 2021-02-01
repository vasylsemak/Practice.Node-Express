/* eslint-disable no-unused-vars */
'use strict';

const express = require('express')
const router = express.Router()

const funcs = require('../models/todos')
const { listPeople, list, add, complete, remove } = funcs


// GET '/users'
router.get('/', (req, res, next) => {
  try {
    const users = listPeople()
    res.json(users)
  } catch(err) { next(err) }
})


// 'spesific user'
router
  .get('/:name/tasks', (req, res, next) => {
    try {
      const tasksStatus = req.query.status
      let userTasks = list(req.params.name)

      if(!userTasks) return res.sendStatus(404)

      if(tasksStatus === 'complete') {
        userTasks = userTasks.filter(t => t.complete === true)
      } else if(tasksStatus === 'active') {
        userTasks = userTasks.filter(t => t.complete === false)
      }

      res.json(userTasks)
    } catch(err) { next(err) }
  })
  .post('/:name/tasks', (req, res, next) => {
    try {
      if(!req.body.content) return res.status(400).send("No content")
      const newTask = add(req.params.name, req.body)
      res.status(201).json(newTask)
    } catch(err) { next(err) }
  })


// 'specific user's task
router
  .put('/:name/tasks/:taskIdx', (req, res, next) => {
    try {
      const name = req.params.name
      const idx = req.params.taskIdx
      const completed = complete(name, idx)

      if(!completed) return res.status(404).send("No task found")
      const afterComplete = list(name)
      res.status(200).json(afterComplete)
    } catch(err) { next(err) }
  })
  .delete('/:name/tasks/:taskIdx', (req, res, next) => {
    try {
      const name = req.params.name
      const idx = req.params.taskIdx
      const removed = remove(name, idx)

      if(!removed) return res.status(404).send("No task found")
      const afterRemove = list(name, idx)
      res.status(204).json(afterRemove)
    } catch(err) { next(err) }
  })




module.exports = router
