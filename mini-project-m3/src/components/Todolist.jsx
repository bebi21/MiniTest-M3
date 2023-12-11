import React, { useEffect, useState } from "react";
import "./Todolist.css";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import Loading from "./Loading";

export default function Todolist() {
  const [toDoList, settoDoList] = useState([]);
  const [newToDo, setNewToDo] = useState({
    userId: 11,
    title: "",
    completed: false,
  });
  const [check, setCheck] = useState(true);
  const [checkRender, setCheckRender] = useState(false);
  const [compalete, setCompalate] = useState(0);
  const [loading, setLoading] = useState(false);

  const takeData = async () => {
    setLoading(true);
    try {
      const dataServer = await axios.get(
        "http://localhost:5200/api/v1/todos?per_page=4"
      );

      settoDoList(dataServer.data.render);
      let compaleteRen = dataServer.data.render.filter(
        (item) => item.completed == false
      );
      setCompalate(compaleteRen.length);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };
  useEffect(() => {
    takeData();
  }, [checkRender]);

  const handleTakeValue = (e) => {
    let { name, value } = e.target;

    if (newToDo.id) {
      setNewToDo({
        ...newToDo,
        [name]: value,
      });
      return;
    }

    setNewToDo({
      ...newToDo,
      [name]: value,
      id: Math.floor(Math.random() * 9999),
    });
  };

  const handleSendValue = async (e) => {
    if (e.key === "Enter") {
      if (newToDo.title == "") {
        return;
      }
      if (!check) {
        await axios.patch(
          `http://localhost:5200/api/v1/todos/${newToDo.id}`,
          newToDo
        );
        setCheckRender(!checkRender);
        setCheck(true);
        setNewToDo({
          userId: 11,
          title: "",
          completed: false,
        });
        return;
      }
      await axios.post("http://localhost:5200/api/v1/todos", newToDo);
      setCheckRender(!checkRender);
      setNewToDo({
        userId: 11,
        title: "",
        completed: false,
      });
    }
  };
  // Xoa
  const handleDelete = async (id) => {
    const newData = await axios.delete(
      `http://localhost:5200/api/v1/todos/${id}`
    );
    setCheckRender(!checkRender);
  };

  // Sua

  const handleEdit = async (item) => {
    setNewToDo(item);
    setCheck(false);
  };

  // hoan thanh

  const handleCompale = async (item) => {
    item.completed = !item.completed;

    await axios.patch(
      `http://localhost:5200/api/v1/todos/compalete/${item.id}`,
      item
    );
    setCheckRender(!checkRender);
  };

  // xoa het

  const handleRemoveAll = async (item) => {
    console.log(111);
    await axios.delete(
      "http://localhost:5200/api/v1/todos/remove/all    ",
      toDoList
    );
    setCheckRender(!checkRender);
  };

  const [pending, setPending] = useState();
  const handlePending = () => {
    let newRender = toDoList.filter((item) => item.completed === false);
    setPending(newRender);
  };

  return (
    <>
      {" "}
      {loading ? <Loading /> : <></>}
      <div className="wrapper">
        <div className="task-input">
          <ion-icon name="create-outline" />
          <input
            type="text"
            placeholder="Add a New Task + Enter"
            onChange={handleTakeValue}
            onKeyDown={handleSendValue}
            name="title"
            value={newToDo.title}
          />
        </div>
        <div className="controls">
          <div className="filters">
            <span>You have {compalete} to Do</span>
            {/* <span className="active" id="all">
              All
            </span>
            <span id="pending" onClick={handlePending}>
              Pending
            </span>
            <span id="completed">Completed</span> */}
          </div>
          <button className="clear-btn active" onClick={handleRemoveAll}>
            Clear All
          </button>
        </div>
        <ul className="task-box">
          {toDoList.map((item, index) => (
            <li className="task" key={index}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  justifyContent: "left",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onClick={() => {
                    handleCompale(item);
                  }}
                />

                {item.completed ? (
                  <p style={{ textDecoration: "line-through" }}>{item.title}</p>
                ) : (
                  <p>{item.title}</p>
                )}
              </label>
              <div>
                {" "}
                <button
                  className="clear-btn active"
                  style={{ marginRight: "20px" }}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="clear-btn active"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
