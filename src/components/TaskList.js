import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../appState/notificationSlice";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../utilities/tasksHelpers";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const dispatch = useDispatch();

  const token = localStorage.getItem("user-token");

  const getAllTasksReq = async () => {
    const res = await getAllTasks(token);
    if (res.error) {
      dispatch(setNotification({ type: "error", txt: res.error, show: true }));
      return;
    }
    setTodos(res.tasks);
  };
  useEffect(() => {
    getAllTasksReq();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") {
      dispatch(
        setNotification({
          type: "error",
          txt: "please enter a title",
          show: true,
        })
      );
      return;
    }
    const res = await addTask(newTodo, token);
    if (res.error) {
      dispatch(setNotification({ type: "error", txt: res.error, show: true }));
      return;
    }
    getAllTasksReq();
    setNewTodo("");
  };

  const handleDeleteTodo = async (id) => {
    const res = await deleteTask(id, token);
    if (res.error) {
      dispatch(setNotification({ type: "error", txt: res.error, show: true }));
      return;
    }
    getAllTasksReq();
  };

  const handleEditTodoStart = (id, title) => {
    setEditTodoId(id);
    setEditTodoTitle(title);
  };

  const handleEditTodo = async (id, todo) => {
    if (todo.title && todo.title.trim() === "") {
      dispatch(
        setNotification({ type: "error", txt: "please add title", show: true })
      );
      return;
    }
    const res = await updateTask(id, todo, token);
    if (res.error) {
      dispatch(setNotification({ type: "error", txt: res.error, show: true }));
      return;
    }
    setEditTodoId(null);
    setEditTodoTitle("");
    getAllTasksReq();
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-6 text-3xl font-extrabold italic text-gray-600">
        Todo List
      </h1>

      <div className="flex">
        <input
          type="text"
          className="border rounded-l py-2 px-3"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      {todos.length === 0 ? (
        <h3>There are no tasks yet...</h3>
      ) : (
        <ul className="mt-4">
          {todos?.map((todo) => (
            <li
              key={todo._id}
              className={`flex items-center justify-between bg-white py-2 px-3 mb-2 rounded shadow-md ${
                todo.isDone ? "opacity-50" : ""
              }`}
            >
              {editTodoId === todo._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editTodoTitle}
                    onChange={(e) => setEditTodoTitle(e.target.value)}
                    className="border rounded py-2 px-3 mr-2"
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 rounded"
                    onClick={() =>
                      handleEditTodo(todo._id, { title: editTodoTitle })
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() =>
                      handleEditTodo(todo._id, { isDone: !todo.isDone })
                    }
                    className="mr-2"
                  />
                  <span>{todo.title}</span>
                </div>
              )}
              <div>
                {editTodoId === todo._id ? (
                  <button
                    className="text-gray-500 hover:text-gray-600"
                    onClick={() => {
                      setEditTodoId(null);
                      setEditTodoTitle("");
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleEditTodoStart(todo._id, todo.title)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-600 ml-2"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
