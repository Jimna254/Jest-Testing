import bcrypt from "bcrypt";
import mssql from "mssql";
import Connection from "../../DbHelper/db.Helper";
import { getUsers, registerUser } from "../user.Controller";

jest.mock("../DbHelper/db.Helper", () => {
  return jest.fn().mockImplementation(() => {
    return {
      execute: jest.fn(),
    };
  });
});

// Mock Express Request and Response
const mockRequest = (params = {}, body = {}, query = {}) =>
  ({
    params,
    body,
    query,
  } as never);

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("User Registration", () => {
  let res: any;
  let users: any;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    users = {
      recordset: [
        {
          user_id: "32a0cc8e-1f7f-45b0-9500-5d9b05dbdec8",
          name: "JamesKariuki",
          email: "james.kariuki@thejitu.com",
          cohort_number: "26",
          phone_number: "1234567890",
          password:
            "$2b$05$LDDEWS/pKa2aMM04Jfh.ket5rVA2ZSLQMGYffatI3LUWXBywoJSpG",
          isdeleted: false,
        },
      ],
    };
  });

  it("successfully registers a user", async () => {
    const req = {
      body: {
        name: "JamesKariuki",
        email: "james.kariuki@thejitu.com",
        cohort_number: "25",
        phone_number: "1234567890",
        password: "123456789",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPwdkjshghgksjgkj" as never);

    const mockedInput = jest.fn().mockReturnThis(); //for chainability

    const mockedExecute = jest.fn().mockResolvedValue({ recordset: [] });

    //const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "JamesKariuki Account was created succesfully.",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("getUsers", () => {
  it("should return all users with a 200 status code", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockUsers = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Doe" },
    ];

    Connection.execute.mockResolvedValueOnce({
      recordset: mockUsers,
    });

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
