import { Request } from "express";
import Connection from "../../DbHelper/db.Helper";
import {
  registerUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../user.Controller";

jest.mock("../../DbHelper/db.Helper");

// Mock setup for Express request and response
const mockRequest = (params = {}, body = {}, query = {}) =>
  ({
    params,
    body,
    query,
  } as Request);

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("Users Controller Test Suite", () => {
  let res: any;
  let user: any;
  let users: any;

  beforeEach(() => {
    res = mockResponse();

    user = {
      name: "JamesKariuki",
      email: "james.kariuki@thejitu.com",
      cohort_number: "26",
      phone_number: "1234567890",
      password: "123456789",
      // isdeleted: false,
    };

    users = {
      recordset: [user],
    };
  });

  it("registers a new user successfully", async () => {
    const req = mockRequest(
      {},
      {
        name: "JamesWanjiku",
        email: "james.wanjiku@thejitu.com",
        cohort_number: "26",
        phone_number: "1234567890",
        password: "123456789",
      }
    );

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      recordset: [],
      rowsAffected: [1], // Simulating successful user creation
    });

    await registerUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "JamesWanjiku Account was created successfully.", // Ensure the message matches exactly
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("gets all users successfully", async () => {
    const req = mockRequest();

    (Connection.execute as jest.Mock).mockResolvedValueOnce(users);

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({ users: users.recordset });
  });

  it("gets one user by ID successfully", async () => {
    const req = mockRequest({ id: user.user_id });

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      recordset: [user],
    });

    await getOneUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ user });
  });

  it("updates a user successfully", async () => {
    const req = mockRequest(
      { id: user.user_id },
      { name: "Updated Test User" }
    );

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      result: { rowsAffected: [1] },
      message: "User updated successfully",
    });
  });

  it("deletes a user by ID successfully", async () => {
    const req = mockRequest({ id: user.user_id });

    (Connection.execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ user: [1] });
  });
});
