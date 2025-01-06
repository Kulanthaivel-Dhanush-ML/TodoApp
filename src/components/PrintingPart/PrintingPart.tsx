import { FC } from "react";

interface TodoItem {
    name: string;
    priority: string;
    status: string;
    tag: string;
    description: string;
    date: string;
    fromtime: string;
    totime: string;
  }
interface PrintingPartProps{
    filteredItems:{[key:string]:TodoItem};
    clickedItem:string|null;
    handleItemClick:(key:string)=>void;
    getPriorityClass:(Priority:string)=>string;
    getStatusClass:(Status:string)=>string;
}

const PrintingPart:FC<PrintingPartProps> =(
    {
        filteredItems,
        clickedItem,
        handleItemClick,
        getPriorityClass,
        getStatusClass
    }
)=>
{
    return(
        <>
            {/* printing of details */}
            <div className="todo-list">
                    {Object.keys(filteredItems).length === 0 ? (
                        <p className="nofound">No items found</p>
                    ) : (
                        Object.keys(filteredItems).map((key) => (
                            <div
                                key={key}
                                className={`todo-item ${clickedItem === key ? "clicked" : ""}`}
                                onClick={() => handleItemClick(key)}
                            >
                                <div className="todo-details">
                                    <div className="firstpart">
                                        <p className="todoname">
                                            {filteredItems[key]?.name}
                                            <span className="extra-details">
                                                <span
                                                    className={`todopriority ${getPriorityClass(filteredItems[key]?.priority)}`}
                                                >
                                                    {filteredItems[key]?.priority}
                                                </span>
                                                &nbsp;
                                                <span
                                                    className={`todostatus ${getStatusClass(filteredItems[key]?.status)}`}
                                                >
                                                    {filteredItems[key]?.status}
                                                </span>
                                                &nbsp;
                                                <span>
                                                    <i className="fa fa-hashtag"></i> {filteredItems[key]?.tag}
                                                </span>
                                            </span>
                                        </p>
                                        <p className="tododesc">
                                            {filteredItems[key]?.description}
                                        </p>
                                    </div>

                                    <div className="timedetails">
                                        <p className="tododate">
                                            <i className="fa fa-calendar">&nbsp;</i>
                                            {filteredItems[key]?.date}
                                        </p>
                                        <p className="todotime">
                                            <i className="fa fa-arrow-right">&nbsp;</i>
                                            {filteredItems[key]?.fromtime} - {filteredItems[key]?.totime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
        </>
    )
}

export default PrintingPart;