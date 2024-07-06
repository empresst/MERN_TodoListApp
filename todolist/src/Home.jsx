import React, { useEffect, useState } from "react";
import Create from "./Create";
import './App.css'; // Make sure App.css contains your CSS styles
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import icons from react-icons

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get')
            .then(result => {setTodos(result.data); })
            .catch(error => {console.log(error);});
    }, []);

    const handleEdit = (id) =>{
        axios.put('http://localhost:3000/update/'+id)
            .then(result => {location.reload();})
            .catch(error => {console.log(error); });
    }
    
    const handleDelete = (id) =>{
        axios.delete('http://localhost:3000/delete/'+id)
            .then(result => {location.reload();})
            .catch(error => {console.log(error); });
    }

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div><h2>No Records</h2></div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className="todo-item">
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsFillCheckCircleFill className="icon" ></BsFillCheckCircleFill>
                            :   <BsCircleFill className="icon"/>
                            }
                            <p className={todo.done ? "line_through": ""}>{todo.task}</p>
                            
                        </div>
                        <div className="delete-icon">
                            <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;

