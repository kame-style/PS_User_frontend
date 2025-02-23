import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fetchUserById } from "../src/services/api";
import UserDetailPage from "../src/pages/UserDetailPage";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("../src/services/api");

const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  image: "https://via.placeholder.com/150",
  email: "john.doe@example.com",
  phone: "1234567890",
  role: "admin",
  company: { name: "Tech Corp", department: "Engineering", title: "Developer" }
};

describe("UserDetailPage Component", () => {
  test("displays user details correctly", async () => {
    fetchUserById.mockResolvedValue(mockUser);

    render(
      <BrowserRouter>
        <UserDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    });
  });

  test("shows error when user is not found", async () => {
    fetchUserById.mockRejectedValue(new Error("User not found"));

    render(
      <BrowserRouter>
        <UserDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error: user not found/i)).toBeInTheDocument();
    });
  });
});
