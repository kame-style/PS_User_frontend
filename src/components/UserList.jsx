import { useState, useEffect } from "react";
import { fetchUsers, fetchUsersByRole } from "../services/api";
import { useNavigate } from "react-router-dom";
import React from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        const data = role ? await fetchUsersByRole(role) : await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
    <div>
      <select className="mb-4 p-2 border rounded" onChange={(e) => setRole(e.target.value)}>
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
    
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-4">User List</h1>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 border">First Name</th>
            <th className="p-3 border">Last Name</th>
            <th className="p-3 border">Age</th>
            <th className="p-3 border">Company</th>
            <th className="p-3 border">Department</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Gender</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">University</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              
              <tr
                    key={user.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                <td className="p-3 border">{user.firstName}</td>
                <td className="p-3 border">{user.lastName}</td>
                <td className="p-3 border">{user.age}</td>
                <td className="p-3 border">{user.company?.name}</td>
                <td className="p-3 border">{user.company?.department}</td>
                <td className="p-3 border">{user.company?.title}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.username}</td>
                <td className="p-3 border">{user.gender}</td>
                <td className="p-3 border">{user.phone}</td>
                <td className="p-3 border">{user.role}</td>
                <td className="p-3 border">{user.university}</td>
              </tr>
            ) )
          ) : (
            <tr>
              <td colSpan="12" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default UserList;
