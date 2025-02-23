import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserList from "../components/UserList";
import { fetchUsers, fetchUsersByRole } from "../services/api";

jest.mock("../services/api");

const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    company: { name: "Tech Corp", department: "Engineering", title: "Developer" },
    email: "john.doe@example.com",
    username: "johndoe",
    gender: "Male",
    phone: "1234567890",
    role: "admin",
    university: "Tech University"
  }
];

describe("UserList Component", () => {
  test("renders user list correctly", async () => {
    fetchUsers.mockResolvedValue(mockUsers);

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("filters users by role", async () => {
    fetchUsersByRole.mockResolvedValue([mockUsers[0]]);
    
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "admin" } });

    await waitFor(() => {
      expect(fetchUsersByRole).toHaveBeenCalledWith("admin");
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("handles API errors", async () => {
    fetchUsers.mockRejectedValue(new Error("Network Error"));

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error: Network Error/i)).toBeInTheDocument();
    });
  });
});
