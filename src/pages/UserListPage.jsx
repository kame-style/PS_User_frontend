import { lazy, Suspense } from "react";

const UserList = lazy(() => import("../components/UserList"));

const UserListPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Suspense fallback={<div>Loading Users...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
};

export default UserListPage;