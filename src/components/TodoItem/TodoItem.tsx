import { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import "./TodoItem.css";
import Button from "../../ui/Button/Button";

import {toast,ToastContainer } from "react-toastify";
interface TodoItem {
  name: string;
  priority: string;
  status: string;
  tag: string;
  description: string;
  date: string;
  fromtime: string;
  totime: string;
}

interface TodoItemProps {
  filteredItems: { [key: string]: TodoItem };
  clickedItem: string | null;
  handleItemClick: (key: string) => void;
  handleUpdateClick: (key: string | null) => void;
  getPriorityClass: (Priority: string) => string;
  getStatusClass: (Status: string) => string;
}

const TodoItem: FC<TodoItemProps> = ({
  filteredItems,
  clickedItem,
  handleItemClick,
  handleUpdateClick,
  getPriorityClass,
  getStatusClass,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State to track selected status
  const itemsPerPage = 10;

  // Convert filteredItems object to an array for easier slicing
  const filteredItemsArray = Object.keys(filteredItems).map(
    (key) => filteredItems[key]
  );

  // Calculate the items to display based on the current page
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredItemsArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page change
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  // Handle radio button status change
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  // Handle save of updated status
  const handleSaveStatus = (item: TodoItem) => {
    if (selectedStatus!=="null") {
      item.status = selectedStatus; 
      handleUpdateClick(null); 

    } else {
      toast.error("Please select a status.");
    }
  };

  return (
    <>
      {/* Pagination Controls */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredItemsArray.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>

      {/* Printing of details */}
      <div className="todo-list">
        {filteredItemsArray.length === 0 ? (
          <p className="nofound">No items found</p>
        ) : (
          currentItems.map((item, index) => (
            <div
              key={index}
              className={`todo-item ${clickedItem === item.name ? "clicked" : ""}`}
            >
              <div className="todo-details">
                {clickedItem === item.name ? (
                  // When item is clicked, show the update status section
                  <div className="update-status">
                    <p>Update Status for: {item.name}</p>
                    
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="not-completed"
                          checked={selectedStatus === "not-completed"}
                          onChange={handleStatusChange}
                        />
                        Not Completed
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="completed"
                          checked={selectedStatus === "completed"}
                          onChange={handleStatusChange}
                        />
                        Completed
                      </label>
                    </div>
                    <div className="Button-gp-up">
                    <Button type="button" color="success" onclick={() => handleSaveStatus(item)} name="Save"/>
                    <Button type="button" color="secondary" onclick={() => handleUpdateClick(null)} name="Cancel"/></div>
                  </div>
                ) : (
                  // Default display of the todo item
                  <div className="firstpart">
                    <p className="todoname">
                      {item.name}
                      <span className="extra-details">
                        <span
                          className={`todopriority ${getPriorityClass(item.priority)}`}
                        >
                          {item.priority}
                        </span>
                        &nbsp;
                        <span
                          className={`todostatus ${getStatusClass(item.status)}`}
                          onClick={() => handleUpdateClick(item.name)} // Change to editable status when clicked
                          onMouseEnter={(e) => (e.currentTarget.innerText = "Change Status")} // Change text on hover
                          onMouseLeave={(e) => (e.currentTarget.innerText = item.status)} // Revert text when hover ends
                        >
                          {item.status}
                        </span>
                        &nbsp;
                        <span>
                          <i className="fa fa-hashtag"></i> {item.tag}
                        </span>
                        &nbsp;
                        <span>
                          <i
                            className="fa fa-trash"
                            style={{ color: "red" }}
                            onClick={() => handleItemClick(item.name)} // Handle delete action
                          ></i>
                        </span>
                      </span>
                    </p>
                    <p className="tododesc">{item.description}</p>
                  </div>
                )}
                <div className="timedetails">
                <p className="tododate">
                  <i className="fa fa-calendar">&nbsp;</i>
                  {item.date}
                </p>
                <p className="todotime">
                  <i className="fa fa-arrow-right">&nbsp;</i>
                  {item.fromtime} - {item.totime}
                </p>
              </div>
              </div>

              
            </div>
          ))
        )}
      </div>
      <ToastContainer/>
    </>
  );
};

export default TodoItem;
