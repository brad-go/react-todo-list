import React, { useState } from 'react';
import '../App.css';

const CreateTodo = (props) => {
  const initialState = '';

  const [ todo, setTodo ] = useState(initialState);

  const handleChange = (e) => {
    const newTodo = e.target.value;
    setTodo(newTodo);
  }

  const submitForm = (e) => {
    e.preventDefault();
    props.handleSubmit(todo);
    setTodo(initialState);
  }

  return (
    <form className="todo-create">
      <input id="add" className="todo-create__input" type="text" value={todo} onChange={handleChange} placeholder="Add a new Todo"/>
      <button className="todo-create__btn" onClick={submitForm}>Add</button>
    </form>
  );
}

export default CreateTodo; 