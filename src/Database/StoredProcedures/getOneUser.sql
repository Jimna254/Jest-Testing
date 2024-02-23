CREATE OR ALTER PROCEDURE getOneUser(@user_id VARCHAR(50))
AS
BEGIN
    SELECT * FROM users WHERE user_id = @user_id;

   
END