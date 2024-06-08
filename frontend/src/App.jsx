import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import Table1 from './components/Table1'

function App() {

  const [todos, setTodos] = useState("")
  const [isLoading, setisLoading] = useState(true)
              // integrating backend and front end by installing axios and using useEffect method

            const fetchData = async () => {
              try {
                const response = await axios.get("http://127.0.0.1:8000/api/todo/");
                setTodos(response.data)
                setisLoading(false)
                // console.log(response);
              } catch (error) {
                console.log('Error fetching data:', error);
              }
            }
          
            useEffect(() => {
              fetchData()
              console.log(todos);

              


            }, []);
          
  

  return (
    <div className='bg-indigo-200 px-8 min-h-screen '>
      <nav className='pt-8 '>
        <h1 className='text-5xl text-center pb-12 py-2  border rounded-xl'>ToDo List</h1> 
      </nav>
      <TodoForm
      setTodos={setTodos}
      fetchData={fetchData}
      />
      <Table1 
      todos={todos}
      setTodos={setTodos}
      isLoading={isLoading}
      
      />

      {/* going to pass the prop todo to table1 : mathi */}
    </div>
  )
}

export default App
