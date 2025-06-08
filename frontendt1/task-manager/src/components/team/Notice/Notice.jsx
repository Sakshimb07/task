"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Notice = () => {
  const location = useLocation();

  const [notices, setNotices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('https://backendt1-1.onrender.com/api/notice');
      setNotices(res.data);
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.date) {
      alert('All fields are required!');
      return;
    }
    try {
      await axios.post('https://backendt1-1.onrender.com/api/notice', {
        title: formData.title,
        content: formData.description,
        date: formData.date,
        color: "blue" // default color; changeable if needed
      });
      setFormData({ title: '', description: '', date: '' });
      fetchNotices();
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to add notice:', err);
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "blue": return "bg-blue-100";
      case "pink": return "bg-pink-100";
      case "green": return "bg-green-100";
      case "yellow": return "bg-yellow-100";
      default: return "bg-blue-100";
    }
  };

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
      <main className="flex-1 flex flex-col p-8" style={{ flex: "1", padding: "32px" }}>
        <div className="flex justify-between items-center mb-6" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h1 className="text-2xl font-semibold">Notice Board</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-800 transition duration-300 " style={{ backgroundColor: "#1a73e9", color: "#fff", padding: "12px 16px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500", transition: "background-color 0.3s ease" }}
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Add Notice
          </button>
        </div>

        {/* Add Notice Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4 border" style={{ backgroundColor: "#c3dde8", padding: "34px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", marginBottom: "24px", display: "grid", gap: "16px" }}>
            <div>
              <label className="block text-sm font-medium mb-1" >Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb"}}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1"  >Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded-lg" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg" style={{ backgroundColor: "#1a73e9", color: "#fff", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "500" }}
              >
                Add Notice
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" style={{ backgroundColor: "#f7f7f7", color: "#6b7280", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "500" }}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Notice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`${getColorClasses(notice.color)} p-6 rounded-lg shadow border` }     style={{ backgroundColor: notice.color === "blue" ? "#bfdbfe" : notice.color === "pink" ? "#fbcfe8" : notice.color === "green" ? "#bbf7d0" : notice.color === "yellow" ? "#fef08a" : "#bfdbfe", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", border: "1px solid #e5e7eb" , cursor: "pointer", fontSize: "16px", fontFamily: "cursive" }}>
              <div className="text-sm text-gray-600 mb-3" >{notice.date}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2 ">{notice.title}</div>
              <div className="h-px bg-gray-300 mb-3"></div>
              <div className="text-sm text-gray-700 leading-relaxed">{notice.content}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notice;
