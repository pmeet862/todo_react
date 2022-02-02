import "./App.css";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";

function App() {
  const [listOfTask, setListOfTask] = useState([]);

  const inputRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    Axios.get("http://localhost:5000/todo").then((response) => {
      // console.log(response);
      setListOfTask(response.data);
    });
  }, []);

  const add = () => {
    const input = inputRef.current.value.trim();
    Axios.post("http://localhost:5000/todo", { todos: input }).then(
      (response) => {
        console.log(response);
        const temp = [...listOfTask];
        temp.push(response.data);
        setListOfTask(temp);
      }
    );

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const remove = (e) => {
    const id = e.target.getAttribute("todoid");
    const a = document.getElementById(id);
    a.remove();
    console.log(a, e.target);
    console.log(id);

    Axios.delete(`http://localhost:5000/todo/${id}`).then((response) => {
      console.log(response);
    });
  };

  const edit = (e) => {
    const id = e.target.getAttribute("todo_id");
    const a = document.getElementById(id);
    const b = a.getElementsByTagName("b")[0];
    const val = b.innerText;
    inputRef.current.value = val;
    inputRef.current.focus();
    editRef.current.value = id;
  };

  const update = (e) => {
    const id = e.target.value;
    const update = inputRef.current.value.trim();

    Axios.put(`http://localhost:5000/todo/${id}`, { todos: update }).then(
      (response) => {
        console.log(response);
        const a = document.getElementById(id);
        const b = a.getElementsByTagName("b")[0];
        b.innerText = update;
        console.log(a);
        inputRef.current.value = "";
      }
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" id="task" ref={inputRef} />
      <button id="add" onClick={add}>
        ADD
      </button>
      <button id="update" ref={editRef} onClick={update}>
        UPDATE
      </button>
      <div>
        <ul className="removeBullets">
          {listOfTask.map((d) => {
            return (
              <li key={d._id} id={d._id}>
                <b>{d.todos}</b>
                <button className="btn1" todo_id={d._id} onClick={edit}>
                  Edit
                </button>
                <button
                  todoid={d._id}
                  key={d._id}
                  className="btn"
                  onClick={remove}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
