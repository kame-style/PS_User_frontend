import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserList from "../src/components/UserList";
import { fetchUsers, fetchUsersByRole } from "../src/services/api";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("../src/services/api");

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

beforeEach(() => {
  jest.clearAllMocks(); // Ensure mocks are reset before each test
});

describe("UserList Component", () => {
  test("renders user list correctly", async () => {
    fetchUsers.mockResolvedValueOnce(mockUsers);

    await act(async () => {
      render(
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  test("filters users by role", async () => {
    fetchUsersByRole.mockResolvedValueOnce([mockUsers[0]]);
    
    await act(async () => {
      render(
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      );
    });

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "admin" } });

    await waitFor(() => {
      expect(fetchUsersByRole).toHaveBeenCalledWith("admin");
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  test("handles API errors", async () => {
    fetchUsers.mockRejectedValueOnce(new Error("Network Error"));

    render(
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      );

    await waitFor(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
