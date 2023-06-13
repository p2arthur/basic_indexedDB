import React from 'react';
import './App.css';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

const db = new Dexie('todoApp');
db.version(1).stores({
  todos: '++id,task,completed',
});

const { todos } = db;

const App = () => {
  const allItems = useLiveQuery(() => todos.toArray(), []);

  console.log('====>', allItems);

  const addTask = async (event) => {
    event.preventDefault();
    const taskField = document.querySelector('#text-input');
    console.log('====>', taskField.value);

    await todos.add({ task: taskField.value, completed: false });
    taskField.value = '';
  };

  return (
    <div className="container">
      <h3 className="teal-text center-align">Todo App</h3>
      <form className="add-item-form" onSubmit={addTask}>
        <input
          type="text"
          id="text-input"
          className="itemField"
          placeholder="What do you want to do today?"
          required
        />
        <button type="submit" className="waves-effect btn teal right">
          Add
        </button>
      </form>

      <div className="card white darken-1">
        <div className="card-content">
          {allItems?.map((todo) => {
            return (
              <div className="row">
                <p className="col s10">
                  <label>
                    <input type="checkbox" checked className="checkbox-blue" />
                    <span className="black-tex strike-text">{todo.task}</span>
                  </label>
                </p>
                <i className="col s2 material-icons delete-button">delete</i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
