import { FC, useEffect,useMemo } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setFormData,resetForm,setMinDate } from "./AddItemSlice";
import InputBox from "../../ui/InputBox/InputBox";
import "./AddItem.css";
import TextAreaBox from "../../ui/TextAreaBox/TextAreaBox";
import Button from "../../ui/Button/Button";
import RadioGp from "../../ui/RadioGroup/RadioGroup";
import DateField from "../../ui/DateField/DateField";
import TimeField from "../../ui/Time/TimeField";
import { Label } from "../../ui/Label/Label";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RootState } from "../../store/store";

const TextField: FC = () => {
 
  
  const dispatch = useDispatch();
  const formData = useSelector((state:RootState)=>state.addItem.form);
  const minDate = useSelector((state:RootState)=>state.addItem.minDate);
  
  const navigate = useNavigate();

  const today = useMemo(() => {
    const todayDate = new Date().toISOString().split('T')[0]; 
    const currentTime = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`; 
    return { todayDate, currentTime };
  }, []);

  useEffect(() => {
    dispatch(setMinDate(today.todayDate)); 
    dispatch(setFormData({
      ...formData,
      date: today.todayDate, 
      fromtime: today.currentTime, 
      totime: today.currentTime, 
    }));
    
  }, [today,dispatch]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({
      ...formData,
      [name]: value,
    }));
  };

  const handlePriorityChange = (priority: string) => {
    dispatch(setFormData({
      ...formData,
      priority,
    }));
  };

  const handletoTimeChange = (totime: string) => {
    dispatch(setFormData({
      ...formData,
      totime,
    }));
  };

  const handlefromTimeChange = (fromtime: string) => {
    dispatch(setFormData({
      ...formData,
      fromtime,
    }));
  };
  useEffect(() => {
    console.log("Form data after reset:", formData); 
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
  
    if (!formData.name || !formData.description || !formData.priority || !formData.tag) {
      toast.error("Please fill out all fields before submitting the form.", { theme: "colored" });
      return;
    }
  
    toast.success("Success", { theme: "colored" });
  
    // Store the form data in localStorage
    localStorage.setItem(formData.name, JSON.stringify(formData));
  
    // Dispatch resetForm after successful form submission
    dispatch(resetForm());
  
    // Navigate to another page (if necessary)
    navigate('/');
  };
  

  const handleClear = () => {
    dispatch(resetForm());
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
              <Label htmlFor="TodoTitle" content="Task Title" />
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
              <Label htmlFor="Description" content="Description" />
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
              <Label className="mb-1" content="Priority" />
              <RadioGp classname="radiogrp" options={["Low", "Medium", "High"]} onChange={handlePriorityChange} name="priorityradio" />
            </div>
            <div className="date box">
              <Label className="mb-1" content="Select Date" />
              <br />
              <DateField
                min={minDate}
                name="date"
                value={formData.date}
                onChange={handleChange}
                required={true}
                className="form-control"
                setDefaultIfEmpty={true}
              />
            </div>
            <div className="time box">
              <TimeField
                classname="from"
                name="from time"
                content="From Time"
                value={formData.fromtime}
                onTimeChange={handlefromTimeChange}
                required={true}
              />
              <TimeField
                content="To Time"
                classname="to"
                name="to time"
                value={formData.totime}
                onTimeChange={handletoTimeChange}
                required={true}
              />
            </div>
            <div className="tag">
              <Label htmlFor="tagTodo" content="Add Tag" />
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
              type="submit"
              onclick={handleSubmit}
            />
            <Button
              name="Clear"
              color="secondary"
              border="none"
              text="none"
              type="button"
              onclick={handleClear}
            />
            <div>
              <Link to="/" className="link"><Button name="Check your Todo list" color="success" /></Link>
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
