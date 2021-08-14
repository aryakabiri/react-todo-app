import React, { useEffect, useState } from "react";

import editLogo from "./assets/edit.png";
import deleteLogo from "./assets/delete.png";

const COMPELETED = "COMPELETED";
const TODO = "TODO";
const ALL = "ALL";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([
    { id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1), value: "practice react.", status: COMPELETED },
    { id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1), value: "Send out Emails", status: TODO },
    { id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1), value: "study english.", status: TODO },
  ]);
  const [filteredTodo, setFilteredTodo] = useState(todos);
  const [filterOption, setFilterOption] = useState(ALL);
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoEditInput, setTodoEditInput] = useState("");
  const [allStatus, setAllStatus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (filterOption === ALL) {
      setFilteredTodo(todos);
    } else if (filterOption === COMPELETED || filterOption === TODO) {
      setFilteredTodo(
        todos.filter((todos) => {
          return todos.status === filterOption;
        })
      );
    }
  }, [todos, filterOption]);

  const addTodoFormSubmitHandler = (event) => {
    event.preventDefault();
    if(!todoInput){
      setError("todo cannot be empty")
      return;
    }
    setTodos((oldArray) => [
      ...oldArray,
      { id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) , value: todoInput, status: TODO },
    ]);

    setTodoInput("");
  };

  const editFormSubmitHandler = (event, id) => {
    event.preventDefault();
    if(!todoEditInput){
      alert("todo cannot be empty")
      return;
    }
    const newTodo = [...todos];
    const todoIndex = newTodo.findIndex((todo) => todo.id === id);
    newTodo[todoIndex].value = todoEditInput;
    setTodos(newTodo);
    setEditingTodo(null);
    setTodoEditInput("");
  };

  const changeTodoEditInputHandler = (event) => {
    setTodoEditInput(event.target.value);
  };

  const changeTodoInputHandler = (event) => {
    setTodoInput(event.target.value);
    if(error && event.target.value){
      setError("")
    }
  };

  const changeTodosCheckboxOnHandler = (id) => {
    const newTodo = [...todos];
    const todoIndex = newTodo.findIndex((todo) => todo.id === id);
    if(newTodo[todoIndex].status === COMPELETED && allStatus){
      setAllStatus(false)
    }
    newTodo[todoIndex].status =
      newTodo[todoIndex].status === COMPELETED ? TODO : COMPELETED;
    setTodos(newTodo);
  };

  const todoDeleteHandler = (id) => {
    const newTodo = [...todos];
    var todoIndex = newTodo.findIndex((todo) => todo.id === id);
    newTodo.splice(todoIndex, 1);
    setTodos(newTodo);
  };

  const todoEditHandler = (id, input) => {
    if (editingTodo === id) {
      setEditingTodo(null);
    } else {
      setEditingTodo(id);
      setTodoEditInput(input);
    }
  };

  return (
    <div className="app">
      <div className="d-flex justify-content-center">
        <h1>todo App</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="todo-wrapper">
          <div className="d-flex">
            <div className={"mt-1 checkbox-wrapper"}>
              <label htmlFor="mark-all">
                <input
                  id={"mark-all"}
                  checked = {allStatus}
                  onChange={(event) => {
                    const newTodo = [...todos];
                    newTodo.forEach(
                      (todo) =>
                        (todo.status = event.target.checked ? COMPELETED : TODO)
                    );
                    setAllStatus(event.target.checked)
                    setTodos(newTodo);
                  }}
                  type="checkbox"
                />
              </label>
            </div>
            <div className={"w-100"}>
              <form onSubmit={addTodoFormSubmitHandler}>
                <input
                  className="input-control"
                  onChange={changeTodoInputHandler}
                  type="text"
                  value={todoInput}
                />
              </form>
              {error ? <span className="text-danger">{error}</span> : null}
            </div>
          </div>
          <div className={"my-4"}>
            {filteredTodo.map((todo) => {
              return (
                <div
                  className="single-todo-wrapper checkbox-wrapper"
                  key={todo.id}
                >
                  <label htmlFor={"todo-" + todo.id}>
                    <input
                      id={"todo-" + todo.id}
                      onChange={() => changeTodosCheckboxOnHandler(todo.id)}
                      type="checkbox"
                      checked={todo.status === COMPELETED ? true : false}
                    />
                    {editingTodo === todo.id ? (
                      <form
                        onSubmit={(event) =>
                          editFormSubmitHandler(event, todo.id)
                        }
                      >
                        <input
                          className="input-control p-0"
                          onChange={changeTodoEditInputHandler}
                          type="text"
                          value={todoEditInput}
                        />
                      </form>
                    ) : (
                      <React.Fragment>
                        {todo.status === COMPELETED ? (
                          <del>{todo.value}</del>
                        ) : (
                          todo.value
                        )}
                      </React.Fragment>
                    )}
                  </label>
                  <div className={"todo-options"}>
                    <button
                      onClick={() => todoEditHandler(todo.id, todo.value)}
                      className={"btn p-0 todo-option-edit"}
                    >
                      <img
                        width={16}
                        height={16}
                        alt="edit"
                        src={editLogo}
                      />
                    </button>
                    <button
                      onClick={() => todoDeleteHandler(todo.id)}
                      className={"btn p-0 todo-option-delete"}
                    >
                      <img
                        width={16}
                        height={16}
                        alt="delete"
                        src={deleteLogo}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className={`btn btn-primary filter-button ${
                filterOption === ALL ? "active" : ""
              }`}
              onClick={() => {
                setFilterOption(ALL);
              }}
            >
              all
            </button>
            <button
              className={`btn btn-primary filter-button ${
                filterOption === TODO ? "active" : ""
              }`}
              onClick={() => {
                setFilterOption(TODO);
              }}
            >
              todo
            </button>
            <button
              className={`btn btn-primary filter-button ${
                filterOption === COMPELETED ? "active" : ""
              }`}
              onClick={() => {
                setFilterOption(COMPELETED);
              }}
            >
              compeleted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
