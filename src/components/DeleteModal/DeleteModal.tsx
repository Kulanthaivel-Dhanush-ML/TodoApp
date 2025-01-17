import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCancelDelete, handleDelete } from "../TodoList/TodoSlice";
import { RootState } from "../../store/store";
import Modal from "../../ui/Modal/Modal";

const DeleteModal: FC = () => {
  const dispatch = useDispatch();
  const { showDeleteConfirm} = useSelector((state: RootState) => state.todo);

  return (
    <>
      {showDeleteConfirm && (
        <Modal
          title="Confirm Deletion"
          content="Are you sure you want to delete this item? This action cannot be undone."
        >
          <div className="modal-footer">
            <button
              className="cancel-btn"
              onClick={() => dispatch(handleCancelDelete())} 
            >
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={() => dispatch(handleDelete())} 
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteModal;
