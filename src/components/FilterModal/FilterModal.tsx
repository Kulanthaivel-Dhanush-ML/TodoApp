import { FC } from "react";
import Select from 'react-select';


interface TodoModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  tagFilter: any[];
  handleTagChange: (selectedOptions: any) => void;
  availableTags: any[];
  statusFilter: string;
  handleStatusFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dateFilter: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFilter: string;
}

const FilterModal: FC<TodoModalProps> = ({
  applyFilters,
  resetFilters,
  tagFilter,
  handleTagChange,
  availableTags,
  statusFilter,
  handleStatusFilter,
  handlePriorityChange,
  dateFilter,
  priorityFilter,
  handleDateChange
}) => {
  return (
    <div>
      <h5 className="modal-title">Filter</h5>

      <div className="filter-container">
        <div className="filter-box">
        {/* Priority Filter */}
        <select onChange={handlePriorityChange} value={priorityFilter} className="form-select-sm select-filter mb-3">
          <option value="select" disabled>select</option>
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateChange}
          className="form-control-sm mb-3"
          placeholder="Filter by date"
        />

        {/* React-Select Tag Filter */}
        <Select
          isMulti
          options={availableTags}
          value={tagFilter}
          onChange={handleTagChange}
          className="multi-select mb-3"
          placeholder="Select Tags"
        />
        
        
        
        <div className="statusfilter">
          <div className="form-check">
            <input
              className="form-check-input"
              value="completed"
              type="radio"
              name="status"
              id="compbutton"
              checked={statusFilter === "completed"}
              onChange={handleStatusFilter}
            />
            <label className="form-check-label labelatModal" htmlFor="compbutton">
              Completed
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="not completed"
              name="status"
              id="notcompbutton"
              checked={statusFilter === "not completed"}
              onChange={handleStatusFilter}
            />
            <label className="form-check-label labelatModal" htmlFor="notcompbutton">
              NotCompleted
            </label>
          </div>
        </div>
      </div>
      </div>

      {/* Apply and Reset Filters Buttons */}
      <div className="filter-box-2">
      <div className="filter-buttons">
        <button className="btn btn-secondary" onClick={resetFilters}>
          Reset Filters
        </button>
        <button className="btn btn-success" onClick={applyFilters}>
          Apply Filters
        </button>
    
      </div>
      </div>
    </div>
  );
};

export default FilterModal;
