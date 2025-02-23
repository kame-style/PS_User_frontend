import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const UserListPage = lazy(() => import("./pages/UserListPage"));
const UserDetailPage = lazy(() => import("./pages/UserDetailPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;