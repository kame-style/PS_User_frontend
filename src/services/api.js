const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all users with error handling
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
    return []; // Return an empty array as a fallback
  }
};

// Fetch users by role with error handling
export const fetchUsersByRole = async (role) => {
  try {
    const response = await fetch(`${API_BASE_URL}/role/${role}`);

    if (!response.ok) {
      throw new Error(`Error fetching users by role: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch Users By Role Error (${role}):`, error.message);
    return []; // Return an empty array as a fallback
  }
};

// Fetch a user by ID with error handling
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching user ${id}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch User By ID Error (${id}):`, error.message);
    return null; // Return null as a fallback
  }
};
