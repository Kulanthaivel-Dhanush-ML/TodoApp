import React, { createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import { toast } from "react-toastify";
interface TodoContextType {
  items: { [key: string]: string };
  setItems: Dispatch<SetStateAction<{ [key: string]: string }>>;
  filteredItems: { [key: string]: any };
  setFilteredItems: Dispatch<SetStateAction<{ [key: string]: any }>>;
  clickedItem: string | null;
  setClickedItem: Dispatch<SetStateAction<string | null>>;
  itemToDelete: string | null;
  setItemToDelete: Dispatch<SetStateAction<string | null>>;
  statusFilter: string;
  priorityFilter: string;
  dateFilter: string;
  tagFilter: any[];
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setDateFilter: (date: string) => void;
  setTagFilter: (tags: any[]) => void;
  resetFilters: () => void;
  handleTagChange: (selectedOptions: any) => void;
  setAvailableTags: Dispatch<SetStateAction<any[]>>;  // Correct typing here
  availableTags: any[];
  handleStatusFilter: (status: string) => void;
  handlePriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemClick: (key: string) => void;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
  handleCancelDelete: () => void;
  handleUpdateClick: (key:string|null) => void;
}


export const TodoContext = createContext<TodoContextType | undefined>(undefined);


interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [items, setItems] = useState<{ [key: string]: string }>({});
  const [filteredItems, setFilteredItems] = useState<{ [key: string]: any }>({});
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [tagFilter, setTagFilter] = useState<any[]>([]);
  const [availableTags, setAvailableTags] = useState<any[]>([]);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const handleTagChange = (selectedOptions: any) => {setTagFilter(selectedOptions);};

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityFilter(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };

  const resetFilters = () => {
    setPriorityFilter("All");
    setDateFilter("");
    setTagFilter([]);
    setStatusFilter("All");
  };

  const handleItemClick = (key: string) => {
    setItemToDelete(key);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      localStorage.removeItem(itemToDelete);
    }

    const updatedItems = { ...items };
    delete updatedItems[itemToDelete as string];
    toast.success("Successfully Deleted", { theme: "colored" });
    setItems(updatedItems);
    setFilteredItems(updatedItems);

    setShowDeleteConfirm(false);
    setClickedItem(null);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setClickedItem(null);
  };
  const handleUpdateClick = (key: string | null) => {
    setClickedItem(key);

  }

  return (
    <TodoContext.Provider
      value={{
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        clickedItem,
        setClickedItem,
        itemToDelete,
        setItemToDelete,
        statusFilter,
        priorityFilter,
        dateFilter,
        tagFilter,
        setStatusFilter,
        setPriorityFilter,
        setDateFilter,
        setTagFilter,
        resetFilters,
        handleTagChange,
        setAvailableTags,  
        availableTags,
        handleStatusFilter,
        handlePriorityChange,
        handleDateChange,
        handleItemClick,
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleDelete,
        handleCancelDelete,
        handleUpdateClick
      }}
    >
      {children} 
    </TodoContext.Provider>
  );
};
