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

// trouble shooting
// 원하던 동작
// submitForm함수를 통해서 새로운 투두를 작성해 제출하면 인풋값이 비워지길 원했다. 
// problem
// setTodo를 통해서 인풋값을 초기값으로 변경해도 인풋창에는
// 텍스트가 그대로 남아있었고 그 상태로 한 번더 제출하면 입력값이 변경되기 전까지는
// 입력값이 써있어도 공백 상태의 투두가 추가되었었다. 
// solve
// submitForm의 e.target.parentNode[0].value를 통해 인풋값을 직접 바꿀 수 있었다. 
// 그러나 input의 value값으로 상태(state)값인 todo를 전달했다. 