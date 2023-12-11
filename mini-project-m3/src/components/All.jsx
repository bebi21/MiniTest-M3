import axios from "axios";
import React, { useEffect, useState } from "react";
export default function All() {
  const [checkRender, setCheckRender] = useState(false);
  const [toDoList, settoDoList] = useState([]);
  const takeData = async () => {
    const dataServer = await axios.get("http://localhost:5200/api/v1/todos");
    const dataUser1 = dataServer.data.filter((item) => item.userId == 11);
    settoDoList(dataUser1);
  };
  useEffect(() => {
    takeData();
  }, [checkRender]);
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
    console.log(item);
    await axios.patch(
      `http://localhost:5200/api/v1/todos/compalete/${item.id}`,
      item
    );
    setCheckRender(!checkRender);
  };
  return (
    <>
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
    </>
  );
}
