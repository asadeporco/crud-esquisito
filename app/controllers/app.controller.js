const App = require("../model/app.model.js");
const { createTodo, deleteTodo, getTodoById, getAllTodos } = require("../service/app.service.js");
require('../service/app.service.js');

exports.create = (req, res) => {
  const incomingData = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  }
  const todo = new App(incomingData);

  todo
    .save()
    .then((data) => {
      createTodo({id: data.id, ...incomingData})
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};
exports.findAll = (req, res) => {
  getAllTodos().then(todos => {
    res.send(todos);
  })
};

exports.findOne = (req, res) => {
  getTodoById(req.params.messageId).then(todo => {
   
    if (!todo) {
      return res.status(404).send({
        message: "deu ruim " + req.params.messageId,
      });
    };

    res.send(todo)
  }).catch((err) => {
    res.status(500).send({
      message: "Deu ruim " + req.params.messageId,
    })
  })
};

exports.update = (req, res) => {
  const incomingData = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  }
  App.findByIdAndUpdate(
    req.params.messageId,
    incomingData,
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      createTodo({id: data.id, ...incomingData})
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.messageId,
      });
    });
};

exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      deleteTodo(data.id)
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.messageId,
      });
    });
};