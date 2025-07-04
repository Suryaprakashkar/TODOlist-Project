import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const saveEdit = (index) => {
    const trimmed = editText.trim();
    if (trimmed) {
      const newTasks = [...tasks];
      newTasks[index].text = trimmed;
      setTasks(newTasks);
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };

  return (
    <div className="app-container">
      <h1>📝 To-Do List</h1>
      <div className="task-input-wrapper">
        <input
          className="task-input"
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li className="task-item" key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            {editingIndex === index ? (
              <input
                className="task-input"
                value={editText}
                onChange={handleEditChange}
                onBlur={() => saveEdit(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus
              />
            ) : (
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
                onDoubleClick={() => startEditing(index)}
              >
                {task.text}
              </span>
            )}
            <button className="delete-button" onClick={() => deleteTask(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
