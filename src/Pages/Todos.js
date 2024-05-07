import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const backendUrl = `https://ps-todo-bn.onrender.com`;

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/todos`, authHeader);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/todo`,
        formData,
        authHeader
      );
      toast.success(response.data.message);
      fetchTodos();
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo");
    }
  };

  const handleViewTodo = async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/todos/${id}`, authHeader);
      setCurrentTodo(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
      });
    } catch (error) {
      console.error("Error fetching todo:", error);
      toast.error("Failed to fetch todo");
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/todos/${currentTodo.id}`,
        formData,
        authHeader
      );
      setCurrentTodo(null);
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/todos/${id}`,
        authHeader
      );
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  const handleLogout = () => {
    // Perform logout action
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the home page
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-4">Todos</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>
      <form
        onSubmit={currentTodo ? handleUpdateTodo : handleCreateTodo}
        className="my-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="block w-full border rounded py-2 px-3 mb-3"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full border rounded py-2 px-3 mb-3"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {currentTodo ? "Update" : "Create"}
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="border rounded p-4 my-4">
          <h2 className="text-lg font-semibold">{todo.title}</h2>
          <p className="text-gray-600">{todo.description}</p>
          <div className="mt-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={() => handleViewTodo(todo.id)}
            >
              View
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
