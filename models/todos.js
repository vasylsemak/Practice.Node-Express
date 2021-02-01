'use strict';

let tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks)
  },

  add: function (name, task) {
    // saves a task for a given person
    if(task.complete === undefined) task.complete = false
    if(!tasks[name]) tasks[name] = []
    tasks[name].push(task)
  },

  list: function (name) {
    return tasks[name]
  },

  complete: function (name, taskIdx) {
    tasks[name][taskIdx].complete = true
  },

  remove: function (name, taskIdx) {
    tasks[name].splice(taskIdx, 1)
  }
};
