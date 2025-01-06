import { FC } from "react";

interface ChangeModalProps
{
    showDeleteConfirm: boolean;
    updatestatus:()=>void;
    handleUpdateStatus:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleCancelDelete:()=>void;
    handleDelete:()=>void;
}

const ChangeModal:FC<ChangeModalProps> = ({
    showDeleteConfirm,
    updatestatus,
    handleUpdateStatus,
    handleCancelDelete,
    handleDelete
}) =>
{
    return(
       <>
        {showDeleteConfirm && (
            <div className="modal show" tabIndex={-1} style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p className="status-title">Status :</p>
                        <div className="updatestatus">

                            <div className="form-check">

                                <input className="form-check-input" value="completed" type="radio" name="status" id="compbutton" onChange={handleUpdateStatus} />
                                <label className="form-check-label labelatModal" htmlFor="compbutton">
                                    Completed
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value="not completed" name="status" id="notcompbutton" onChange={handleUpdateStatus} />
                                <label className="form-check-label labelatModal" htmlFor="notcompbutton">
                                    Not Completed
                                </label>
                            </div>

                        </div>
                        <button className="btn btn-success upbutton" onClick={updatestatus}>
                            Update
                        </button>
                        <p className="Delete-title">Delete :</p>
                        <p className="para-modal">Do you want to delete this task?</p>
                        <div className="mod-button">
                            <button className="btn btn-secondary" onClick={handleCancelDelete}>
                                Close
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}</>
    )
}

export default ChangeModal;
