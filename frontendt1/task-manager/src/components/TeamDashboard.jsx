"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "Mon", Completed: 6, Pending: 2 },
  { name: "Tue", Completed: 7, Pending: 3 },
  { name: "Wed", Completed: 6, Pending: 3 },
  { name: "Thu", Completed: 7, Pending: 2 },
  { name: "Fri", Completed: 8, Pending: 2 },
  { name: "Sat", Completed: 4, Pending: 1 },
  { name: "Sun", Completed: 3, Pending: 0 },
];

const pieData = [
  { name: "Completed", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Not Started", value: 5 },
  { name: "Delayed", value: 3 },
];

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF4C4C"];

const TeamDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get("http://localhost:5000/api/tasks/team", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(res.data);
      } catch (err) {
        setError("Failed to load tasks");
      }
    };

    fetchTasks();
  }, [navigate]);

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
              className={`block w-48 px-3 py-2 rounded-md text-sm font-medium no-underline ${
                location.pathname === link.path
                  ? "bg-blue-100 text-gray-800"
                  : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 flex justify-between items-center sticky top-0 z-10 h-[60px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-[860px] h-[30px] px-4 py-2 rounded-lg text-base border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" style ={{ width: "80%", height: "20px", padding: "10px 15px", borderRadius: "8px", border: "1px solid #d1d5db", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", fontSize: "16px", color: "#374151" }}
          />
          <div className="flex items-center space-x-8 text-3xl" style={{ fontSize: "24px", color: "#374151" }}>
            <span className="cursor-pointer">🔔</span>
            <span className="cursor-pointer">👤</span>
          </div>
        </header>

        {/* Charts section */}
        <section className="p-8" style={{ padding: "20px", marginTop: "20px" , display: "flex", flexDirection: "column", gap: "24px"  }}>
          <div className="flex gap-6" style={{ gap: "16px" }}>
            <div className="bg-white p-6 rounded-lg shadow-sm w-1/2 h-[350px] " style={{ width: "50%", height: "350px", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3 className="text-lg font-semibold mb-4">Task Completion Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Completed" fill="#00C49F" />
                  <Bar dataKey="Pending" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm w-1/2 h-[350px]" style={{ width: "50%", height: "350px", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3 className="text-lg font-semibold mb-4">Project Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="px-8 overflow-x-auto" style={{ overflowX: "auto" ,marginTop: "30px" }}>
          <div className="flex flex-row flex-nowrap space-x-6 min-w-max px-6" style={{ overflowX: "auto" , display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "24px", minWidth: "max-content", padding: "24px" }}>
            <div className="text-white p-6 rounded-xl shadow-lg min-w-[250px] bg-[#aac4e5]" style={{ minWidth: "200px",padding: "24px" ,borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" , backgroundColor: "#aac4e5" ,height: "100px"}}>
              <h3 className="text-lg font-semibold">Team Members</h3>
              <p className="text-3xl font-bold my-2">8</p>
              <span className="text-blue-100">2 online now</span>
            </div>
            <div className="text-white p-6 rounded-xl shadow-lg min-w-[250px] bg-[#8db1de]" style={{ minWidth: "200px", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor: "#8db1de", height: "100px" }}>
              <h3 className="text-lg font-semibold">Projects</h3>
              <p className="text-3xl font-bold my-2">6</p>
              <span className="text-purple-100">2 launching soon</span>
            </div>
            <div className="text-white p-6 rounded-xl shadow-lg min-w-[250px] bg-[#6999d6]" style={{ minWidth: "200px", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor: "#6999d6", height: "100px" }}>
              <h3 className="text-lg font-semibold">Assigned Tasks</h3>
              <p className="text-3xl font-bold my-2">8</p>
              <span className="text-pink-100">1 pending</span>
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="p-8 text-xs text-[#374151] font-inter flex flex-col gap-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-[#f9fafb] rounded-lg p-4 shadow-sm">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <strong>Sarah Chen</strong> completed the task {" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Homepage Redesign
                  </a>
                </div>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <strong>Mike Wilson</strong> added a new task {" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    API Integration
                  </a>
                </div>
                <span className="text-gray-500 text-sm">4 hours ago</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamDashboard;
