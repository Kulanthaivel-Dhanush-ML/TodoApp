import { configureStore } from "@reduxjs/toolkit";
import AddItemSlice from "../components/AddItem/AddItemSlice";
import TodoListSlice from "../components/TodoList/TodoSlice";
import {TodoItem} from "../components/TodoItem/TodoItem";
import { Tag } from "../components/TodoList/TodoSlice";
export interface RootState {
  addItem:{ 
  form: {
      name: string;
      description: string;
      priority: string;
      date: string;
      fromtime: string;
      totime: string;
      tag: string;
      status: 'not-completed' | 'completed';
    };
    minDate: string;
  }
  todo:
  {
    items: { [key: string]: TodoItem };
        filteredItems: { [key: string]: TodoItem };
        clickedItem: string | null;
        itemToDelete: string | null;
        statusFilter: string;
        priorityFilter: string;
        dateFilter: string;
        tagFilter: Tag[];
        availableTags: Tag[];
        showDeleteConfirm: boolean;
  }
}

const store = configureStore({
    devTools:true,
    reducer:{
        addItem:AddItemSlice,
        todo:TodoListSlice,
    },
})

export default store;