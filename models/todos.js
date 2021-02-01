'use strict';

let tasks = {}; // a place to store tasks by person

let f = {
  reset: function () {
    tasks = {};
  },

  listPeople: function () {
    return Object.keys(tasks)
  },

  add: function (name, task) {
    if(task.complete === undefined) task.complete = false
    if(!tasks[name]) tasks[name] = []
    tasks[name].push(task)

    return task
  },

  list: function (name) {
    return tasks[name]
  },

  complete: function (name, taskIdx) {
    tasks[name][taskIdx].complete = true
    return tasks[name][taskIdx]
  },

  remove: function (name, taskIdx) {
    tasks[name].splice(taskIdx, 1)
    return tasks[name][taskIdx]
  }
};

module.exports = f
