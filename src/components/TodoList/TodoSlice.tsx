import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../TodoItem/TodoItem";
import { toast } from "react-toastify";
export interface Tag {
  id: string;
  label: string;
}

interface TodoListState {
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

const initialState: TodoListState = {
  items: {},
  filteredItems: {},
  statusFilter: "All",
  priorityFilter: "All",
  dateFilter: "",
  tagFilter: [],
  availableTags: [],
  clickedItem: null,
  itemToDelete: null,
  showDeleteConfirm: false,
};

const TodoListSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ [key: string]: TodoItem }>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setFilteredItems(
      state,
      action: PayloadAction<{ [key: string]: TodoItem }>,
    ) {
      state.filteredItems = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    setPriorityFilter(state, action: PayloadAction<string>) {
      state.priorityFilter = action.payload;
    },
    setDateFilter(state, action: PayloadAction<string>) {
      state.dateFilter = action.payload;
    },
    setTagFilter(state, action: PayloadAction<Tag[]>) {
      state.tagFilter = action.payload;
    },
    setAvailableTags(state, action: PayloadAction<Tag[]>) {
      state.availableTags = action.payload;
    },
    setClickedItem(state, action: PayloadAction<string | null>) {
      state.clickedItem = action.payload;
    },
    setItemToDelete(state, action: PayloadAction<string | null>) {
      state.itemToDelete = action.payload;
    },
    setShowDeleteConfirm(state, action: PayloadAction<boolean>) {
      state.showDeleteConfirm = action.payload;
    },
    handleUpdateStatus: (
      state,
      action: PayloadAction<{ name: string; status: string }>,
    ) => {
      const { name, status } = action.payload;
      const item = state.filteredItems[name];
      if (item) {
        item.status = status;
        localStorage.setItem(item.name, JSON.stringify(item));
      }
    },
    resetFilters(state) {
      state.statusFilter = "All";
      state.priorityFilter = "All";
      state.dateFilter = "";
      state.tagFilter = [];
    },
    handleDelete(state) {
      if (state.itemToDelete) {
        localStorage.removeItem(state.itemToDelete);
      }
      const updatedItems = { ...state.items };
      delete updatedItems[state.itemToDelete as string];
      toast.success("Successfully Deleted", { theme: "colored" });
      state.items = updatedItems;
      state.filteredItems = updatedItems;
      state.showDeleteConfirm = false;
      state.clickedItem = null;
      state.itemToDelete = null;
    },
    handleCancelDelete(state) {
      state.showDeleteConfirm = false;
      state.itemToDelete = null;
      state.clickedItem = null;
    },
    handleUpdateClick(state, action: PayloadAction<string | null>) {
      state.clickedItem = action.payload;
    },
    handleItemClick(state, action: PayloadAction<string>) {
      state.itemToDelete = action.payload;
      state.showDeleteConfirm = true;
    },
    handleStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    handlePriorityChange(state, action: PayloadAction<string>) {
      state.priorityFilter = action.payload;
    },
    handleDateChange(state, action: PayloadAction<string>) {
      state.dateFilter = action.payload;
    },
    handleTagFilter(state, action: PayloadAction<Tag[]>) {
      state.tagFilter = action.payload;
    },
  },
});

export const {
  setItems,
  setFilteredItems,
  setStatusFilter,
  setAvailableTags,
  setPriorityFilter,
  setDateFilter,
  setClickedItem,
  setItemToDelete,
  resetFilters,
  setTagFilter,
  setShowDeleteConfirm,
  handleCancelDelete,
  handleDateChange,
  handleDelete,
  handleItemClick,
  handlePriorityChange,
  handleStatusFilter,
  handleTagFilter,
  handleUpdateClick,
  handleUpdateStatus,
} = TodoListSlice.actions;
export default TodoListSlice.reducer;
