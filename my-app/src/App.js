import './App.css';
import React from 'react';
import { useState, useEffect } from "react";

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault(); // stops from refreshing webpage
        if (toDo === "") {
            return;
        }
        setToDos((currentArray) => [...currentArray, toDo]);
        setToDo(""); // passing empty string as argument through setToDo function
    }
    console.log(toDos);

    return (
        <div>
            <h2>My To Dos : ({toDos.length})</h2>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange} 
                    value={toDo} 
                    type="text" 
                    placeholder="Write your to do..." 
                />
                <button>Add To Do</button>
            </form>
        </div>
    );
}

export default App;
