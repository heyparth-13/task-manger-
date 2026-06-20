const { readDB, writeDB, generateId } = require('../config/fileDb');

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const db = readDB();
    let userTasks = db.tasks.filter(t => t.userId === req.user._id);

    // Apply status filter if provided
    if (req.query.status) {
      userTasks = userTasks.filter(t => t.status === req.query.status);
    }

    // Sort by createdAt descending
    userTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(userTasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const db = readDB();
    const task = db.tasks.find(t => t._id === req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (task.userId !== req.user._id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Please add a task title');
    }

    const newTask = {
      _id: generateId(),
      title,
      description: description || '',
      status: status || 'TODO',
      priority: priority || 'MEDIUM',
      dueDate: dueDate || null,
      userId: req.user._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const db = readDB();
    db.tasks.push(newTask);
    writeDB(db);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const db = readDB();
    const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);

    if (taskIndex === -1) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (db.tasks[taskIndex].userId !== req.user._id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = { 
      ...db.tasks[taskIndex], 
      ...req.body, 
      updatedAt: new Date().toISOString() 
    };
    
    // Prevent changing critical fields directly
    updatedTask._id = db.tasks[taskIndex]._id;
    updatedTask.userId = db.tasks[taskIndex].userId;

    db.tasks[taskIndex] = updatedTask;
    writeDB(db);

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const db = readDB();
    const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);

    if (taskIndex === -1) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (db.tasks[taskIndex].userId !== req.user._id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    db.tasks.splice(taskIndex, 1);
    writeDB(db);

    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
