import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../services/api";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUserById(id);
        if (!data) {
          throw new Error("User not found");
        }

        setUser(data);
      } catch (err) {
        console.error("User Fetch Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{user.firstName} {user.lastName}</h2>
      <div className="flex gap-4">
        <img src={user.image} alt={user.firstName} className="w-32 h-32 rounded-full" />
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Department:</strong> {user.company.department}</p>
          <p><strong>Title:</strong> {user.company.title}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
