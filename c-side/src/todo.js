import React,{useState,useEffect,useContext} from "react";
import {context} from "./App";
import "./App.css";
const Todo=()=>{
  const {val,setVal}=useContext(context);
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");

/*  useEffect(()=>{setInput("home work"),[]});
   useEffect(()=>{
   setTask(getLocalStorage("list"));
 },[]);*/
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTask = () => {
    if (input.trim() === "") return;
    setTask([...task, { id: Date.now(), text: input }]);
    setVal(input);
    setInput("");
  };

  const deleteTask = (id) => {
    setTask(task.filter((tasks) => tasks.id !== id));
  };

  const update = (id) => {
    const updatedText = prompt("Edit the task", task.find((t) => t.id === id)?.text);
    if (updatedText) {
      setTask(
        task.map((t) => (t.id === id ? { ...t, text: updatedText } : t))
      );
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {task.map((tasks) => (
          <li key={tasks.id} className="task-item">
            <span>{tasks.text}</span>
            <button onClick={() => update(tasks.id)}>Update</button>
            <button onClick={() => deleteTask(tasks.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Todo;
