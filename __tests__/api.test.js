import { fetchUsers, fetchUsersByRole, fetchUserById } from "../src/services/api";

beforeAll(() => {
  global.importMetaEnv = { VITE_API_BASE_URL: "http://localhost:3000/api" };
});

describe("API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchUsers should return data", async () => {
    const mockData = [{ id: 1, name: "John Doe" }];
    
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchUsers();
    expect(result).toEqual(mockData);
  });

  test("fetchUsersByRole should return filtered users", async () => {
    const mockData = [{ id: 2, name: "Admin User", role: "admin" }];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchUsersByRole("admin");
    expect(result).toEqual(mockData);
  });

  test("fetchUserById should return a single user", async () => {
    const mockUser = { id: 1, name: "John Doe" };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockUser),
    });

    const result = await fetchUserById(1);
    expect(result).toEqual(mockUser);
  });

});
