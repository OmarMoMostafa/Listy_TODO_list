import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Finish homework", completed: false },
    { id: 2, title: "Go grocery shopping", completed: false },
    { id: 3, title: "Clean the house", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleEditTodoStart = (id, title) => {
    setEditTodoId(id);
    setEditTodoTitle(title);
  };

  const handleEditTodoSave = (id) => {
    if (editTodoTitle.trim() !== "") {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: editTodoTitle };
        } else {
          return todo;
        }
      });

      setTodos(updatedTodos);
      setEditTodoId(null);
      setEditTodoTitle("");
    }
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

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between bg-white py-2 px-3 mb-2 rounded shadow-md ${
              todo.completed ? "opacity-50" : ""
            }`}
          >
            {editTodoId === todo.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                  className="border rounded py-2 px-3 mr-2"
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 rounded"
                  onClick={() => handleEditTodoSave(todo.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCompleteTodo(todo.id)}
                  className="mr-2"
                />
                <span>{todo.title}</span>
              </div>
            )}
            <div>
              {editTodoId === todo.id ? (
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
                  onClick={() => handleEditTodoStart(todo.id, todo.title)}
                >
                  Edit
                </button>
              )}
              <button
                className="text-red-500 hover:text-red-600 ml-2"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
// import React, { useState } from "react";

// function TaskList() {
//   const [todos, setTodos] = useState([
//     { id: 1, title: "Finish homework", completed: false },
//     { id: 2, title: "Go grocery shopping", completed: false },
//     { id: 3, title: "Clean the house", completed: false },
//   ]);
//   const [newTodo, setNewTodo] = useState("");

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== "") {
//       const newTodoItem = {
//         id: todos.length + 1,
//         title: newTodo,
//         completed: false,
//       };

//       setTodos([...todos, newTodoItem]);
//       setNewTodo("");
//     }
//   };

//   const handleDeleteTodo = (id) => {
//     const updatedTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(updatedTodos);
//   };

//   const handleCompleteTodo = (id) => {
//     const updatedTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         return { ...todo, completed: !todo.completed };
//       } else {
//         return todo;
//       }
//     });
//     setTodos(updatedTodos);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="my-6  text-3xl font-extrabold italic text-gray-600">
//         Todo List
//       </h1>

//       <div className="flex">
//         <input
//           type="text"
//           className="border rounded-l py-2 px-3"
//           placeholder="Add a new todo"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r"
//           onClick={handleAddTodo}
//         >
//           Add
//         </button>
//       </div>

//       <ul className="mt-4">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className={`flex items-center justify-between bg-white py-2 px-3 mb-2 rounded shadow-md ${
//               todo.completed ? "opacity-50" : ""
//             }`}
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => handleCompleteTodo(todo.id)}
//                 className="mr-2"
//               />
//               <span>{todo.title}</span>
//             </div>
//             <button
//               className="text-red-500 hover:text-red-600"
//               onClick={() => handleDeleteTodo(todo.id)}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TaskList;
