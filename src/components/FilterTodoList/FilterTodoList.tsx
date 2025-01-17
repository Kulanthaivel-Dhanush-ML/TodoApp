import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Button from "../../ui/Button/Button";
import DateField from "../../ui/DateField/DateField";
import RadioGp from "../../ui/RadioGroup/RadioGroup";
import "./FilterTodoList.css";
import { RootState } from "../../store/store"; 
import {
  handlePriorityChange,
  handleDateChange,
  handleTagFilter,
  handleStatusFilter,
  resetFilters,
} from "../../components/TodoList/TodoSlice"; 

const FilterTodoList: FC = () => {
 
  const dispatch = useDispatch();

  const {
    tagFilter,
    availableTags,
    priorityFilter,
    dateFilter,
  } = useSelector((state: RootState) => state.todo);

 
  const handlePriorityChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handlePriorityChange(e.target.value)); 
  };

  const handleDateChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleDateChange(e.target.value)); 
  };

 
  const handleTagChangeEvent = (selectedOptions: any) => {
    dispatch(handleTagFilter(selectedOptions)); 
  };

  const handleStatusChange = (selectedValue: string) => {
    dispatch(handleStatusFilter(selectedValue)); 
  };

  const handleresetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div>
      <p className="filter-title">FILTER :</p>

      <div className="filter-container">
        <div className="filter-box">
          {/* Priority Filter */}
          <select
            onChange={handlePriorityChangeEvent}
            value={priorityFilter}
            className="form-select-sm select-filter mb-3"
          >
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
            onChange={handleDateChangeEvent} 
            className="form-control-sm mb-3"
            placeholder="Filter by date"
            setDefaultIfEmpty={false}
          />

          {/* Tags Filter */}
          <Select
            isMulti
            options={availableTags}
            value={tagFilter}
            onChange={handleTagChangeEvent}
            className="multi-select mb-3"
            placeholder="Select Tags"
          />

          {/* Status Filter */}
          <RadioGp
            classname="statusfilter"
            options={["completed", "not-completed"]}
            name="status"
            onChange={handleStatusChange}
          />
        </div>
      </div>

      {/* Apply and Reset Filters Buttons */}
      <div className="filter-box-2">
        <div className="filter-buttons">
          <Button
            name="Reset Filters"
            color="secondary"
            onclick={handleresetFilters} 
          />
        </div>
      </div>
    </div>
  );
};

export default FilterTodoList;
