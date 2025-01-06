// TodoModal.tsx
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
  showModal,
  setShowModal,
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
    <>
      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filter TODO List</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                {/* Priority Filter */}
                <select onChange={handlePriorityChange} value={priorityFilter}  className="form-select mb-3">
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
                  className="form-control mb-3"
                  placeholder="Filter by date"
                />

                {/* React-Select Tag Filter */}
                <Select
                  isMulti
                  options={availableTags}
                  value={tagFilter}
                  onChange={handleTagChange}
                  className="mb-3"
                  placeholder="Select Tags"
                />

                <p className="status-title-filter">Status :</p>
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
                      Not Completed
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={() => { applyFilters(); setShowModal(false); }}>
                  Apply Filters
                </button>
                {/* Reset Button */}
                <button className="btn btn-warning" onClick={() => { resetFilters(); setShowModal(false); }}>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       
    </>
  );
};

export default FilterModal;
