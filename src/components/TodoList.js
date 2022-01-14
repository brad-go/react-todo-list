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

// problem
// li를 클릭 시 발생하는 handleToggleList() 이벤트가 하위 요소들에게도 전파되는 현상
// solve
// e.stopPropagation()을 이용해서 간단히 막을 수 있었다. 

// problem
// 버튼에 hover 시 li의 색상을 바꾸고 싶었는데, css에서 hover 시에
// 상위 요소를 선택 하기는 쉽지 않았다. 방법을 찾을 수 없어서 결국
// javascript를 이용했다. 처음에는 useState를 사용해서 해결하려고 했지만
// useState가 비동기로 동작하기 때문에 동작이 하나씩 느렸다. 
// useEffect를 사용해서는 e.target인자를 어떻게 전달해야 할지 생각이 안났다.
// 그래서 좋지 않은 방법이겠지만, isDone이라는 변수값을 이용해서
// 상태 변화에 따라 li의 클래스를 직접 변경했다. 