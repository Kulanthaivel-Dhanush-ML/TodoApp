import { FC, useState } from "react";
import TodoTitleLabel from "../TodoTitleLabel/TodoTitleLabel";
import InputBox from "../InputBox/InputBox";
import "./TextField.css";
import DescLabel from "../DescLabel/DescLabel";
import TextAreaBox from "../TextAreaBox/TextAreaBox";
import Button from "../Button/Button";
import RadioGp from "../RadioGp/RadioGp";
import Priority from "../PriorityLabel/Priority";
import DateField from "../Date/DateField";
import TimeField from "../Time/TimeField";
import ToTime from "../ToTime/ToTime";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const TextField: FC = () => {
  const initialFormData = {
    name: '',
    description: '',
    priority: '',
    date: '',
    fromtime: '',
    totime: '',
    tag: '',
    status:'not completed',
  };

  const [formData, setFormData] = useState(initialFormData);

 const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriorityChange = (priority: string) => {
    setFormData({
      ...formData,
      priority,  
    });
  };

  const handletoTimeChange = (totime: string) => {
    setFormData({
      ...formData,
      totime, 
    });
  };
  const handlefromTimeChange = (fromtime: string) => {
    setFormData({
      ...formData,
      fromtime,  
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name ||
      !formData.description ||
      !formData.priority ||
      !formData.date ||
      !formData.fromtime ||
      !formData.totime ||
      !formData.tag) {
      toast.error("Please fill out all fields before submitting the form.",{theme:"colored"});
      return; 
    }
    toast.success("Success",{theme:"colored"})
    localStorage.setItem(formData.name,JSON.stringify(formData));
    // localStorage.setItem('successMessage',"New Todo Created");
    navigate('/');
    console.log('Form submitted:', formData);
    setFormData(initialFormData);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      priority: '',
      date: '',
      fromtime: '',
      totime: '',
      tag: '',
      status:'not completed'
    });
  };

  return (
    <>
      <div className="Todo">
        <h4 style={{ fontFamily: "cursive" }}>TO-DO LIST</h4>
      </div>
      
      <div className="NewItemAdd">
        <div className="NewItemTitle">
          <h5 style={{ textAlign: "center" }}>ADD NEW ITEM</h5>
        </div>
        <form id="myForm" onSubmit={handleSubmit}>
          <div className="Title">
            <div className="TodotitleLabel">
              <TodoTitleLabel />
            </div>
            <div className="TodoTitleInputBox">
              <InputBox
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Task Name"
              />
            </div>
          </div>
          <div className="Desc">
            <div className="DescLabel">
              <DescLabel />
            </div>
            <div className="DescTextArea">
              <TextAreaBox
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="Details">
            <div className="Radio box">
              <Priority />
              <RadioGp onPriorityChange={handlePriorityChange} />
            </div>
            <div className="date box">
              <DateField
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="time box">
              <TimeField
                name="from time"
                value={formData.fromtime}  // Pass the time value to TimeField
                onTimeChange={handlefromTimeChange}  // Pass handleTimeChange to update the parent
              />
              <ToTime name="to time"
                value={formData.totime}  // Pass the time value to TimeField
                onTimeChange={handletoTimeChange} />
            </div>
            <div className="tag ">
              <label htmlFor="tagTodo">Add Tag</label>
              <br />
              <InputBox
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Enter Tag"
              />
            </div>
          </div>

          <div className="buttons">
            <Button
              name="Save"
              color="success"
              border="none"
              text="white"
              type="button"
              onclick={handleSubmit}
            />
            <Button
              name="Clear"
              color="outline-primary"
              border="none"
              text="none"
              type="button"
              onclick={handleClear}
            />
            <div>
        <Link to="/" className="link"><button className="btn btn-success">Check your Todo List</button></Link>
      </div>
          </div>
        </form>
      </div>
      
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default TextField;
