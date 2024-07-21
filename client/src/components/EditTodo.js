import React, { useState } from "react";
import { Flex } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EditTodo = ({
  title,
  id,
  editTodos,
  toggleCompletedStatus,
  deleteTodos,
  isCompleted,
}) => {
  const [editedInput, setEditedInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodos(id, editedInput);
    setEditedInput("");
    setIsEditing(false);
  };

  const showEdit = (
    <form onSubmit={handleSubmit} className="edit-todo">
      <label htmlFor={id} style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {title}
      </label>
      <input
        value={editedInput}
        onChange={(e) => setEditedInput(e.target.value)}
        id={id}
        placeholder="Edit your todo..."
        autoFocus
        defaultValue={id}
      />
      <button onClick={() => setIsEditing(false)}>Cancel</button>
      <span style={{ visibility: "hidden" }}> renaming{title}</span>
      <button type="submit">Save</button>
      <span style={{ visibility: "hidden" }}> new name for{title}</span>
    </form>
  );

  const dontShowEdit = (
    <Flex gap="small">
      <input
        type="checkbox"
        onChange={() => toggleCompletedStatus(id)}
        checked={isCompleted}
      />
      <p className={`${isCompleted ? "completed" : ""}`}> {title}</p>

      <button onClick={() => setIsEditing(true)} className="edit-button">
        <EditOutlined />
      </button>
      <button onClick={() => deleteTodos(id)} className="delete-button">
        <DeleteOutlined />
      </button>
    </Flex>
  );

  return <div>{isEditing ? showEdit : dontShowEdit}</div>;
};

export default EditTodo;
