import axios from 'axios';
import React from 'react'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";



const Table1 = ({todos, setTodos, isLoading }) => {

    // delete ta hamle table garni ho so, table1 components ma garni tesko kaam, jun kura j ma garxam tei ma lekhni 
    // won't work without importing axios.
    const handleDelete = async (id) =>{ 
        try{
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            //id delete vaye paxi filter garera dekhauna ko lagi 
            const newList = todos.filter(todo => todo.id !==id)
            setTodos(newList)
        } catch(error){
            console.log(error);
        }
    }


    //aba edit ko pali, edit lai handle garnu paryoni
    const handleEdit = async(id, value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`,value)
            // response patch gar ani nayatodo(updated form) map gar if, else condition lagayera(to.id =id vaye response data natra todo)
            const newTodos = todos.map(todo =>todo.id === id ? response.data : todo)
            setTodos(newTodos)

        } catch(error) {
            console.log(error);
        }
    }
    // checkbox ko completed vaye tick, non completed vaye untick.garna lai hola

    const handleCheckbox = (id, value ) => {
        handleEdit(id,{
            'completed': !value
        })
    }


  return (
    <div className='py-2  border rounded-xl'>
        
        <table className='w-11/12 max-w-4x1'>
            <thead className='border-b-2 border-black'>
                <tr>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>Checkbox </th>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>To do </th>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>Description</th>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>Status</th>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>Data Created</th>
                    <th className='p-4 text-sm font-semibold tracking-wide text-left '>Actions</th>

                    </tr>
            </thead>
            <tbody>
                {isLoading ? <div>Is Loading</div>:
                <>
                
                {/* is loading fxn use garepaxi matrai hunxa  */}
                {todos.map((todoItem, index) =>{
                    return(
                        <tr key={todoItem.id} className='border-b border-black '>
                    <td className='p-3 text-sm' title={todoItem.id}>

                        {/* api ma completed vanyo vani checked, natra unchecked garauna if,else(?:) hC vanni mathi bata lerako  */}
                        {/* checkbox click garepaxi handle garera if else xa tya tyo anusar (done, undone banau vanera ) 
                        */}
                        <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                         className='inline-block cursor-pointer'> {todoItem.completed    ? <MdOutlineCheckBox/>:
                        <MdOutlineCheckBoxOutlineBlank/>} </span>   
                        </td>
                    <td className='p-3 text-sm'>{todoItem.title}</td>    
                    {/* api ma j vanera pass gareko xa, tei vanera yeha lekhni ho hai : todoItem."" */}
                    <td className='p-3 text-sm'>{todoItem.Description}</td>
                    <td className='p-3 text-sm text-center'>
                        {/* ifelse,?:lagauda pahila ko case ma ``(tilt use grni ani paxi '') */}
                        <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed?'bg-green-300':'bg-red-300'} `}>
                            {todoItem.completed ? 'Done': 'Incomplete'}
                            
                            </span>
                        </td>
                        {/* date cahie ahile ko format anusar local string ma rakhde ()yo pani rakhna parxa, else no date shown */}
                    <td className='p-3 text-sm'>{new Date(todoItem.created).toLocaleString()}</td>
                    <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5 '>
                        <span className='text-2xl cursor-pointer'>
                            {/* daisyui/components/modal ko label (hidden) */}
                        <label htmlFor="my_modal_6" className="btn bg-indigo-200"><MdEditNote/></label></span>
                        {/* yeha nira cahie delete ko code:so handledelete vanni onclick ko event use garera todoItem ko id lai  */}
                        <span className='text-2xl cursor-pointer'>
                        <label  className="btn bg-indigo-200 ml-1"> <MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)}/></label></span>
                        </td>
                </tr>

                    )
                })
                     }</> }
                     

               

            </tbody>
        </table>


        {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn">open modal</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Edit Todo</h3>
                <input type="text" name='title' placeholder="Add Todo" className="input input-bordered w-full  mb-4" />
                <input type="text" name='Description' placeholder="Description here" className="input input-bordered w-full " />
                <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn btn-primary">Edit</label>  
                <label htmlFor="my_modal_6" className="btn">Close!</label>
                </div>
            </div>
            </div>


    </div>
  )
}

export default Table1