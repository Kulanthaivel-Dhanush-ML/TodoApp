import { FC } from "react";
import Select from 'react-select';
import Button from "../../ui/Button/Button";
import DateField from "../../ui/DateField/DateField";
import RadioGp from "../../ui/RadioGroup/RadioGroup";
import "./FilterTodoList.css";
import useTodoContext from "../../hooks/useTodoContext";

const FilterTodoList: FC = () => {

  const context = useTodoContext();

  const {
    resetFilters,
    tagFilter,
    handleTagChange,
    availableTags,
    handleStatusFilter,
    handlePriorityChange,
    dateFilter,
    priorityFilter,
    handleDateChange
  } = context;
  return (
    <div>
      <p className="filter-title">FILTER :</p>

      <div className="filter-container">
        <div className="filter-box">
          <select onChange={handlePriorityChange} value={priorityFilter} className="form-select-sm select-filter mb-3">
            <option value="select" disabled>select</option>
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <DateField
            name=""
            value={dateFilter}
            onChange={handleDateChange}
            className="form-control-sm mb-3"
            placeholder="Filter by date"
            setDefaultIfEmpty={false}
          />

          <Select
            isMulti
            options={availableTags}
            value={tagFilter}
            onChange={handleTagChange}
            className="multi-select mb-3"
            placeholder="Select Tags"
          />

          <RadioGp classname="statusfilter" options={["completed", "not-completed"]} name="status" onChange={handleStatusFilter} />


        </div>
      </div>

      {/* Apply and Reset Filters Buttons */}
      <div className="filter-box-2">
        <div className="filter-buttons">
          <Button name="Reset Filters" color="secondary" onclick={resetFilters} />
        </div>
      </div>
    </div>
  );
};

export default FilterTodoList;
