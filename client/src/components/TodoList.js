import React, { useEffect, useState } from "react";
import axios from "axios";
import FormTodo from "./FormTodo";
import SearchTodo from "./SearchTodo";
import EditTodo from "./EditTodo";
import FilterTodos from "./FilterTodos";
import { Layout } from "antd";

import { Content, Footer, Header } from "antd/es/layout/layout";

const FILTERED_TODOS = {
  All: () => true,
  Active: (title) => !title.isCompleted,
  Completed: (title) => title.isCompleted,
};

const FILTER_TODOS = Object.keys(FILTERED_TODOS);

const TodoList = ({ editedInput, setEditedInput }) => {
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [text, setText] = useState("");
  const [filteredTodos, setfilteredTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await axios.get("https://todo-app-server-five.vercel.app/todos");
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTodos();
  }, []);

  const createTodo = (e) => {
    e.preventDefault();

    axios
      .post("https://todo-app-server-five.vercel.app/todos", {
        title: text,
        isCompleted: false,
      })
      .then((res) => {
        if (res.data && res.status === 200) {
          setTodos((prev) => [...prev, res.data]);
        }
        setText("");
      })
      .catch((err) => console.log(err));
  };

  const toggleCompletedStatus = (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);

    axios
      .put(`https://todo-app-server-five.vercel.app/todos/${id}`, {
        isCompleted: !currentTodo.isCompleted,
      })
      .then((res) => {
        if (res.data && res.status === 200) {
          setTodos((prev) => {
            const updatedTodos = [...prev];
            const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
            updatedTodos[todoIndex] = res.data;
            return updatedTodos;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTodos = (id) => {
    axios
      .delete(`https://todo-app-server-five.vercel.app/todos/${id}`)
      .then((res) => {
        if (res.data && res.status === 200) {
          setTodos((prev) => prev.filter((todo) => todo._id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const editTodos = async (id, newName) => {
    await axios
      .put(`https://todo-app-server-five.vercel.app/todos/${id}`, { title: newName })
      .then((res) => {
        if (res.data && res.status === 200) {
          setTodos((prev) => {
            const updatedTodos = [...prev];
            const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
            updatedTodos[todoIndex] = res.data;
            return updatedTodos;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let searchTodo = [...todos];
    searchTodo = searchTodo.filter((todo) => {
      let newTodo = todo.title.toLowerCase();
      return newTodo.includes(searchInput.toLowerCase();
    });
    setfilteredTodos([...searchTodo]);
  }, [todos, searchInput]);

  const filterList = FILTER_TODOS.map((title) => (
    <FilterTodos
      title={title}
      key={title}
      isPressed={title === filter}
      setFilter={setFilter}
      completed={title.completed}
    />
  ));

  return (
    <div>
      <Layout>
        <Header
          style={{
            fontSize: "30px",
            textAlign: "center",
            color: "white",
            backgroundColor: "lightgray",
          }}
        >
          ToDo App
        </Header>
      </Layout>

      <Layout>
        <Content style={{ marginTop: "20px", textAlign: "center" }}>
          {filterList}
          <FormTodo createTodo={createTodo} text={text} setText={setText} />

          <SearchTodo
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          {filteredTodos.filter(FILTERED_TODOS[filter]).map((todo, index) => (
            <div className="todo" key={index}>
              <EditTodo
                editTodos={editTodos}
                deleteTodos={deleteTodos}
                toggleCompletedStatus={toggleCompletedStatus}
                title={todo.title}
                id={todo._id}
                isCompleted={todo.isCompleted}
              />
            </div>
          ))}
        </Content>
      </Layout>

      <Footer style={{ textAlign: "center", color: "#999" }}>
        This App Is Made With AntDesign©
      </Footer>
    </div>
  );
};

export default TodoList;
