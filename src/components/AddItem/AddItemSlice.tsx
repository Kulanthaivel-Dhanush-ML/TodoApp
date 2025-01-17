import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "../TodoItem/TodoItem";

export interface AppState
{
    form: TodoItem;
    minDate: string;
}

const initialFormData: AppState=
{
    form:{
    name: '',
    description: '',
    priority: '',
    date: '',
    fromtime: '',
    totime: '',
    tag: '',
    status: 'not-completed',
    },
    minDate:''
}


const AddItemSlice = createSlice({
    name:'addItem',
    initialState:initialFormData,
    reducers:{setFormData:(state,action:PayloadAction<Partial<TodoItem>>)=>
    {
        return({...state,...action.payload})
    },
    resetForm:()=>initialFormData,
    setMinDate:(state,action:PayloadAction<string>)=>
    {
        state.minDate = action.payload
    }
},
});

export const {setFormData,resetForm,setMinDate} = AddItemSlice.actions;
export default AddItemSlice.reducer;