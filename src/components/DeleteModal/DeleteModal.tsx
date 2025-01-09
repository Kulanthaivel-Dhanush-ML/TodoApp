import React from 'react';
import Modal from '../../ui/Modal/Modal'; // Import the Modal component

interface DeleteModalProps {
    
  showDeleteConfirm:boolean;
  handleCancelDelete:()=>void;
    handleDelete:()=>void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({showDeleteConfirm, handleCancelDelete,handleDelete}) => {
 

  return (
    <>
    {showDeleteConfirm &&<Modal
      title="Confirm Deletion"
      content="Are you sure you want to delete this item? This action cannot be undone."
      handleCancelDelete={handleCancelDelete}
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
