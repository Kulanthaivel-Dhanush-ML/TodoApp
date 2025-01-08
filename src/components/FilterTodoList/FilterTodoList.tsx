import { FC } from "react";
import Select from 'react-select';
import Button from "../../ui/Button/Button";
import DateField from "../../ui/DateField/DateField";
import RadioGp from "../../ui/RadioGroup/RadioGroup";
import "./FilterTodoList.css";
interface TodoModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  tagFilter: any[];
  handleTagChange: (selectedOptions: any) => void;
  availableTags: any[];
  handleStatusFilter: (status:string) => void;
  handlePriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dateFilter: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFilter: string;
}

const FilterTodoList: FC<TodoModalProps> = ({
  applyFilters,
  resetFilters,
  tagFilter,
  handleTagChange,
  availableTags,
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
        <DateField
        name=""
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
        
        <RadioGp classname="statusfilter" options={["completed","not-completed"]} name="status" onChange={handleStatusFilter} />
        
        
      </div>
      </div>

      {/* Apply and Reset Filters Buttons */}
      <div className="filter-box-2">
      <div className="filter-buttons">
        <Button name="Reset Filters" color="secondary" onclick={resetFilters} />
        <Button name="Apply Filters" color="success" onclick={applyFilters} />
      </div>
      </div>
    </div>
  );
};

export default FilterTodoList;
