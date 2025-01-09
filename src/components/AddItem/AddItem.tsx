import { FC, useState,useEffect } from "react";
import InputBox from "../../ui/InputBox/InputBox";
import "./AddItem.css";
import TextAreaBox from "../../ui/TextAreaBox/TextAreaBox";
import Button from "../../ui/Button/Button";
import RadioGp from "../../ui/RadioGroup/RadioGroup";
import DateField from "../../ui/DateField/DateField";
import TimeField from "../../ui/Time/TimeField";
import { Label } from "../../ui/Label/Label";
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
    status:'not-completed',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);
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

  const handletoTimeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const totime= e.target.value;
    setFormData({
      ...formData,
      totime, 
    });
  };
  const handlefromTimeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fromtime = e.target.value;
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
      status:'not-completed'
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
            <Label htmlFor="TodoTitle" content="Task Title"/>
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
            <Label htmlFor="Description" content="Description"/>
            </div>
            <div className="DescTextArea">
              <TextAreaBox
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description ..."
                rows={3}
              />
            </div>
          </div>
          <div className="Details">
            <div className="Radio box">
            <Label className="mb-1" content="Priority"/>
            <RadioGp classname="radiogrp" options={["Low", "Medium", "High"]} onChange={handlePriorityChange} name="priorityradio"  />
            </div>
            <div className="date box">
            <Label className="mb-1" content="Select Date"/>
            <br/>
              <DateField
                min={minDate}
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="time box">
              <TimeField classname="from"
                name="from time"
                content="From Time"
                value={formData.fromtime}  
                onTimeChange={handlefromTimeChange}  
                required={true}
              />
              <TimeField content="To Time" classname="to" name="to time"
                value={formData.totime}  
                onTimeChange={handletoTimeChange} required={true}/>
            </div>
            <div className="tag ">
              <Label htmlFor="tagTodo" content="Add Tag"/>
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
        <Link to="/" className="link"><Button name="Check your Todo list" color="success"  /></Link>
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
