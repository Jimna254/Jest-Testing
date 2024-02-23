import bcrypt from "bcrypt";
import mssql from "mssql";
import { registerUser } from "../user.Controller";

// First declare the test suite
describe("User Registration", () => {
  let res: any;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // Define the test case
  it("successfully registers a user", async () => {
    const req = {
      body: {
        name: "teach2give",
        email: "teach2give@gmail.com",
        phone_number: "0787543219",
        password: "admin",
      },
    };

    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPwdkjshghgksjgkj" as never);

    const mockedInput = jest.fn().mockReturnThis(); //makes it chainable

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

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
      message: "teach2give Account was created succesfully.",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
