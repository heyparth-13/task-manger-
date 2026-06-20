const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { users: [], tasks: [] };
      writeDB(initialData);
      return initialData;
    }
    throw error;
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

module.exports = { readDB, writeDB, generateId };
