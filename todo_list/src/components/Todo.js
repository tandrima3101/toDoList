import React, { useEffect, useState } from "react";
function Todo() {
  //states
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  //getting localsorage's data
  let todoList = JSON.parse(localStorage.getItem("todo"));
  console.log(todoList, "TODOS");

  //setting local storage's data
  useEffect(() => {
    setTodos(todoList);
  }, []);
  console.log(todos, "TODOS LIST");

  //methods
  const accessibleClick = (onClick) => (e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };
  const addTodo = (text) => {
    let newTodos;
    if (todos != null) {
      newTodos = [{ text }, ...todos];
    } else {
      newTodos = [{ text }];
    }
    localStorage.setItem("todo", JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
  };
  const handleComplete = (e) => {
    const index = e.currentTarget.getAttribute("data-index");
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
    localStorage.setItem("todo", JSON.stringify(newTodos));
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    const index = e.currentTarget.getAttribute("data-index");
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todo", JSON.stringify(newTodos));
  };
  const handleRemovAllElement = () => {
      setTodos([]);
      localStorage.removeItem("todo");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    addTodo(inputValue);
    console.log(addTodo, "ADD TODO");
    setInputValue("");
  };

  return (
    <div className="main_container">
      <div className="inside_container">
        <h3 className="container_heading">Todo List</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Your task"
          />
          <button onClick={() => handleSubmit()}>Add</button>
        </form>
        {todos?.length === 0 && (
          <img
            src="assets/img/illustration.svg"
            alt="illustrator"
            className="image_attribute"
          />
        )}
        {!todos && (
          <img
            src="assets/img/illustration.svg"
            alt="illustrator"
            className="image_attribute"
          />
        )}
        {todos?.length > 0 && (
          <ul className="mt-3">
            {todos &&
              todos?.map(({ text, isComplete }, i) => (
                <li
                  className={isComplete ? "complete" : null}
                  data-index={i}
                  onClick={handleComplete}
                  onKeyPress={accessibleClick(handleComplete)}
                  tabIndex="0"
                  key={i}
                >
                  <div className="text">{text}</div>
                  <button
                    aria-label={`remove todo ${i}`}
                    className="remove"
                    data-index={i}
                    onClick={handleRemove}
                  />
                </li>
              ))}
          </ul>
        )}
        {todos && todos?.length > 0 && (
          <button className="removeAll" onClick={() => handleRemovAllElement()}>
            Delete All
          </button>
        )}
      </div>
    </div>
  );
}

export default Todo;
