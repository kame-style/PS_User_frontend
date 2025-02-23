import UserList from "../components/UserList";
import React from "react";

const UserListPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UserList />
    </div>
  );
};

export default UserListPage;
