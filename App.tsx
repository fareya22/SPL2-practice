import React, { useState } from "react";
import "./App.css";
import InputField from "./Components/InputField";
import { Todo } from "./Components/model";
import TodoList from "./Components/TodoList";
import ProductList from "./Components/product/ProductList";
import ProductForm from "./Components/product/ProductForm";
import UserForm from "./Components/user/UserForm";
import UserList from "./Components/user/UserList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">TodoList</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
      <ProductForm/>
      <ProductList />
      <UserForm/>
      <UserList/>
    </div>
  );
};

export default App;