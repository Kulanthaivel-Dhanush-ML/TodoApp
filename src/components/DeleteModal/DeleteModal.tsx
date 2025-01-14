import Modal from '../../ui/Modal/Modal'; 
import useTodoContext from '../../hooks/useTodoContext';

const DeleteModal: React.FC= () => {
 
  const context = useTodoContext();
  
  const {
    showDeleteConfirm,
    handleCancelDelete,
    handleDelete
  } = context;
  return (
    <>
    {showDeleteConfirm &&<Modal
      title="Confirm Deletion"
      content="Are you sure you want to delete this item? This action cannot be undone."
      
    >
      <div className="modal-footer">
        <button className="cancel-btn" onClick={handleCancelDelete}>
          Cancel
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Modal>}</>
  );
};

export default DeleteModal;
