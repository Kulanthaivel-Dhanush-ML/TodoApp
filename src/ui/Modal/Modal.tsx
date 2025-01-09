import React from 'react';
import "./Modal.css"
interface ModalProps {
    handleCancelDelete:()=>void;
  title: string;
  content: string;
  children?: React.ReactNode; // Allow children to be passed in
}

const Modal: React.FC<ModalProps> = ({handleCancelDelete, title, content, children }) => {
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
