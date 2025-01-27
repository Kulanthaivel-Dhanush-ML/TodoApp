import { FC, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import "./TodoItem.css";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPriorityClass, getStatusClass } from "../../utils/utils";
import { RootState } from "../../store/store";
import {
  handleUpdateClick,
  handleItemClick,
  handleUpdateStatus,
} from "../TodoList/TodoSlice";

export interface TodoItem {
  name: string;
  priority: string;
  status: string;
  tag: string;
  description: string;
  date: string;
  fromtime: string;
  totime: string;
}

const TodoItem: FC = () => {
  const dispatch = useDispatch();
  const { filteredItems, clickedItem } = useSelector(
    (state: RootState) => state.todo,
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const itemsPerPage = 10;

  const filteredItemsArray = useMemo(() => {
    return Object.keys(filteredItems).map((key) => filteredItems[key]);
  }, [filteredItems]);

  const currentItems = filteredItemsArray.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSaveStatus = (item: TodoItem) => {
    if (selectedStatus !== "null" && selectedStatus) {
      dispatch(handleUpdateStatus({ name: item.name, status: selectedStatus }));
      dispatch(handleUpdateClick(null));
    } else {
      toast.error("Please select a status.");
    }
  };

  const handleSaveClick = () => {
    dispatch(handleUpdateClick(null));
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
          currentItems.map((item) => (
            <div
              key={item.name}
              className={`todo-item ${clickedItem === item.name ? "clicked" : ""}`}
            >
              <div className="todo-details">
                {clickedItem === item.name ? (
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
                      <Button
                        type="button"
                        color="success"
                        onclick={() => handleSaveStatus(item)}
                        name="Save"
                      />
                      <Button
                        type="button"
                        color="secondary"
                        onclick={handleSaveClick}
                        name="Cancel"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="firstpart">
                    <div className="firstline">
                      <p className="todoname" title={item.name}>
                        {item.name}
                      </p>

                      <span className="extra-details">
                        <span
                          className={`todopriority ${getPriorityClass(item.priority)}`}
                        >
                          {item.priority}
                        </span>
                        &nbsp;
                        <span
                          className={`todostatus ${getStatusClass(item.status)}`}
                          onClick={() => dispatch(handleUpdateClick(item.name))}
                          onMouseEnter={(e) =>
                            (e.currentTarget.innerText = "Change Status")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.innerText = item.status)
                          }
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
                            onClick={() => dispatch(handleItemClick(item.name))}
                          ></i>
                        </span>
                      </span>
                    </div>

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
    </>
  );
};

export default TodoItem;
