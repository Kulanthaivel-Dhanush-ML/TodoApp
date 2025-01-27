import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoContext is not available!");
  }

  return context;
};

export default useTodoContext;
