import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList.js';
import CreateTodo from './components/CreateTodo.js';
import './App.css';

function App() {
  const TODOS_KEY = 'todos';

  const [ todos, setTodos ] = useState(['Try adding a new todo']);

  // 선택한 todo를 삭제해주는 함수
  const deleteTodo = (idx) => {
    // filter를 통해서 클릭한 todo의 idx와 다른 todo들만으로 새로운 배열을 만든다.
    setTodos(todos.filter((todo, i) => {
      return i !== idx;
    }));
  }

  // 새로 작성한 todo를 todos배열에 삽입시켜주는 함수
  const handleSubmit = (newTodo) => {
    if (todos.length <= 7) {
      setTodos([...todos, newTodo]);
    } else {
      alert('할 일이 너무 많네요! 먼저 할 일을 끝낸 후 새로 추가해주세요.');
    }
  }

  // 첫 렌더링 시에만 로컬스토리지에 아이템들이 있는지 확인하고 있다면 todos를 업데이트 해준다. 
  useEffect(() => {
    const savedTodos = localStorage.getItem(TODOS_KEY);
    
    if (savedTodos !== null) {
      const parsedTodos = JSON.parse(savedTodos);
      setTodos(parsedTodos);
    }
  }, [])  

  // 입력한 todo들을 로컬스토리지에 저장해서 기억하게 함
  useEffect(() => {
    if (todos.length <= 8) {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }
  }, [todos])

  return (
    <div className="container">
      <h1 className="app-title">Todo List</h1>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <CreateTodo todos={todos} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;

 