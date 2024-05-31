import Task from './task.model.js';

export const getTasks = async (req, res) => {
  // populate se usa para incrustar todas las propiedades de user dentro del tasks
  const tasks = await Task.find({
    user: req.user.id,
  }).populate('user');
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({
    _id: id,
    user: req.user.id,
  }).populate('user');
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  return res.sendStatus(204);
};
