import React, { useState } from 'react';
import axios from 'axios';

// after putting in todoForm {setTools, fetchData,}/>

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    Description: ''
  });
  // uta model ma Description capital letter ma xa so, yeta pani you have to use capital.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(newTodo);
  };

  // Function to post new todo
  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
      console.log('New todo added:', newTodo);
      // Optionally, you can reset the form or update your state, mathi const ma define garepaxi
      // Api bata directly call hune vayera setTodo garirana pardaina, just fetchData can reload the changes 
        // setTodos(prevTodos => [...prevTodos, newTodo])
        setNewTodo({ title: '', Description: '' });      //task add vayepaxi reset or update state ma huna lai
        fetchData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='py-2'>
      <input 
        type="text" 
        name="title" 
        placeholder="Add Todo" 
        className="input input-bordered input-info w-full max-w-xs ml-4" 
        onChange={handleChange} 
        value={newTodo.title} 
      />
      <br /> 
      <br />
      <input 
        type="text" 
        name="Description" 
        placeholder="Description Here" 
        className="input input-bordered input-info w-full max-w-xs ml-4" 
        onChange={handleChange} 
        value={newTodo.Description}
      /> 
      <br />
      <br />
      <button className="btn btn-active btn-primary ml-4" onClick={postTodo}>Add Task</button>
    </div>
  );
}

export default TodoForm;
