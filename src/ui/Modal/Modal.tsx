import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import "./Modal.css"
interface ModalProps {

  title: string;
  content: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, content, children }) => {
  const context = useContext(TodoContext);
  if (!context) {
    return <div>Error: TodoContext is not available!</div>
  }
  const {
    handleCancelDelete
  } = context;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn">
            <span onClick={handleCancelDelete}>&times;</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <p>{content}</p>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {children} {/* Render children here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
