import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TodoList.css";
import { ToastContainer, toast } from 'react-toastify';
import FilterTodoList from "../FilterTodoList/FilterTodoList";

import TodoItem from "../TodoItem/TodoItem";

import { applyFilters, getAllItemsFromLocalStorage, sortItems, getPriorityClass, getStatusClass  } from "../../utils/utils";
import Button from "../../ui/Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";

const DisplayTodo: FC = () => {
    const [items, setItems] = useState<{ [key: string]: any }>({});
    const [filteredItems, setFilteredItems] = useState<{ [key: string]: any }>({});
    const [priorityFilter, setPriorityFilter] = useState<string>("All");
    const [dateFilter, setDateFilter] = useState<string>("");
    const [tagFilter, setTagFilter] = useState<any[]>([]); // Changed to an array for multi-selection
    const [showModal, setShowModal] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    
    const [clickedItem, setClickedItem] = useState<string | null>(null);
    const [availableTags, setAvailableTags] = useState<any[]>([]);
    const [statusFilter, setstatusFilter] = useState<string>("All");

    useEffect(() => {
        const { allItems, tags } = getAllItemsFromLocalStorage();
        const sortedItems = sortItems(allItems);
        setItems(sortedItems);
        setFilteredItems(sortedItems);
        setAvailableTags(Array.from(tags).map(tag => ({ value: tag, label: tag })));

        const message = localStorage.getItem('successMessage');
        if (message) {
            toast.success(message, { theme: 'colored' });
            // localStorage.removeItem('successMessage');
        }
    }, []);

    const handleapplyFilters = () => {
        const filtered = applyFilters(items, priorityFilter, dateFilter, tagFilter, statusFilter)
        toast.success("Filters Applied");
        setFilteredItems(filtered);
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriorityFilter(e.target.value);
        console.log("Selected Priority:", e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(e.target.value);
    };

    const handleTagChange = (selectedOptions: any) => {
        setTagFilter(selectedOptions || []);
    };


    const resetFilters = () => {
        setPriorityFilter("All");
        setDateFilter("");
        setTagFilter([]);
        setstatusFilter("All");
        setFilteredItems(items);
    };

    const handleItemClick = (key: string ) => {
        setClickedItem(key);
        setItemToDelete(key);
        setShowDeleteConfirm(true);
    };

    const handleUpdateClick =(key:string | null)=>
    {
        setClickedItem(key);
        
    }

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

    const getAppliedFilters = () => {
        const filters: string[] = [];
        if (priorityFilter !== "All") filters.push(`Priority: ${priorityFilter}`);
        if (dateFilter) filters.push(`Date: ${dateFilter}`);
        if (tagFilter.length > 0) filters.push(`Tags: ${tagFilter.map(tag => tag.label).join(", ")}`);
        if (statusFilter !== "All") filters.push(`status: ${statusFilter}`);
        return filters.length > 0 ? (
            <>
                <i className="fa fa-filter"></i> {filters.join(" | ")}
            </>
        ) : "";
    };

   

    const handleStatusFilter = (status: string) => {
        setstatusFilter(status);  // Set the status filter to the selected value
    };
    

   

    return (
        <div className="todoPage">
            <div className="displayTodo">
                <div className="displayTodoTitle" style={{ textAlign: "center" }}>
                    <h5 style={{ color: '#69247C', textDecoration: 'underline' }}>Your To-Do List: Turning Plans into Actions</h5>
                </div>
                <div className="button2">
                    <div className="anchor">
                        <Link to="/additem" className="link mt-3">
                            <Button name="Add new item" color="light" text="dark"/>
                        </Link>
                    </div>




                    <div className="applied-filters mt-3">
                        <p>{getAppliedFilters()}</p>
                    </div>
                </div>


                <FilterTodoList
                    showModal={showModal}
                    setShowModal={setShowModal}
                    applyFilters={handleapplyFilters}
                    resetFilters={resetFilters}
                    tagFilter={tagFilter}
                    handleTagChange={handleTagChange}
                    availableTags={availableTags}
                    handleStatusFilter={handleStatusFilter}
                    handlePriorityChange={handlePriorityChange}
                    dateFilter={dateFilter}
                    handleDateChange={handleDateChange}
                    priorityFilter={priorityFilter}
                />
                <TodoItem
                    filteredItems={filteredItems}
                    clickedItem={clickedItem}
                    handleItemClick={handleItemClick}
                    getPriorityClass={getPriorityClass}
                    getStatusClass={getStatusClass}
                    handleUpdateClick={handleUpdateClick}
                />
                
                <DeleteModal  handleDelete={handleDelete}
                    handleCancelDelete={handleCancelDelete} showDeleteConfirm={showDeleteConfirm} />

            </div>



            <ToastContainer />
        </div>
    );
}

export default DisplayTodo;
