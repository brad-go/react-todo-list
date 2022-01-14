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
    }))
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

// trouble shooting
// 로컬스토리지에 가지고 있는 todo들이 있으면 savedTodos변수에 담아서
// setTodos()를 이용해서 todos를 변경하려고 했다. 
// problem
// Too many re-renders. React limits the number of renders to prevent an infinite loop.
// react가 계속 상태를 업데이트하면서 끊임없이 parsedTodos를 todos로
// 변경하는 문제였다. 
// solve
// useEffect를 사용하는 방법으로 해결했다. useEffect는 컴포넌트가 렌더링
// 될 때마다 특정 작업을 실행할 수 있게 해주는 리액트 훅이다. 
// class 형식으로 컴포넌트를 만들 때 사용하는 componentDidMount, componentDidUpdate, componentDidUnMount
// 등의 상황에 특정 작업을 처리할 수 있다. 
// useEffect(실행하고자 하는 함수, 배열(검사하고자 하는 특정값, 빈배열))
// 컴포넌트가 화면에 가장 처음 렌더링될 때만 함수를 실행하고 싶다면 deps에
// 빈배열을 넣으면 된다. -> 이것으로 문제해결!!

// problem - saveTodo가 마지막 input을 로컬 스토리지에 제출이 한 번 더 일어나지 않으면 저장못함
// solve
// savetodo를 없애고 useEffect를 이용해서 todos배열을 감지하게함
// useState의 setter함수는 비동기로 작동
// 비동기성을 동기성으로 동기화 시켜주기 위해서 
// useEffect를 사용 첫 렌더링 시에도, 배열이 변경될 때도 감지해서 렌더링해줌

// problem - 로컬스토리지에 저장하는 훅을 만들었는데, useEffect를 통해
// 로컬스토리지에 todo를 저장하는 훅을 만드니까 갑자기 동작안함
// solve
// useEffect의 위치가 중요했다. 위로 두니까 멀쩡히 동작했다. 