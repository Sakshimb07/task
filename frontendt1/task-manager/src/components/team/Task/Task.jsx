"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "Low",
    startDate: "",
    dueDate: "",
    status: "Pending",
    assignee_id: "", // We'll convert to number before submit
    manager_id: "",
    bd_id: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks"); // Make sure URL matches backend
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    // Validation: check no empty fields
    const {
      name,
      priority,
      startDate,
      dueDate,
      status,
      assignee_id,
      manager_id,
      bd_id,
    } = newTask;

    if (
      !name ||
      !priority ||
      !startDate ||
      !dueDate ||
      !status ||
      !assignee_id ||
      !manager_id ||
      !bd_id
    ) {
      alert("Please fill all fields");
      return;
    }

    // Convert IDs to numbers before sending
    const payload = {
      name,
      priority,
      startDate,
      dueDate,
      status,
      assignee_id: Number(assignee_id),
      manager_id: Number(manager_id),
      bd_id: Number(bd_id),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", payload);
      setTasks((prev) => [...prev, res.data]);
      setNewTask({
        name: "",
        priority: "Low",
        startDate: "",
        dueDate: "",
        status: "Pending",
        assignee_id: "",
        manager_id: "",
        bd_id: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error adding task");
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusClasses = (status) => {
    switch (status.toLowerCase().replace(" ", "-")) {
      case "pending":
        return "text-orange-600";
      case "in-progress":
        return "text-blue-600";
      case "review":
        return "text-purple-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const location = useLocation();
  const navLinks = [
    { path: "/team", label: "Dashboard" },
    { path: "/team/task", label: "Tasks" },
    { path: "/team/notice", label: "Notice Board" },
    { path: "/team/calendar", label: "Calendar" },
    { path: "#", label: "Time Sheet" },
    { path: "/team/alert", label: "Alerts" },
    { path: "#", label: "Setting" },
  ];

  return (
     <div className="flex min-h-screen text-[#374151] text-base font-inter bg-gray-100" style={{ display: "flex", minHeight: "100vh", color: "#374151", fontSize: "16px", fontFamily: "Inter, sans-serif", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside className="w-[230px] bg-white p-5 sticky top-0 h-screen overflow-y-auto" style={{ width: "230px", backgroundColor: "#fff", padding: "20px", position: "sticky", top: "0", height: "100vh", overflowY: "auto" }}>
        <h2 className="text-2xl font-bold text-blue-600 mb-10 text-center">⚡ Taskflow</h2>
        <nav className="flex flex-col space-y-6 text-[19px] text-[#3c3e40] font-medium text-left leading-[2.5]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block w-48 px-3 py-2 rounded-md text-sm font-medium no-underline ${location.pathname === link.path
                  ? "bg-blue-100 text-gray-800"
                  : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto" style={{ flex: "1", padding: "24px", overflowY: "auto" }}>
        <div className="space-y-6"  style={{ display: "flex", flexDirection: "column", gap: "24px" , padding: "24px", backgroundColor: "#f3f4f6" , borderRadius: "8px" , boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex justify-between items-center "  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , paddingBottom: "24px" , marginBottom: "24px", borderBottom: "1px solid #e5e7eb"  }}>
            <h2 className="text-2xl font-semibold">My Tasks</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 " style ={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "8px", backgroundColor: "#2563eb", color: "#fff", fontWeight: "500", cursor: "pointer", transition: "background-color 0.2s ease-in-out" }}
            >
              + New Task
            </button>
          </div>


          

          {showForm && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", zIndex: 50 , cursor: "pointer" , overflow: "hidden", padding: "14px", borderRadius: "8px" , border: "1px solid #e5e7eb" , boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , marginLeft: "-30px", marginRight: "30px" ,backgroundColor: "#f3f4f6", marginTop: "-20px" }}
              onClick={() => setShowForm(false)}
            >
              <div
                className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl "
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4  ">Add New Task</h3>
                <form className="space-y-3 " onSubmit={handleAddTask}>
                  <input
                    name="name"
                    value={newTask.name}
                    onChange={handleChange}
                    placeholder="Task Name"
                    required
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                  />
                  <input
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    placeholder="Priority (Low/Medium/Urgent)"
                    required
                    className="w-full p-3 border rounded-lg " style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                  />
                  <input
                    name="startDate"
                    type="date"
                    value={newTask.startDate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }} 
                  />
                  <input
                    name="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                  />
                  <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }
                  }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Review</option>
                    <option>Completed</option>
                  </select>
                  <input
                    name="assignee_id"
                    type="number"
                    value={newTask.assignee_id}
                    onChange={handleChange}
                    placeholder="Assignee ID"
                    required
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                    min={1}
                  />
                  <input
                    name="manager_id"
                    type="number"
                    value={newTask.manager_id}
                    onChange={handleChange}
                    placeholder="Manager ID"
                    required
                    className="w-full p-3 border rounded-lg"  style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                    min={1}
                  />
                  <input
                    name="bd_id"
                    type="number"
                    value={newTask.bd_id}
                    onChange={handleChange}
                    placeholder="BD ID"
                    required
                    className="w-full p-3 border rounded-lg" style={{ padding: "12px", border: "1px solid #e5e7eb ", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
                    min={1}
                  />
                  <div className="flex justify-end gap-4 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 " style={{ backgroundColor: "#9ca3af", color: "#fff", padding: "8px 24px", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.2s ease-in-out" }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" style={{ backgroundColor: "#3498db", color: "#fff", padding: "8px 24px", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.2s ease-in-out" }}
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Task Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="grid grid-cols-7 gap-4 font-bold text-gray-700 border-b pb-2">
              <span>ID</span>
              <span>Task</span>
              <span>Priority</span>
              <span>Start</span>
              <span>Due</span>
              <span>Status</span>
              <span>Options</span>
            </div>

            {tasks.map((task, idx) => (
              <div
                key={task.id} // Use unique id, not idx
                className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50 min-w-0"
              >
                <span>{task.id}</span>
                <span className="truncate overflow-hidden whitespace-nowrap">
                  {task.name}
                </span>
                <span
                  className={`px-2 py-1 rounded-xl text-xs font-medium ${getPriorityClasses(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
                <span>{task.startDate}</span>
                <span>{task.dueDate}</span>
                <span
                  className={`capitalize font-medium ${getStatusClasses(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <span className="text-gray-400 cursor-pointer hover:text-gray-600">
                  <FaEllipsisV />
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
