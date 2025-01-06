import { FC } from "react";
import TextField from "./components/TextField/TextField.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import DisplayTodo from "./components/Display/DisplayTodo.tsx";
const App:FC = () =>
{
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/AddItem" element={<TextField/>}></Route>
        <Route index element={<DisplayTodo/>}></Route>
      </Routes></BrowserRouter>
    </>
  )
};

export default App;