import React from 'react';
import '../App.css';

const TodoItems = (props) => {
  let isDone = false;

  const handleToggleList = (e) => {
    isDone = !isDone;
    
    if (isDone) {
      e.target.className = "todo-list__items-done";
    } else {
      e.target.className = "todo-list__items";
    }
  }

  const handleBtnHoverOn = (e) => {
    const li = e.target.parentNode.parentNode;
    li.className = "todo-list__items-hover";
  }

  const handleBtnHoverOut = (e) => {
    const li = e.target.parentNode.parentNode;
    li.className = "todo-list__items";
  }

  const items = props.todos.map((item, idx) => {

    return (
      <li key={idx} id="todoList" className="todo-list__items" onClick={(e) => handleToggleList(e, idx)}>
        <span className="todo-list__item">{item}</span>
        <span>
          <button id="deleteBtn" className="todo-list__btns" onClick={(e) => { e.stopPropagation(); props.deleteTodo(idx) }} onMouseOver={(e) => handleBtnHoverOn(e)} onMouseOut={(e) => handleBtnHoverOut(e)} >❌</button>
        </span>
      </li>
    )
  });

  return items;
}

const TodoList = (props) => {
  const {todos, deleteTodo } = props;

  return (
    <ul className="todo-list">
      <TodoItems todos={todos} deleteTodo={deleteTodo} />
    </ul>
  )
}

export default TodoList;

