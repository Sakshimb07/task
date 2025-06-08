"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

const Calendar = () => {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasksByDate, setTasksByDate] = useState({});
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("12:00");
  const [newTaskType, setNewTaskType] = useState("Meeting");
  const [editTaskId, setEditTaskId] = useState(null);
  const userId = 1; // Replace with actual user ID if using auth

  const taskColors = {
    Meeting: "#93c5fd",
    Deadline: "#fca5a5",
    Reminder: "#fde68a",
  };

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i });
    }
    return days;
  };

  const getDateKey = () => {
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDay).padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://backendt1-1.onrender.com/api/calendar");
      const grouped = res.data.reduce((acc, task) => {
        if (!acc[task.dateKey]) acc[task.dateKey] = [];
        acc[task.dateKey].push(task);
        return acc;
      }, {});
      setTasksByDate(grouped);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (!selectedDay) return;
    const dateKey = getDateKey();
    const payload = {
      title: newTaskTitle,
      time: newTaskTime,
      type: newTaskType,
      dateKey,
      user_id: userId,
    };

    try {
      if (editTaskId) {
        await axios.put(`http://localhost:5000/api/calendar/${editTaskId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/calendar", payload);
      }
      setNewTaskTitle("");
      setNewTaskTime("12:00");
      setNewTaskType("Meeting");
      setEditTaskId(null);
      await fetchTasks();
    } catch (err) {
      console.error("Task add/update error", err);
    }
  };

  const handleEditTask = (dateKey, task) => {
    setSelectedDay(Number(dateKey.split("-")[2]));
    setNewTaskTitle(task.title);
    setNewTaskTime(task.time);
    setNewTaskType(task.type);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/calendar/${taskId}`);
      await fetchTasks();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentDate]);

  const calendarDays = generateCalendarDays();
  const tasksForMonth = Object.entries(tasksByDate)
    .filter(([key]) => {
      const [y, m] = key.split("-").map(Number);
      return y === currentYear && m === currentDate.getMonth() + 1;
    })
    .sort();

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
      <main style={{ flex: 1, padding: 20, display: "flex", gap: 20 }}>
        {/* Calendar Panel */}
        <div style={{ width: 300, background: "#fff", padding: 20, borderRadius: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={handlePrevMonth}><FaChevronLeft /></button>
            <span>{currentMonth} {currentYear}</span>
            <button onClick={handleNextMonth}><FaChevronRight /></button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginTop: 10 }}>
            {calendarDays.map((d, i) => (
              <div
                key={i}
                onClick={() => d.day && setSelectedDay(d.day)}
                style={{
                  textAlign: "center",
                  lineHeight: "40px",
                  borderRadius: 6,
                  margin: 2,
                  height: 40,
                  cursor: "pointer",
                  backgroundColor: d.day === selectedDay ? "#2563eb" : "#fff",
                  color: d.day === selectedDay ? "#fff" : "#000",
                }}
              >
                {d.day}
              </div>
            ))}
          </div>

          {selectedDay && (
            <div style={{ marginTop: 20 }}>
              <input
                type="text"
                placeholder="Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{ width: "100%", marginBottom: 6 }}
              />
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                style={{ width: "100%", marginBottom: 6 }}
              />
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value)}
                style={{ width: "100%", marginBottom: 6 }}
              >
                <option value="Meeting">Meeting</option>
                <option value="Deadline">Deadline</option>
                <option value="Reminder">Reminder</option>
              </select>
              <button
                onClick={handleAddOrUpdateTask}
                style={{
                  width: "100%",
                  background: "#2563eb",
                  color: "#fff",
                  padding: 8,
                  border: "none",
                  borderRadius: 6,
                }}
              >
                {editTaskId ? <><FaCheck /> Update</> : "Add Task"}
              </button>
            </div>
          )}
        </div>

        {/* Tasks Panel */}
        <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 8 }}>
          <h3 style={{ marginBottom: 10 }}>Tasks for {currentMonth} {currentYear}</h3>
          {tasksForMonth.length === 0 && <p>No tasks available.</p>}
          {tasksForMonth.map(([dateKey, tasks]) => {
            const readable = new Date(dateKey).toDateString();
            return (
              <div key={dateKey} style={{ marginBottom: 20 }}>
                <h4>{readable}</h4>
                {tasks.map(task => (
                  <div
                    key={task.id}
                    style={{
                      background: taskColors[task.type],
                      padding: 10,
                      borderRadius: 6,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{task.time} - {task.type}</span>
                      <span>
                        <button onClick={() => handleEditTask(dateKey, task)}><FaEdit /></button>
                        <button onClick={() => handleDeleteTask(task.id)}><FaTrash /></button>
                      </span>
                    </div>
                    <strong>{task.title}</strong>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Calendar;
