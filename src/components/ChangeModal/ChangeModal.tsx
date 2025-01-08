import { FC } from "react";
import Button from "../../ui/Button/Button";
import { Label } from "../../ui/Label/Label";
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
                                <Label className="form-check-label labelatModal" htmlFor="compbutton"
                                   content="Completed" 
                                />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value="not completed" name="status" id="notcompbutton" onChange={handleUpdateStatus} />
                                <Label className="form-check-label labelatModal" htmlFor="notcompbutton"
                                    content="Not Completed"
                                />
                            </div>

                        </div>
                        <Button color="success" name="Update" classname="upbutton" onclick={updatestatus}/>
                        <p className="Delete-title">Delete :</p>
                        <p className="para-modal">Do you want to delete this task?</p>
                        <div className="mod-button">
                            <Button name="Cancel" onclick={handleCancelDelete} color="secondary"/>
                            <Button name="Delete" onclick={handleDelete} color="danger"/>
                        </div>
                    </div>
                </div>
            </div>
        )}</>
    )
}

export default ChangeModal;
