import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store/store';  
import TextField from './AddItem';

describe('TextField Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <TextField />
        </Router>
      </Provider>
    );
  });

  test('updates form data on input change', async () => {
    const nameInput = screen.getByPlaceholderText(/Enter Task Name/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter Description/i);
    const tagInput = screen.getByPlaceholderText(/Enter Tag/i);


    fireEvent.change(nameInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test task.' } });
    fireEvent.change(tagInput, { target: { value: 'Urgent' } });

    
    await waitFor(() => {
      expect(nameInput).toHaveValue('Test Task');
      expect(descriptionInput).toHaveValue('This is a test task.');
      expect(tagInput).toHaveValue('Urgent');
    });
  });

  test('shows an error toast if required fields are missing on submit', async () => {
    
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    
    await waitFor(() =>
      expect(screen.getByText(/Please fill out all fields before submitting the form./i)).toBeInTheDocument()
    );
  });

  test('handles form submit with valid data', async () => {
    
    fireEvent.change(screen.getByPlaceholderText(/Enter Task Name/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Description/i), { target: { value: 'This is a test task.' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Tag/i), { target: { value: 'Urgent' } });

    
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    
    await waitFor(() => {
      
      setTimeout(() => {
        expect(screen.getByPlaceholderText(/Enter Task Name/i)).not.toHaveValue('Test Task');
        expect(screen.getByPlaceholderText(/Enter Description/i)).not.toHaveValue('This is a test task.');
        expect(screen.getByPlaceholderText(/Enter Tag/i)).not.toHaveValue('Urgent');
      }, 500); 
    });

    
    console.log("State after reset: ", store.getState());
  });
});
