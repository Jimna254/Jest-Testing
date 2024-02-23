CREATE OR ALTER PROCEDURE ifUserExists
    @email VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Users WHERE email = @email;
END;