import { fetchUsers, fetchUsersByRole, fetchUserById } from "../services/api";

global.fetch = jest.fn();

describe("API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchUsers should return data", async () => {
    const mockData = [{ id: 1, name: "John Doe" }];
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchUsers();
    expect(result).toEqual(mockData);
  });

  test("fetchUsersByRole should return filtered users", async () => {
    const mockData = [{ id: 2, name: "Admin User", role: "admin" }];
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchUsersByRole("admin");
    expect(result).toEqual(mockData);
  });

  test("fetchUserById should return a single user", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await fetchUserById(1);
    expect(result).toEqual(mockUser);
  });

  test("fetchUserById should handle error response", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const result = await fetchUserById(999);
    expect(result).toBeNull();
  });
});
