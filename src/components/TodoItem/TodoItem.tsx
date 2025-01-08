import { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import "./TodoItem.css"
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
  getPriorityClass: (Priority: string) => string;
  getStatusClass: (Status: string) => string;
}

const TodoItem: FC<TodoItemProps> = ({
  filteredItems,
  clickedItem,
  handleItemClick,
  getPriorityClass,
  getStatusClass,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
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
              onClick={() => handleItemClick(item.name)}
            >
              <div className="todo-details">
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
                      >
                        {item.status}
                      </span>
                      &nbsp;
                      <span>
                        <i className="fa fa-hashtag"></i> {item.tag}
                      </span>
                    </span>
                  </p>
                  <p className="tododesc">{item.description}</p>
                </div>

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
