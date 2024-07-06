import React, { useState } from "react";
import axios from 'axios';

function Create() {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        axios.post('http://localhost:3000/add', { task: task })
    .then(result => {location.reload()})
    .catch(err => {
        if (err.response) {
            console.log("Response error:", err.response.data);
        } else if (err.request) {
            console.log("Request error:", err.request);
        } else {
            console.log("Error", err.message);
        }
    });

    };

    return (
        <div className="create_form">
            <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
