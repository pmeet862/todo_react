import "./App.css";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";

function App() {
  const [listOfTask, setListOfTask] = useState([]);
  const [show, setShow] = useState(true);
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
      inputRef.current.focus();
    });
  };

  const edit = (e) => {
    setShow(false);
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
        inputRef.current.focus();
        setShow(true);
      }
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" id="task" ref={inputRef} />

      <button id="add" onClick={add} style={{ display: show ? true : "none" }}>
        ADD
      </button>

      <button
        id="update"
        ref={editRef}
        onClick={update}
        style={{ display: show ? "none" : true }}
      >
        UPDATE
      </button>

      <div className="displayTodos">
        <div className="removeBullets">
          <table className="table">
            <tbody>
              {listOfTask.map((d) => {
                return (
                  <tr key={d._id} id={d._id}>
                    <td>
                      <b>{d.todos}</b>
                    </td>
                    <td>
                      <button className="btn" todo_id={d._id} onClick={edit}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        todoid={d._id}
                        key={d._id}
                        className="btn"
                        onClick={remove}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
