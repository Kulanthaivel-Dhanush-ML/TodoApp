import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TodoList.css";
import { ToastContainer, toast } from 'react-toastify';
import FilterTodoList from "../FilterTodoList/FilterTodoList";
import TodoItem from "../TodoItem/TodoItem";
import { applyFilters, getAllItemsFromLocalStorage, sortItems } from "../../utils/utils";
import Button from "../../ui/Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";
import useTodoContext from "../../hooks/useTodoContext";

const DisplayTodo: FC = () => {
    
    const context = useTodoContext();

    const {
        items,
        setFilteredItems,
        setItems,
        tagFilter,
        dateFilter,
        priorityFilter,
        setAvailableTags,
        statusFilter,

    } = context;

    useEffect(() => {
        const { allItems, tags } = getAllItemsFromLocalStorage();
        const sortedItems = sortItems(allItems);
        setItems(sortedItems);
        setFilteredItems(sortedItems);
        setAvailableTags(Array.from(tags).map((tag, index) => ({
            id: `${index + 1}`, 
            value: tag,
            label: tag
        })));

        const message = localStorage.getItem('successMessage');
        if (message) {
            toast.success(message, { theme: 'colored' });
        }
    }, []);

    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            handleapplyFilters();
        }
    }, [items, priorityFilter, dateFilter, tagFilter, statusFilter]);

    const handleapplyFilters = () => {
        const filtered = applyFilters(items, priorityFilter, dateFilter, tagFilter, statusFilter);
        setFilteredItems(filtered);
    };

    const getAppliedFilters = () => {
        const filters: string[] = [];
        if (priorityFilter !== "All") filters.push(`Priority: ${priorityFilter}`);
        if (dateFilter) filters.push(`Date: ${dateFilter}`);
        if (tagFilter.length > 0) filters.push(`Tags: ${tagFilter.map(tag => tag.label).join(", ")}`);
        if (statusFilter !== "All") filters.push(`status: ${statusFilter}`);
        return filters.length > 0 ? (
            <><i className="fa fa-filter"></i> {filters.join(" | ")}</>
        ) : "";
    };



    return (
        <div className="todoPage">
            <div className="displayTodo">
                <div className="displayTodoTitle" style={{ textAlign: "center" }}>
                    <h5 className="TodoListTitle">
                        Your To-Do List: Turning Plans into Actions
                    </h5>
                </div>
                <div className="button2">
                    <div className="anchor">
                        <Link to="/additem" className="link mt-3">
                            <Button name="Add new item" color="light" text="dark" />
                        </Link>
                    </div>
                    <div className="applied-filters mt-3">
                        <p>{getAppliedFilters()}</p>
                    </div>
                </div>

                <FilterTodoList /> 

                <TodoItem

                />

                <DeleteModal

                />
            </div>

            <ToastContainer />
        </div>
    );
};

export default DisplayTodo;
