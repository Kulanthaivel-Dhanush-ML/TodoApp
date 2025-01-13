import { FC } from "react";
import TextField from "./components/AddItem/AddItem.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import DisplayTodo from "./components/TodoList/TodoList.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
const App:FC = () =>
{
  return (
    <>
      <BrowserRouter>
      <TodoProvider><Routes>
        <Route path="/AddItem" element={<TextField/>}></Route>
        <Route index element={<DisplayTodo/>}></Route>
      </Routes></TodoProvider></BrowserRouter>
    </>
  )
};

export default App;