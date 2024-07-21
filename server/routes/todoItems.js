const router = require("express").Router();

const todoItem = require("../models/todoItem");
const Todo = require("../models/todoItem");

router.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      isCompleted: req.body.isCompleted,
    });
    const saveTodo = await newTodo.save();
    res.status(200).json(saveTodo);
  } catch (err) {
    res.json(err);
  }
});

router.get("/todos", async (req, res) => {
  try {
    const getAllTodos = await todoItem.find({});
    res.status(200).json(getAllTodos);
  } catch (err) {
    res.json(err);
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const updateTodo = await todoItem.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateTodo);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const deleteTodo = await todoItem.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteTodo);
  } catch (err) {
    res.json(err);
  }
});

router.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.isCompleted = !isCompleted;

  todo.save();

  res.json(todo);
});

module.exports = router;
