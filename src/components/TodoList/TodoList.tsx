import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TodoList.css";
import { ToastContainer, toast } from 'react-toastify';
import FilterModal from "../FilterTodoList/FilterTodoList";
import ChangeModal from "../ChangeModal/ChangeModal";
import PrintingPart from "../TodoItem/TodoItem";

import { applyFilters, getAllItemsFromLocalStorage, sortItems, getPriorityClass, getStatusClass, updatestatus } from "../../utils/utils";
import Button from "../../ui/Button/Button";

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
    const [status, setstatus] = useState<string>("All");
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

    const handleItemClick = (key: string) => {
        setClickedItem(key);
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

    const handleUpdateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setstatus(e.target.value);
    }

    const handleStatusFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setstatusFilter(e.target.value);

    }

    const handleStatusUpdate = () => {
        updatestatus(clickedItem,
            status,
            items,
            setItems,
            setFilteredItems,
            toast,
            setShowDeleteConfirm,
            setClickedItem,
            setItemToDelete,
            setstatus)

    }

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


                <FilterModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    applyFilters={handleapplyFilters}
                    resetFilters={resetFilters}
                    tagFilter={tagFilter}
                    handleTagChange={handleTagChange}
                    availableTags={availableTags}
                    statusFilter={statusFilter}
                    handleStatusFilter={handleStatusFilter}
                    handlePriorityChange={handlePriorityChange}
                    dateFilter={dateFilter}
                    handleDateChange={handleDateChange}
                    priorityFilter={priorityFilter}
                />
                <PrintingPart
                    filteredItems={filteredItems}
                    clickedItem={clickedItem}
                    handleItemClick={handleItemClick}
                    getPriorityClass={getPriorityClass}
                    getStatusClass={getStatusClass}
                />
                <ChangeModal
                    showDeleteConfirm={showDeleteConfirm}
                    handleDelete={handleDelete}
                    handleCancelDelete={handleCancelDelete}
                    handleUpdateStatus={handleUpdateStatus}
                    updatestatus={handleStatusUpdate}
                />

            </div>



            <ToastContainer />
        </div>
    );
}

export default DisplayTodo;
