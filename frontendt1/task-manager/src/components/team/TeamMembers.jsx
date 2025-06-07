"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

const Members = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Ashish Kumar",
      email: "ashish.kumar@example.com",
      phone: "+91 7894561234",
      joiningDate: "15-Jan-2023",
      department: "Development",
      position: "Frontend Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Pooja Sharma",
      email: "pooja.sharma@example.com",
      phone: "+91 7894561234",
      joiningDate: "03-Mar-2023",
      department: "Design",
      position: "UI/UX Designer",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@example.com",
      phone: "+91 7894561234",
      joiningDate: "22-Apr-2023",
      department: "Development",
      position: "Backend Developer",
      status: "Active",
    },
    {
      id: 4,
      name: "Chirag Patel",
      email: "chirag.patel@example.com",
      phone: "+91 7894561234",
      joiningDate: "10-Jun-2023",
      department: "QA",
      position: "Test Engineer",
      status: "Active",
    },
    {
      id: 5,
      name: "Ashwini Desai",
      email: "ashwini.desai@example.com",
      phone: "+91 7894561234",
      joiningDate: "05-Aug-2023",
      department: "Development",
      position: "Full Stack Developer",
      status: "Active",
    },
    {
      id: 6,
      name: "Dishank Mehta",
      email: "dishank.mehta@example.com",
      phone: "+91 7894561234",
      joiningDate: "17-Oct-2023",
      department: "DevOps",
      position: "DevOps Engineer",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    joiningDate: "",
    department: "",
    position: "",
    status: "Active",
  });

  const handleAddMember = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newId = teamMembers.length + 1;
    setTeamMembers([...teamMembers, { ...newMember, id: newId }]);
    setNewMember({
      name: "",
      email: "",
      phone: "",
      joiningDate: "",
      department: "",
      position: "",
      status: "Active",
    });
    setShowForm(false);
  };

  const handleUpdateMember = (id) => {
    console.log(`Update member with id: ${id}`);
  };

  const handleDeleteMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
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
      <main className="flex-1 p-6 bg-gray-100" style={{ flex: "1", padding: "24px", backgroundColor: "#f3f4f6" }}>
        

        <div className="bg-white p-6 rounded shadow"  style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex justify-between items-center mb-4" style={{ justifyContent: "space-between", marginBottom: "16px" }}>
            <h1 className="text-xl font-bold">Team Members</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded " onClick={handleAddMember}  style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "4px" }}>
              {showForm ? "Close Form" : "Add Team Member"}
            </button>
          </div>

          {showForm && (
            <form className="grid grid-cols-2 gap-4 mb-6  "  onSubmit={handleFormSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px"  }}>
              <input name="name" type="text" placeholder="Name" value={newMember.name} onChange={handleFormChange} required className="p-2 border rounded"  />
              <input name="email" type="email" placeholder="Email" value={newMember.email} onChange={handleFormChange} required className="p-2 border rounded" />
              <input name="phone" type="text" placeholder="Phone" value={newMember.phone} onChange={handleFormChange} required className="p-2 border rounded" />
              <input name="joiningDate" type="text" placeholder="Joining Date (e.g., 01-Jan-2024)" value={newMember.joiningDate} onChange={handleFormChange} required className="p-2 border rounded" />
              <input name="department" type="text" placeholder="Department" value={newMember.department} onChange={handleFormChange} required className="p-2 border rounded"  />
              <input name="position" type="text" placeholder="Position" value={newMember.position} onChange={handleFormChange} required className="p-2 border rounded" />
              <button type="submit" className="col-span-2 bg-green-600 text-white px-4 py-2 rounded  "  >Submit</button>
            </form>
          )}

          <div className="overflow-auto" >
            <table className="w-full table-auto border-collapse"  >
              <thead>
                <tr className="bg-gray-200" style={{ backgroundColor: "#e5e7eb" }}>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Joining Date</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Position</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-100" >
                    <td className="p-2 border">{member.name}</td>
                    <td className="p-2 border">{member.email}</td>
                    <td className="p-2 border">{member.phone}</td>
                    <td className="p-2 border">{member.joiningDate}</td>
                    <td className="p-2 border">{member.department}</td>
                    <td className="p-2 border">{member.position}</td>
                    <td className="p-2 border">{member.status}</td>
                    <td className="p-2 border space-x-2" style={{ display: "flex", gap: "8px" , justifyContent: "center" , alignItems: "center" }}>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleUpdateMember(member.id)} style={{ backgroundColor: "#f59e0b", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
                        Update
                      </button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteMember(member.id)} style={{ backgroundColor: "#dc2626", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Members;
